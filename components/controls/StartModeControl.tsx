import { FormLabel, Tooltip, Select, MenuItem } from '@mui/material';
import { ControlComponent } from '.';
import {
  TimerDefinition,
  StopwatchDefinition,
  AutoStartOption,
} from '../OBSClock';

export const StartModeControl: ControlComponent<
  StopwatchDefinition | TimerDefinition
> = ({ clock, setClock }) => (
  <div>
    <Tooltip title="When to start the clock">
      <FormLabel sx={{ flexGrow: 1 }}>Start Mode:</FormLabel>
    </Tooltip>
    <Tooltip title="When to start the clock">
      <Select
        value={JSON.stringify(clock.autoStart ?? false)}
        onChange={(e) =>
          setClock({ ...clock, autoStart: JSON.parse(e.target.value) })
        }
      >
        <MenuItem value={JSON.stringify(false)}>Manually</MenuItem>
        <MenuItem value={JSON.stringify(true)}>On Load</MenuItem>
        <MenuItem value={JSON.stringify('stream' as AutoStartOption)}>
          On Stream Start
        </MenuItem>
        <MenuItem value={JSON.stringify('record' as AutoStartOption)}>
          On Record Start
        </MenuItem>
        <MenuItem value={JSON.stringify('both' as AutoStartOption)}>
          On Stream or Record Start
        </MenuItem>
      </Select>
    </Tooltip>
  </div>
);
