import { Settings } from '@mui/icons-material';
import {
  Button,
  ButtonGroup,
  FormLabel,
  TextField,
  Tooltip,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { parseDuration } from '~/lib/util';
import { ControlComponent } from '.';
import { TimerDefinition, StopwatchDefinition } from '../OBSClock';

export const RestartModeControl: ControlComponent<
  StopwatchDefinition | TimerDefinition,
  {
    showResetAfterControls?: boolean;
    setShowResetAfterControls?: (show: boolean) => void;
  }
> = ({
  clock,
  setClock,
  showResetAfterControls,
  setShowResetAfterControls,
}) => (
  <div>
    <Tooltip title="When the webpage isn't loaded, reset after this time.">
      <FormLabel sx={{ flexGrow: 1 }}>Restart Mode:</FormLabel>
    </Tooltip>

    <Tooltip title="When the webpage isn't loaded, reset after this time.">
      <ButtonGroup variant="outlined">
        <Button
          variant={clock.resetAfter === undefined ? 'contained' : undefined}
          onClick={() => setClock({ ...clock, resetAfter: undefined })}
        >
          Manual Restart
        </Button>
        <Button
          variant={clock.resetAfter !== undefined ? 'contained' : undefined}
          onClick={() =>
            setClock({
              ...clock,
              resetAfter: clock.autoResetStr
                ? parseDuration(clock.autoResetStr)
                : 15 * 60 * 1000,
            })
          }
        >
          Automatic
        </Button>
        <Button
          size="small"
          disabled={clock.resetAfter === undefined}
          variant={
            showResetAfterControls && clock.resetAfter !== undefined
              ? 'contained'
              : 'outlined'
          }
          sx={{ width: '40px' }}
          onClick={() => setShowResetAfterControls?.(!showResetAfterControls)}
        >
          <Settings />
        </Button>
      </ButtonGroup>
    </Tooltip>
  </div>
);

export const RestartModeConfigure: ControlComponent<
  StopwatchDefinition | TimerDefinition
> = ({ clock, setClock }) => {
  const [restartStr, setRestartTimeout] = useState(
    clock.autoResetStr ?? '15min'
  );

  useEffect(() => {
    if (clock.autoResetStr) {
      setRestartTimeout(clock.autoResetStr);
    }
  }, [clock.autoResetStr]);

  const setFullRestartTimeout = useCallback(
    (str: string) => {
      setClock({ ...clock, resetAfter: parseDuration(str), autoResetStr: str });
      setRestartTimeout(str);
    },
    [clock, setClock, setRestartTimeout]
  );

  return (
    <div>
      <TextField
        fullWidth
        label="Automatically Reset After"
        value={restartStr}
        onChange={(e) => setFullRestartTimeout(e.target.value)}
        placeholder="15min"
        helperText="When the webpage isn't loaded, restart after this time."
        inputProps={{
          inputMode: 'text',
        }}
      />
    </div>
  );
};
