import { TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { parseDuration } from '~/lib/util';
import { ControlComponent } from '.';
import { TimerDefinition, StopwatchDefinition } from '../OBSClock';

export const DurationControl: ControlComponent<
  StopwatchDefinition | TimerDefinition
> = ({ clock, setClock }) => {
  const [durationStr, setDuration] = useState(clock.durationStr ?? '1min');

  useEffect(() => {
    if (clock.durationStr) {
      setDuration(clock.durationStr);
    }
  }, [clock.durationStr]);

  const setFullDuration = useCallback(
    (str: string) => {
      if (clock.type === 'timer') {
        setClock({
          ...clock,
          durationMs: parseDuration(str),
          durationStr: str,
        });
      } else if (clock.type === 'stopwatch') {
        setClock({ ...clock, startMs: parseDuration(str), durationStr: str });
      }
      setDuration(str);
    },
    [clock, setClock, setDuration]
  );

  return (
    <div>
      <TextField
        fullWidth
        label="Duration"
        value={durationStr}
        onChange={(e) => setFullDuration(e.target.value)}
        placeholder="2h 49min 30s"
        inputProps={{
          inputMode: 'text',
        }}
      />
    </div>
  );
};
