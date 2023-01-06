import { GameAction, GameClock } from '@/common/types';

function getLastAction(clock: GameClock, playByPlay: GameAction[]) {
  const nextIndex = playByPlay.findIndex((s) => {
    const minutes = parseInt(s.clock.slice(2, 4));
    const seconds = parseInt(s.clock.slice(5, 9));

    return (
      s.period >= clock.period &&
      minutes + seconds / 60 < clock.minutes + clock.seconds / 60
    );
  });

  return nextIndex === 0
    ? playByPlay[0]
    : playByPlay[nextIndex - 1]
    ? playByPlay[nextIndex - 1]
    : playByPlay[playByPlay.length - 1];
}

export default getLastAction;
