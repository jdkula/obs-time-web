import { FormLabel, ButtonGroup, Button, Tooltip } from '@mui/material';
import { ControlComponent } from '.';
import { TimerDefinition, StopwatchDefinition } from '../OBSClock';

export const StartModeControl: ControlComponent<
  StopwatchDefinition | TimerDefinition
> = ({ clock, setClock }) => (
  <div>
    <Tooltip title="Whether or not to start automatically on load">
      <FormLabel sx={{ flexGrow: 1 }}>Start Mode:</FormLabel>
    </Tooltip>
    <Tooltip title="Whether or not to start automatically on load">
      <ButtonGroup variant="outlined">
        <Button
          variant={!clock.autoStart ? 'contained' : undefined}
          onClick={() => setClock({ ...clock, autoStart: false })}
        >
          Manual Start
        </Button>
        <Button
          variant={clock.autoStart ? 'contained' : undefined}
          onClick={() =>
            setClock({
              ...clock,
              autoStart: true,
            })
          }
        >
          Autostart
        </Button>
      </ButtonGroup>
    </Tooltip>
  </div>
);
