export function formatGameTimestamp(clock: string): string {
  const minutes = parseInt(clock.slice(2, 4));
  const seconds = clock.slice(5, 7);
  const deciseconds = Math.round(parseFloat(clock.slice(8, 10)) / 10);

  if (minutes > 0) {
    return `${minutes}:${seconds}`;
  } else {
    return `${parseInt(seconds)}.${deciseconds}`;
  }
}
