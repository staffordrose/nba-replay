import { useCallback, useEffect, useMemo, useState } from 'react';
import { GameAction } from '@/common/types';
import { getElapsedActions, mapGameClockToSeconds } from '@/common/utils';

export type UseGameProps = {
  isPlaying?: boolean;
  playSpeed?: number;
  playByPlay: GameAction[];
};

export const useGame = ({
  isPlaying: initialIsPlaying = false,
  playSpeed: initialPlaySpeed = 1,
  playByPlay,
}: UseGameProps) => {
  const [isPlaying, setPlaying] = useState(initialIsPlaying);

  const [playSpeed, setPlaySpeed] = useState(initialPlaySpeed);

  const togglePlaying = useCallback(() => setPlaying((prev) => !prev), []);

  const togglePlaySpeed = () =>
    setPlaySpeed((prev) => (prev === 8 ? 1 : prev * 2));

  const totalPeriods = useMemo(
    () => playByPlay?.slice(-1)?.[0]?.period ?? 4,
    [playByPlay]
  );
  const totalMinutes = 48 + (totalPeriods - 4) * 5;
  const totalSeconds = totalMinutes * 60;

  const [gameClock, setGameClock] = useState({
    period: 1,
    minutes: 12,
    seconds: 0,
  });

  const elapsedSeconds = useMemo(
    () => mapGameClockToSeconds(gameClock),
    [gameClock]
  );

  useEffect(() => {
    if (isPlaying) {
      if (elapsedSeconds >= totalSeconds) {
        togglePlaying();
      }
    }
  }, [totalSeconds, elapsedSeconds, isPlaying, togglePlaying]);

  const [gameScore, setGameScore] = useState({
    away: 0,
    home: 0,
  });

  const shots = useMemo(
    () =>
      playByPlay?.filter((p) => ['2pt', '3pt'].includes(p.actionType)) ?? [],
    [playByPlay]
  );

  const filteredPlayByPlay = useMemo(
    () => getElapsedActions(gameClock, playByPlay),
    [playByPlay, gameClock]
  );

  return {
    isPlaying,
    playSpeed,
    togglePlaying,
    togglePlaySpeed,
    totalPeriods,
    totalMinutes,
    totalSeconds,
    gameClock,
    setGameClock,
    elapsedSeconds,
    gameScore,
    setGameScore,
    shots,
    filteredPlayByPlay,
  };
};
