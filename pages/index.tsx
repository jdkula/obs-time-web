import { Pause, PlayArrow, Refresh } from '@mui/icons-material';
import {
  AppBar,
  Autocomplete,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  FormLabel,
  getContrastRatio,
  getLuminance,
  IconButton,
  Popover,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import {
  ClockState,
  OBSClock,
  OBSClockDefinition,
} from '~/components/OBSClock';
import { parseDuration } from '~/lib/util';

function ColorEditorButton({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const buttonRef = useRef<HTMLElement | null>(null);
  return (
    <>
      <Button
        onClick={() => setEditing(true)}
        ref={buttonRef as any}
        sx={{
          backgroundColor: color,
          color: getLuminance(color) > 0.5 ? '#000' : '#fff',
        }}
        variant="contained"
      >
        Edit
      </Button>
      <Popover
        open={editing}
        onClose={() => setEditing(false)}
        anchorEl={buttonRef.current}
      >
        <SketchPicker color={color} onChange={(color) => onChange(color.hex)} />
      </Popover>
    </>
  );
}

const Home: NextPage = () => {
  const [clock, setClock] = useState<OBSClockDefinition>();
  const [durationStr, setDuration] = useState('');
  const [state, setState] = useState<ClockState>({ id: Date.now().toString() });
  const [editingColor, setEditingColor] = useState(false);
  const buttonRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const parsed = parseDuration(durationStr);
    if (clock?.type === 'countdown' && clock.durationMs !== parsed) {
      setClock({ ...clock, durationMs: parsed });
    } else if (clock?.type === 'countup' && clock.startMs !== parsed) {
      setClock({ ...clock, startMs: parsed });
    }
  }, [clock, durationStr]);

  useEffect(() => {
    setState({ id: Date.now().toString() });
  }, [clock?.type]);

  const hook = (defaultClock: OBSClockDefinition) => {
    return {
      onClick: () => setClock(defaultClock),
      variant:
        clock?.type === defaultClock.type ? ('contained' as const) : undefined,
    };
  };

  let controls;

  if (clock) {
    controls = (
      <>
        <div style={{ marginTop: '12px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              rowGap: '1rem',
              '& > div': {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              },
            }}
          >
            {clock.type === 'clock' && (
              <div>
                <FormLabel sx={{ flexGrow: 1 }}>Time Zone:</FormLabel>
                <ButtonGroup variant="outlined">
                  <Button
                    variant={!clock.timeZone ? 'contained' : undefined}
                    onClick={() => setClock({ ...clock, timeZone: null })}
                  >
                    Local Time
                  </Button>
                  <Button
                    variant={clock.timeZone ? 'contained' : undefined}
                    onClick={() =>
                      setClock({
                        ...clock,
                        timeZone:
                          Intl.DateTimeFormat().resolvedOptions().timeZone,
                      })
                    }
                  >
                    Specify
                  </Button>
                </ButtonGroup>
              </div>
            )}
            {clock.type === 'clock' && clock.timeZone && (
              <div>
                <Autocomplete
                  fullWidth
                  options={
                    (Intl as any).supportedValuesOf('timeZone') as string[]
                  }
                  defaultValue={
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                  }
                  onChange={(_, value) =>
                    value && setClock({ ...clock, timeZone: value })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Time Zone" />
                  )}
                />
              </div>
            )}
            {clock?.type === 'countdown' && (
              <div>
                <TextField
                  fullWidth
                  label="Duration"
                  value={durationStr}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="2h 49min 30s"
                  inputProps={{
                    inputMode: 'text',
                  }}
                />
              </div>
            )}
            <div>
              <FormLabel sx={{ flexGrow: 1 }}>Color</FormLabel>
              <ColorEditorButton
                color={clock.color ?? '#fff'}
                onChange={(color) => setClock({ ...clock, color: color })}
              />
            </div>
            {clock.type !== 'clock' && (
              <div>
                <FormLabel sx={{ flexGrow: 1 }}>Color When Paused</FormLabel>
                <ColorEditorButton
                  color={clock.colorOnPaused ?? '#fff'}
                  onChange={(color) =>
                    setClock({ ...clock, colorOnPaused: color })
                  }
                />
              </div>
            )}
            {clock.type !== 'clock' && (
              <div>
                <FormLabel sx={{ flexGrow: 1 }}>Color When Stopped</FormLabel>
                <ColorEditorButton
                  color={clock.colorOnStopped ?? '#fff'}
                  onChange={(color) =>
                    setClock({ ...clock, colorOnStopped: color })
                  }
                />
              </div>
            )}
            {clock.type === 'countdown' && clock.stopAtZero && (
              <div>
                <FormLabel sx={{ flexGrow: 1 }}>Color At Zero</FormLabel>
                <ColorEditorButton
                  color={clock.colorOnZero ?? '#fff'}
                  onChange={(color) =>
                    setClock({ ...clock, colorOnZero: color })
                  }
                />
              </div>
            )}
            {clock.type === 'countdown' && !clock.stopAtZero && (
              <div>
                <FormLabel sx={{ flexGrow: 1 }}>Color When Negative</FormLabel>
                <ColorEditorButton
                  color={clock.colorOnNegative ?? '#fff'}
                  onChange={(color) =>
                    setClock({ ...clock, colorOnNegative: color })
                  }
                />
              </div>
            )}
            {clock?.type === 'countdown' && (
              <div>
                <FormLabel sx={{ flexGrow: 1 }}>Stop at zero?</FormLabel>
                <Checkbox
                  checked={clock.stopAtZero ?? false}
                  onChange={(_, checked) =>
                    setClock({ ...clock, stopAtZero: checked })
                  }
                />
              </div>
            )}
            <div>
              <FormLabel sx={{ flexGrow: 1 }}>Blink Colons?</FormLabel>
              <Checkbox
                checked={clock.blinkColons ?? false}
                onChange={(_, checked) =>
                  setClock({ ...clock, blinkColons: checked })
                }
              />
            </div>
            <div>
              <FormLabel sx={{ flexGrow: 1 }}>Show Milliseconds?</FormLabel>
              <Checkbox
                checked={clock.showMs ?? false}
                onChange={(_, checked) =>
                  setClock({ ...clock, showMs: checked })
                }
              />
            </div>
          </Box>
        </div>
      </>
    );
  }

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OBS Clock
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'stretch', md: 'space-around' },
            margin: '2rem',
            '& > div': {
              padding: '2rem',
              border: '1px solid gray',
              flexGrow: 1,
              width: {
                md: '2%',
              },
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="overline"
              sx={{ borderBottom: '1px solid gray', marginBottom: '1rem' }}
            >
              Controls
            </Typography>
            <ButtonGroup
              variant="outlined"
              aria-labelledby="type-label"
              fullWidth
            >
              <Button {...hook({ type: 'clock' })} fullWidth>
                Clock
              </Button>
              <Button {...hook({ type: 'countup', startMs: 0 })} fullWidth>
                Count-up
              </Button>
              <Button {...hook({ type: 'countdown', durationMs: 0 })} fullWidth>
                Count-down
              </Button>
            </ButtonGroup>
            <Box
              sx={{
                '& > div': { marginTop: '1rem', marginBottom: '1rem' },
                width: '100%',
              }}
            >
              {controls}
            </Box>
            {clock && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: '1rem',
                }}
              >
                <FormLabel sx={{ marginRight: '0.5rem' }}>
                  URL for OBS:
                </FormLabel>
                <TextField
                  sx={{ flexGrow: 1 }}
                  size="small"
                  value={
                    typeof window === 'undefined'
                      ? ''
                      : `${window.location.protocol}//${
                          window.location.host
                        }/obs?id=${encodeURIComponent(
                          state.id
                        )}&config=${encodeURIComponent(JSON.stringify(clock))}`
                  }
                />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="overline"
              sx={{ borderBottom: '1px solid gray', marginBottom: '1rem' }}
            >
              Preview
            </Typography>
            <Box sx={{ flexGrow: 1, alignSelf: 'stretch' }}>
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  border: '1px solid #333',
                  background: 'black',
                  backgroundImage:
                    'linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                }}
              >
                {clock && (
                  <OBSClock clock={clock} state={state} setState={setState} />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
