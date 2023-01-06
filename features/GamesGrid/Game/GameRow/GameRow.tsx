import type { FC } from 'react';
import { css } from '@emotion/react';
import { MdArrowLeft } from 'react-icons/md';
import { Game } from '@/common/types';
import { Image } from '@/components';

export type GameRowProps = {
  team: Game['awayTeam'] | Game['homeTeam'];
  isWinner?: boolean;
};

export const GameRow: FC<GameRowProps> = ({ team, isWinner }) => {
  return (
    <span
      css={(theme) => css`
        position: relative;
        display: grid;
        grid-template-columns: 28px 1fr auto;
        gap: ${theme.space[1.5]};
        align-items: center;
        padding: ${theme.space[1]};
        padding-right: ${isWinner ? theme.space[3] : theme.space[2]};
        color: ${isWinner ? theme.colors.black : theme.colors.gray[500]};

        & > svg.winner-arrow {
          position: absolute;
          right: -14px;

          width: ${theme.width[8]};
          height: ${theme.height[8]};
        }

        & > span.team-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}
    >
      {isWinner && <MdArrowLeft className='winner-arrow' />}

      {team.teamTricode ? (
        // eslint-disable-next-line @next/next/no-img-element
        <Image
          src={`/images/teams/${team.teamTricode}.svg`}
          alt={`${team.teamTricode} Logo`}
          fallbackSrc='https://cdn.nba.com/headshots/nba/latest/260x190/logoman.png'
          width={28}
          height={28}
          objectFit='cover'
          css={css`
            opacity: ${isWinner ? 1 : 0.5};
          `}
        />
      ) : (
        <span />
      )}
      <span className='team-name'>{team.teamName}</span>
      <span>{team.score}</span>
    </span>
  );
};
