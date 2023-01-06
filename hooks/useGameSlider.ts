import { useCallback, useEffect, useMemo } from 'react';
import throttle from 'lodash.throttle';
import { GameAction, GameScore, GameClock } from '@/common/types';
import { getLastAction } from '@/common/utils';
import { useSlider } from '@/components';

interface UseGameSliderProps {
  playByPlay: GameAction[];
  totalMinutes: number;
  elapsedSeconds: number;
  setGameClock: (gameClock: GameClock) => void;
  setGameScore: (gameScore: GameScore) => void;
  isPlaying: boolean;
  playSpeed: number;
}

const useGameSlider = ({
  playByPlay,
  totalMinutes,
  elapsedSeconds,
  setGameClock,
  setGameScore,
  isPlaying,
  playSpeed,
}: UseGameSliderProps) => {
  const updateGameClockAndScore = useCallback(
    ({ value }: { value: number }) => {
      const period =
        Math.floor(value > 48 ? 4 + (value - 48) / 5 : value / 12) + 1;
      const periodTime =
        period > 4 ? 5 - ((value - 48) % 5) : 12 - (value % 12);
      const minutes = Math.floor(periodTime);
      const seconds = Math.round((periodTime - minutes) * 60);

      setGameClock({
        period,
        minutes,
        seconds,
      });

      const lastAction = getLastAction(
        { period, minutes, seconds },
        playByPlay
      );

      setGameScore({
        away: parseInt(lastAction?.scoreAway ?? '0'),
        home: parseInt(lastAction?.scoreHome ?? '0'),
      });
    },
    [playByPlay, setGameClock, setGameScore]
  );

  const throttledOnChange = useMemo(
    () => throttle(updateGameClockAndScore, 300),
    [updateGameClockAndScore]
  );

  useEffect(() => {
    return () => {
      throttledOnChange.cancel();
    };
  }, [throttledOnChange]);

  const { ref: sliderRef, api: sliderApi } = useSlider({
    name: 'minutes',
    max: totalMinutes,
    step: 1 / 15,
    onChange: throttledOnChange,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!sliderApi.isDragging && isPlaying) {
        const nextElapsed = elapsedSeconds + playSpeed;

        // Update slider value
        sliderApi.setValue(nextElapsed / 60);

        const regPeriod = 12 * 60;
        const otPeriod = 5 * 60;
        const regQuarters = 4;
        const regulation = regPeriod * regQuarters;

        const nextPeriod =
          nextElapsed > regulation
            ? Math.ceil((nextElapsed - regulation) / otPeriod) + regQuarters
            : nextElapsed > regPeriod
            ? Math.ceil(nextElapsed / regPeriod)
            : 1;

        const nextRemainingSeconds =
          nextPeriod > regQuarters
            ? otPeriod -
              (nextPeriod - regQuarters > 1
                ? nextElapsed -
                  regulation -
                  (nextPeriod - regQuarters - 1) * otPeriod
                : nextElapsed - regulation)
            : regPeriod -
              (nextPeriod > 1
                ? nextElapsed - (nextPeriod - 1) * regPeriod
                : nextElapsed);

        const nextGameClock = {
          period: nextPeriod,
          minutes: Math.floor(nextRemainingSeconds / 60),
          seconds: nextRemainingSeconds % 60,
        };

        setGameClock(nextGameClock);

        const lastAction = getLastAction(nextGameClock, playByPlay);

        setGameScore({
          away: lastAction?.scoreAway ? parseInt(lastAction.scoreAway) : 0,
          home: lastAction?.scoreHome ? parseInt(lastAction.scoreHome) : 0,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    sliderApi,
    isPlaying,
    playSpeed,
    playByPlay,
    elapsedSeconds,
    setGameClock,
    setGameScore,
  ]);

  return {
    sliderRef,
    sliderApi,
  };
};

export default useGameSlider;
