import { Button, FormLabel } from '@mui/material';
import { ControlComponent } from '.';
import { ColorEditorButton } from '../ColorEditorButton';
import {
  TimerDefinition,
  StopwatchDefinition,
  OBSClockDefinition,
} from '../OBSClock';

function makeColorControl<T extends OBSClockDefinition = OBSClockDefinition>(
  label: string,
  key: keyof T
): ControlComponent<T> {
  return function ColorControlComponent({ clock, setClock }) {
    return (
      <div>
        <FormLabel sx={{ flexGrow: 1 }}>{label}</FormLabel>
        {!!clock[key] && (
          <Button onClick={() => setClock({ ...clock, [key]: undefined })}>
            Reset
          </Button>
        )}
        <ColorEditorButton
          color={(clock[key] as string) ?? null}
          onChange={(color) => setClock({ ...clock, [key]: color })}
        />
      </div>
    );
  };
}

export const DefaultColorControl = makeColorControl('Color', 'color');

export const PausedColorControl = makeColorControl<
  StopwatchDefinition | TimerDefinition
>('Color When Paused', 'colorOnPaused');

export const StoppedColorControl = makeColorControl<
  StopwatchDefinition | TimerDefinition
>('Color When Stopped', 'colorOnStopped');

export const ZeroColorControl = makeColorControl<TimerDefinition>(
  'Color On Zero',
  'colorOnZero'
);

export const NegativeColorControl = makeColorControl<TimerDefinition>(
  'Color On Negative',
  'colorOnNegative'
);
