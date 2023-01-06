import { GameAction, GameClock } from '@/common/types';

function getElapsedActions(clock: GameClock, playByPlay: GameAction[]) {
  let filtered = [];

  for (let i = 0; i < playByPlay.length; i++) {
    const p = playByPlay[i];

    const minutes = parseInt(p.clock.slice(2, 4));
    const seconds = parseInt(p.clock.slice(5, 9));

    if (
      p.period < clock.period ||
      (p.period === clock.period &&
        minutes + seconds / 60 >= clock.minutes + clock.seconds / 60)
    ) {
      filtered.unshift(p);
    }
  }

  return filtered;
}

export default getElapsedActions;
