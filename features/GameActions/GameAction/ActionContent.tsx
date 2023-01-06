import type { FC, ReactNode } from 'react';
import { css } from '@emotion/react';
import { GameAction } from '@/common/types';
import { formatGameTimestamp } from '@/common/utils';
import { Image } from '@/components';
import { StyledActionContent } from './ActionContent.styles';

export type ActionContentProps = {
  clock: GameAction['clock'];
  personId: GameAction['personId'];
  playerNameI: GameAction['playerNameI'];
  scoreAway: GameAction['scoreAway'];
  scoreHome: GameAction['scoreHome'];
  shotResult: GameAction['shotResult'];
  teamTricode: GameAction['teamTricode'];
  children: ReactNode;
};

export const ActionContent: FC<ActionContentProps> = ({
  clock,
  personId,
  playerNameI,
  scoreAway,
  scoreHome,
  shotResult,
  teamTricode,
  children,
}) => {
  return (
    <StyledActionContent shotResult={shotResult} teamTricode={teamTricode}>
      <span>{formatGameTimestamp(clock)}</span>

      {personId || teamTricode ? (
        // eslint-disable-next-line @next/next/no-img-element
        <Image
          src={
            personId
              ? `https://cdn.nba.com/headshots/nba/latest/260x190/${personId}.png`
              : `/images/teams/${teamTricode}.svg`
          }
          alt={personId ? `${playerNameI} Headshot` : `${teamTricode} Logo`}
          fallbackSrc='https://cdn.nba.com/headshots/nba/latest/260x190/logoman.png'
          width={28}
          height={28}
          objectFit='cover'
          css={(theme) => css`
            border-radius: 50%;
            background-color: ${theme.colors.blackAlpha[100]};
          `}
        />
      ) : (
        <div />
      )}

      <span>{children}</span>

      <span>
        {scoreAway} - {scoreHome}
      </span>
    </StyledActionContent>
  );
};
