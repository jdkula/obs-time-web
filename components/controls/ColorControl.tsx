import { WidthNormal } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  FormLabel,
  Popover,
  Slider,
} from '@mui/material';
import { useRef, useState } from 'react';
import { ControlComponent } from '.';
import { ColorEditorButton } from '../ColorEditorButton';
import {
  TimerDefinition,
  StopwatchDefinition,
  OBSClockDefinition,
} from '../OBSClock';

function makeColorControl<T extends OBSClockDefinition = OBSClockDefinition>(
  label: string,
  key: keyof T,
  outlineKey: keyof T,
  outlineWidthKey: keyof T
): ControlComponent<T> {
  return function ColorControlComponent({ clock, setClock }) {
    const [showWidth, setShowWidth] = useState(false);
    const outlineRef = useRef<HTMLElement | null>(null);
    return (
      <div>
        <FormLabel sx={{ flexGrow: 1 }}>{label}</FormLabel>
        {(!!clock[key] || !!clock[outlineKey]) && (
          <Button
            onClick={() =>
              setClock({
                ...clock,
                [key]: undefined,
                [outlineKey]: undefined,
                [outlineWidthKey]: undefined,
              })
            }
          >
            Reset
          </Button>
        )}
        <ColorEditorButton
          label="Fill"
          color={(clock[key] as string) ?? null}
          onChange={(color) => setClock({ ...clock, [key]: color })}
        />
        <Box sx={{ margin: '0.25rem' }} />
        <ButtonGroup>
          <ColorEditorButton
            label="Outline"
            color={(clock[outlineKey] as string) ?? null}
            onChange={(color) => setClock({ ...clock, [outlineKey]: color })}
          />
          <Button
            sx={{ width: '40px' }}
            ref={outlineRef as any}
            onClick={() => setShowWidth(true)}
          >
            <WidthNormal />
          </Button>
        </ButtonGroup>
        <Popover
          open={showWidth}
          onClose={() => setShowWidth(false)}
          anchorEl={outlineRef.current}
        >
          <Slider
            orientation="vertical"
            value={(clock[outlineWidthKey] as number) ?? 1}
            min={0}
            max={20}
            onChange={(_, value) =>
              setClock({
                ...clock,
                [outlineWidthKey]: value as number,
                [outlineKey]: clock[outlineKey] ?? '#888',
              })
            }
            sx={{
              minHeight: '80px',
              minWidth: '20px',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          />
        </Popover>
      </div>
    );
  };
}

export const DefaultColorControl = makeColorControl(
  'Color',
  'color',
  'outline',
  'outlineWidth'
);

export const PausedColorControl = makeColorControl<
  StopwatchDefinition | TimerDefinition
>(
  'Color When Paused',
  'colorOnPaused',
  'outlineOnPaused',
  'outlineWidthOnPaused'
);

export const StoppedColorControl = makeColorControl<
  StopwatchDefinition | TimerDefinition
>(
  'Color When Stopped',
  'colorOnStopped',
  'outlineOnStopped',
  'outlineWidthOnStopped'
);

export const ZeroColorControl = makeColorControl<TimerDefinition>(
  'Color On Zero',
  'colorOnZero',
  'outlineOnZero',
  'outlineWidthOnZero'
);

export const NegativeColorControl = makeColorControl<TimerDefinition>(
  'Color On Negative',
  'colorOnNegative',
  'outlineOnNegative',
  'outlineWidthOnNegative'
);
