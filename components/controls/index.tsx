import { Box } from '@mui/material';
import React from 'react';
import { OBSClockDefinition } from '../OBSClock';
import {
  StopAtZeroControl,
  BlinkColonsControl,
  ShowMillisecondsControl,
} from './BooleanControls';
import {
  DefaultColorControl,
  PausedColorControl,
  StoppedColorControl,
  ZeroColorControl,
  NegativeColorControl,
} from './ColorControl';
import { DurationControl } from './DurationControl';
import { FontControl } from './FontControl';
import { RestartModeControl, RestartModeConfigure } from './RestartModeControl';
import { StartModeControl } from './StartModeControl';
import { TimeZoneControl, TimeZoneSelection } from './TimeZoneControl';

export type ControlComponent<
  Clock extends OBSClockDefinition = OBSClockDefinition
> = React.FC<{
  clock: Clock;
  setClock: (newClock: Clock) => void;
}>;

export const Controls: ControlComponent = ({ clock, setClock }) => (
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
        <TimeZoneControl clock={clock} setClock={setClock} />
      )}
      {clock.type === 'clock' && clock.timeZone && (
        <TimeZoneSelection clock={clock} setClock={setClock} />
      )}
      {clock?.type === 'timer' && (
        <DurationControl clock={clock} setClock={setClock} />
      )}
      {clock.type !== 'clock' && (
        <StartModeControl clock={clock} setClock={setClock} />
      )}
      {clock.type !== 'clock' && (
        <RestartModeControl clock={clock} setClock={setClock} />
      )}
      {clock.type !== 'clock' && clock.resetAfter !== undefined && (
        <RestartModeConfigure clock={clock} setClock={setClock} />
      )}
      <DefaultColorControl clock={clock} setClock={setClock} />
      {clock.type !== 'clock' && (
        <PausedColorControl clock={clock} setClock={setClock} />
      )}
      {clock.type !== 'clock' && (
        <StoppedColorControl clock={clock} setClock={setClock} />
      )}
      {clock.type === 'timer' && clock.stopAtZero && (
        <ZeroColorControl clock={clock} setClock={setClock} />
      )}
      {clock.type === 'timer' && !clock.stopAtZero && (
        <NegativeColorControl clock={clock} setClock={setClock} />
      )}
      {clock?.type === 'timer' && (
        <StopAtZeroControl clock={clock} setClock={setClock} />
      )}
      <BlinkColonsControl clock={clock} setClock={setClock} />
      <ShowMillisecondsControl clock={clock} setClock={setClock} />
      <FontControl clock={clock} setClock={setClock} />
    </Box>
  </div>
);
