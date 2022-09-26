import {
  FormLabel,
  ButtonGroup,
  Button,
  Autocomplete,
  TextField,
} from '@mui/material';
import { ControlComponent } from '.';
import { ClockDefinition } from '../OBSClock';

export const TimeZoneControl: ControlComponent<ClockDefinition> = ({
  clock,
  setClock,
}) => (
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
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })
        }
      >
        Specify
      </Button>
    </ButtonGroup>
  </div>
);

export const TimeZoneSelection: ControlComponent<ClockDefinition> = ({
  clock,
  setClock,
}) => (
  <div>
    <Autocomplete
      fullWidth
      options={(Intl as any).supportedValuesOf('timeZone') as string[]}
      defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
      onChange={(_, value) => value && setClock({ ...clock, timeZone: value })}
      renderInput={(params) => <TextField {...params} label="Time Zone" />}
    />
  </div>
);
