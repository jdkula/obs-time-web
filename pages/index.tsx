import {
  Autocomplete,
  Button,
  ButtonGroup,
  Container,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Type = 'clock' | 'countup' | 'countdown';

const Home: NextPage = () => {
  const [type, setType] = useState<Type | null>(null);
  const [overrideTz, setOverrideTz] = useState(false);
  const [tz, setTz] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [duration, setDuration] = useState<string>('');

  const sanitizeDuration = (orig: string, text: string) => {
    const sanitized = text.replaceAll(/[^0-9:]/g, '').replaceAll(/::+/g, ':');
    if (sanitized.replaceAll(/[^:]/g, '').length > 2) {
      return orig;
    }
    return sanitized;
  };

  const parseDuration = (duration: string) => {
    const parts = duration.split(':');
    const sec_min_hr: number[] = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      sec_min_hr.push(parseInt(parts[i] || '0'));
    }

    return (
      (sec_min_hr[0] ?? 0) * 1 +
      (sec_min_hr[1] ?? 0) * 60 +
      (sec_min_hr[2] ?? 0) * 60 * 60
    );
  };

  const stringifyDuration = (totalSeconds: number) => {
    const seconds = totalSeconds % 60;
    totalSeconds = Math.floor(totalSeconds / 60);
    const minutes = totalSeconds % 60;
    totalSeconds = Math.floor(totalSeconds / 60);
    const hours = totalSeconds;

    let out = '';
    if (hours) out += hours + 'h ';
    if (minutes || out) out += minutes + 'min ';
    out += seconds + 's';

    return out;
  };

  const hook = (myType: Type) => {
    return {
      onClick: () => setType(myType),
      variant: type === myType ? ('contained' as const) : undefined,
    };
  };

  let controls;

  if (type !== null) {
    controls = (
      <>
        {type === 'clock' && (
          <>
            <div>
              <FormLabel>Time Zone?</FormLabel>
            </div>
            <div>
              <ButtonGroup variant="outlined">
                <Button
                  variant={!overrideTz ? 'contained' : undefined}
                  onClick={() => setOverrideTz(false)}
                >
                  Local Time
                </Button>
                <Button
                  variant={overrideTz ? 'contained' : undefined}
                  onClick={() => setOverrideTz(true)}
                >
                  Specify
                </Button>
              </ButtonGroup>
            </div>
            {overrideTz && (
              <div style={{ marginTop: '12px' }}>
                <Autocomplete
                  options={
                    (Intl as any).supportedValuesOf('timeZone') as string[]
                  }
                  defaultValue={
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                  }
                  onChange={(_, value) => value && setTz(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Time Zone" />
                  )}
                />
              </div>
            )}
          </>
        )}
        {type === 'countdown' && (
          <>
            <div style={{ marginTop: '12px' }}>
              <TextField
                label="Duration"
                value={duration}
                onChange={(e) =>
                  setDuration(sanitizeDuration(duration, e.target.value))
                }
                placeholder="__:__:__"
                inputProps={{
                  inputMode: 'text',
                  pattern: '(([0-9]+:)?[0-9]+:)?[0-9]+',
                }}
                helperText={stringifyDuration(parseDuration(duration))}
              />
            </div>
          </>
        )}
        <div style={{ marginTop: '24px' }}>
          <Button variant="contained" size="large" color="secondary">
            Create
          </Button>
        </div>
      </>
    );
  }

  return (
    <Container>
      <Typography variant="h1">Create an OBS Clock!</Typography>
      <div>
        <FormLabel id="type-label">Select type:</FormLabel>
      </div>
      <div>
        <ButtonGroup variant="outlined" aria-labelledby="type-label">
          <Button {...hook('clock')}>Clock</Button>
          <Button {...hook('countup')}>Count-up</Button>
          <Button {...hook('countdown')}>Count-down</Button>
        </ButtonGroup>
      </div>
      {controls}
    </Container>
  );
};

export default Home;
