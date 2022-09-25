import styled from '@emotion/styled';
import { DateTime, Duration } from 'luxon';
import { Fragment, useEffect, useState } from 'react';
import { durationToString } from '~/lib/util';
import { Textfit } from 'react-textfit';
import { Box, css, IconButton, NoSsr } from '@mui/material';
import { Pause, PlayArrow, Refresh } from '@mui/icons-material';
import styles from '~/styles/Clock.module.css';

interface CommonOptions {
  showMs?: boolean;
  color?: string;
  blinkColons?: boolean;
}

interface Clock extends CommonOptions {
  type: 'clock';
  timeZone?: string | null;
  format?: string;
}

interface CountUp extends CommonOptions {
  type: 'countup';
  startMs: number;
  colorOnPaused?: string;
  colorOnStopped?: string;
}

interface CountDown extends CommonOptions {
  type: 'countdown';
  durationMs: number;
  stopAtZero?: boolean;
  colorOnNegative?: string;
  colorOnZero?: string;
  colorOnPaused?: string;
  colorOnStopped?: string;
}

export type OBSClockDefinition = Clock | CountUp | CountDown;

export interface ClockState {
  id: string;
  startTime?: number;
  pauseTime?: number | null;
}

type ClockStatus = 'running' | 'zero' | 'negative' | 'paused' | 'stopped';
type ClockInfo = { text: string; hideColons: boolean; status: ClockStatus };

export function getClockInfo(
  clock: OBSClockDefinition,
  state: ClockState
): ClockInfo {
  switch (clock.type) {
    case 'clock': {
      const dt = DateTime.local().setZone(clock.timeZone ?? 'local', {
        keepLocalTime: true,
      });
      return {
        text: clock.format
          ? dt.toFormat(clock.format)
          : dt.toLocaleString({
              ...DateTime.TIME_WITH_SECONDS,
              timeZoneName: clock.timeZone ? 'short' : undefined,
              fractionalSecondDigits: clock.showMs ? 2 : undefined,
            }),
        hideColons:
          (clock.blinkColons && Math.floor(dt.toSeconds()) % 2 === 1) ?? false,
        status: 'running',
      };
    }
    case 'countdown': {
      const start = state.startTime ?? Date.now();
      const end = state.startTime ? state.pauseTime ?? Date.now() : start;
      let stamp = start - end + clock.durationMs;
      if (clock.stopAtZero) stamp = Math.max(0, stamp);
      return {
        text: durationToString(stamp, clock.showMs ?? false),
        hideColons:
          (clock.blinkColons &&
            Math.floor(Math.abs(start - end) / 1000) % 2 === 1) ??
          false,
        status: !state.startTime
          ? 'stopped'
          : state.pauseTime
          ? 'paused'
          : clock.stopAtZero && stamp == 0
          ? 'zero'
          : stamp < 0
          ? 'negative'
          : 'running',
      };
    }
    case 'countup': {
      const start = state.startTime ?? Date.now();
      const end = state.startTime ? state.pauseTime ?? Date.now() : start;
      return {
        text: durationToString(end - start, clock.showMs ?? false),
        hideColons:
          (clock.blinkColons &&
            Math.floor(Math.abs(start - end) / 1000) % 2 === 1) ??
          false,
        status: !state.startTime
          ? 'stopped'
          : state.pauseTime
          ? 'paused'
          : 'running',
      };
    }
  }
}

export function useClock(
  clock: OBSClockDefinition,
  state: ClockState
): ClockInfo {
  const [info, setInfo] = useState(getClockInfo(clock, state));

  useEffect(() => {
    setInfo(getClockInfo(clock, state));

    const handle = setInterval(
      () => {
        setInfo(getClockInfo(clock, state));
      },
      clock.showMs ? 37 : 250
    );

    return () => {
      clearInterval(handle);
    };
  }, [clock, state]);

  return info;
}

export interface OBSClockProps {
  clock: OBSClockDefinition;
  state: ClockState;
  setState: (state: ClockState) => void;
  hideControls?: boolean;
}

export const ClockStyle = styled.div<Omit<OBSClockProps, 'setState'>>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${(props) => props.clock.color ?? 'inherit'};

  ${(props) =>
    props.clock.type !== 'clock' && props.clock.colorOnPaused
      ? css`
          &.clock-status-paused {
            color: ${props.clock.colorOnPaused};
          }
        `
      : ''}

  ${(props) =>
    props.clock.type !== 'clock' && props.clock.colorOnStopped
      ? css`
          &.clock-status-stopped {
            color: ${props.clock.colorOnStopped};
          }
        `
      : ''}
      
      ${(props) =>
    props.clock.type === 'countdown' && props.clock.colorOnZero
      ? css`
          &.clock-status-zero {
            color: ${props.clock.colorOnZero};
          }
        `
      : ''}
      
      ${(props) =>
    props.clock.type === 'countdown' && props.clock.colorOnNegative
      ? css`
          &.clock-status-negative {
            color: ${props.clock.colorOnNegative};
          }
        `
      : ''}

  & > div:not(${styles.controls}) {
    width: 100%;
    max-height: calc(100%-40px);
    overflow: hidden;
  }

  & > div.${styles.controls} {
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease-out;
  }
  &:hover > div.${styles.controls} {
    height: 40px;
  }
`;

export function OBSClock({ clock, state, setState }: OBSClockProps) {
  const { text, hideColons, status } = useClock(clock, state);
  const colonClass = 'colon' + (hideColons ? ' colon-hidden' : '');
  return (
    <NoSsr>
      <ClockStyle
        clock={clock}
        state={state}
        className={`clock clock-${clock.type} clock-status-${status}`}
      >
        <Textfit mode="single" forceSingleModeWidth max={10000}>
          {text.split(':').map((s, idx, arr) => (
            <Fragment key={idx}>
              <span className="number">{s}</span>
              {idx !== arr.length - 1 && <span className={colonClass}>:</span>}
            </Fragment>
          ))}
        </Textfit>
        {clock.type !== 'clock' && (
          <div className={styles.controls}>
            <IconButton
              color="inherit"
              onClick={() =>
                setState(
                  state.startTime
                    ? state.pauseTime
                      ? {
                          ...state,
                          startTime:
                            Date.now() - (state.pauseTime - state.startTime),
                          pauseTime: null,
                        }
                      : { ...state, pauseTime: Date.now() }
                    : { ...state, startTime: Date.now(), pauseTime: null }
                )
              }
            >
              {state.startTime ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => setState({ id: state.id })}
            >
              <Refresh />
            </IconButton>
          </div>
        )}
      </ClockStyle>
    </NoSsr>
  );
}