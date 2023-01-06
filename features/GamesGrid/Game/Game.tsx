import type { FC } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import { Game as IGame } from '@/common/types';
import { GameRow } from './GameRow';

export type GamesGridProps = {
  gameId: IGame['gameId'];
  awayTeam: IGame['awayTeam'];
  homeTeam: IGame['homeTeam'];
};

export const Game: FC<GamesGridProps> = ({ gameId, awayTeam, homeTeam }) => {
  return (
    <Link href={`/20${gameId.slice(3, 5)}/${gameId}`}>
      <a
        css={(theme) => css`
          padding: ${theme.borderWidth[2]};
          border: none;
          border-radius: ${theme.borderRadius.lg};
          font-size: ${theme.fontSize.sm};
          font-weight: ${theme.fontWeight.light};
          background: linear-gradient(
            135deg,
            ${theme.colors.secondary[200]},
            ${theme.colors.secondary[300]}
          );
          cursor: pointer;

          & > * {
            user-select: none;
          }

          & > span {
            display: flex;
            flex-direction: column;
            gap: ${theme.space[0.5]};

            & > span {
              background-color: ${theme.colors.secondary[100]};

              & > svg.winner-arrow {
                color: ${theme.colors.secondary[300]};
              }
            }

            & > span:first-of-type {
              border-top-left-radius: ${theme.borderRadius.base};
              border-top-right-radius: ${theme.borderRadius.base};
            }
            & > span:last-of-type {
              border-bottom-left-radius: ${theme.borderRadius.base};
              border-bottom-right-radius: ${theme.borderRadius.base};
            }
          }

          &:hover {
            & > span {
              & > span {
                background-color: ${theme.colors.secondary[200]};
              }
            }
          }

          &:active {
            & > span {
              & > span {
                background-color: ${theme.colors.secondary[300]};
              }
            }
          }
        `}
      >
        <span>
          <GameRow
            team={awayTeam}
            isWinner={(awayTeam?.score ?? 0) > (homeTeam?.score ?? 0)}
          />
          <GameRow
            team={homeTeam}
            isWinner={(homeTeam?.score ?? 0) > (awayTeam?.score ?? 0)}
          />
        </span>
      </a>
    </Link>
  );
};
