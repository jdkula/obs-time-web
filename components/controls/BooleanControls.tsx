import { FormLabel, Checkbox } from '@mui/material';
import { ControlComponent } from '.';
import { TimerDefinition, OBSClockDefinition } from '../OBSClock';

function makeBooleanControl<T extends OBSClockDefinition = OBSClockDefinition>(
  label: string,
  key: keyof T
): ControlComponent<T> {
  return function BooleanControlComponent({ clock, setClock }) {
    return (
      <div>
        <FormLabel sx={{ flexGrow: 1 }}>{label}</FormLabel>
        <Checkbox
          checked={!!clock[key] ?? false}
          onChange={(_, checked) => setClock({ ...clock, [key]: checked })}
        />
      </div>
    );
  };
}

export const StopAtZeroControl = makeBooleanControl<TimerDefinition>(
  'Stop at zero?',
  'stopAtZero'
);
export const BlinkColonsControl = makeBooleanControl(
  'Blink Colons?',
  'blinkColons'
);
export const ShowMillisecondsControl = makeBooleanControl(
  'Show Milliseconds?',
  'showMs'
);
