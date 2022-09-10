import { collection, CollectionReference } from "firebase/firestore";
import { firestore } from "./firebase";

interface Styled {
  style: string
}

export interface Clock extends Styled {
  type: 'clock'
  time_zone: string;
}

export interface CountUp extends Styled {
  type: 'countup'
  start_time: number;
  pause_time: number | null;
}

export interface CountDown extends Styled {
  type: 'countdown'
  start_time: number;
  pause_time: number | null;
  duration: number;
  style: string
}

export const clocks = collection(firestore, 'clocks') as CollectionReference<Clock | CountUp | CountDown>;