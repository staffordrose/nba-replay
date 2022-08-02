import { GameClock } from '../../types';

export function mapGameClockToSeconds({ period, minutes, seconds }: GameClock) {
  let totalSeconds = 0;

  // Previous regular periods
  totalSeconds += Math.min(period - 1, 4) * 12 * 60;

  // Previous overtime periods
  totalSeconds += Math.max(period - 5, 0) * 5 * 60;

  // Current period
  totalSeconds += ((period > 4 ? 5 : 12) - minutes) * 60 - seconds;

  return totalSeconds;
}
