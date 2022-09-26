import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export function useLocalStorage<T>(
  key: string
): [T | null, Dispatch<SetStateAction<T | null>>];
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  poll?: number
): [T, Dispatch<SetStateAction<T>>];
export function useLocalStorage<T>(
  key: string,
  defaultValue?: T,
  poll?: number
): [T | null, Dispatch<SetStateAction<T | null>>] {
  const [value, setValue] = useState<T | undefined | null>(undefined);

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem(key) ?? 'null'));
  }, [key]);

  useEffect(() => {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, defaultValue]);

  useEffect(() => {
    if (!poll) return;

    let lastPollValue: string | null = null;

    const handle = setInterval(() => {
      const newVal = localStorage.getItem(key);
      if (lastPollValue === newVal) return;
      lastPollValue = newVal;

      setValue(JSON.parse(newVal ?? 'null'));
    }, poll);

    return () => {
      clearInterval(handle);
    };
  }, [poll, key]);

  return [
    (value ?? defaultValue) as T | null,
    setValue as Dispatch<SetStateAction<T | null>>,
  ];
}
