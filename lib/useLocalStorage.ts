import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export function useLocalStorage<T>(
  key: string
): [T | null, Dispatch<SetStateAction<T | null>>];
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>];
export function useLocalStorage<T>(
  key: string,
  defaultValue?: T
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

  return [
    (value ?? defaultValue) as T | null,
    setValue as Dispatch<SetStateAction<T | null>>,
  ];
}
