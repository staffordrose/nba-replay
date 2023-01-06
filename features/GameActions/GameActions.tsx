import type { FC } from 'react';
import { GameAction as IGameAction } from '@/common/types';
import { GameAction } from './GameAction';
import { StyledGameActions } from './GameActions.styles';

export type GameActionsProps = {
  playByPlay: IGameAction[];
};

export const GameActions: FC<GameActionsProps> = ({ playByPlay }) => {
  return (
    <StyledGameActions>
      {playByPlay.map((action: IGameAction, i: number) => (
        <GameAction
          key={action.actionNumber}
          action={action}
          previousAction={i > 0 ? playByPlay[i - 1] : undefined}
          nextAction={i < playByPlay.length - 1 ? playByPlay[i + 1] : undefined}
        />
      ))}
    </StyledGameActions>
  );
};
