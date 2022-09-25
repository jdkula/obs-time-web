const suffixes: Record<string, number> = {
  ms: 1,
  millisecond: 1,
  milliseconds: 1,
  s: 1000,
  sec: 1000,
  second: 1000,
  seconds: 1000,
  m: 60 * 1000,
  min: 60 * 1000,
  minute: 60 * 1000,
  minutes: 60 * 1000,
  h: 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  hours: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  days: 24 * 60 * 60 * 1000,
};

export function parseDuration(duration: string): number {
  return duration.split(/\s+/gi).reduce((prev, cur) => {
    const parse = /\s*(\d+)\s*([a-zA-Z]+)\s*$/.exec(cur);
    if (!parse) return prev;
    const suffix = suffixes[parse[2].toLowerCase()];
    if (!suffix) return prev;
    return prev + parseFloat(parse[1]) * suffix;
  }, 0);
}

export function durationToString(totalMs: number, showMs?: boolean) {
  let negative = false;
  if (totalMs < 0) {
    totalMs = -totalMs;
    negative = true;
  }

  totalMs = Math.floor(totalMs);
  const ms = totalMs % 1000;
  totalMs = Math.floor(totalMs / 1000);
  const seconds = totalMs % 60;
  totalMs = Math.floor(totalMs / 60);
  const minutes = totalMs % 60;
  totalMs = Math.floor(totalMs / 60);
  const hours = totalMs % 24;
  totalMs = Math.floor(totalMs / 24);
  const days = totalMs;

  let out = '';
  if (days) out += days + 'days ';
  if (hours || out) out += hours + ':';

  out += minutes.toString().padStart(out ? 2 : 0, '0') + ':';
  out += seconds.toString().padStart(2, '0');
  if (showMs) {
    out = out.trim();
    out += '.' + ms.toString().padEnd(3, '0');
  }
  if (negative) {
    out = '-' + out;
  }
  return out.trim();
}
