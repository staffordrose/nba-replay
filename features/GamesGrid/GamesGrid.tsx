import type { FC } from 'react';
import dayjs from 'dayjs';
import { Game as IGame, GameDate } from '@/common/types';
import Game from './Game';
import { StyledGamesGrid } from './GamesGrid.styles';

interface GamesGridProps {
  gameDate: GameDate['gameDate'];
  games: IGame[];
}

const GamesGrid: FC<GamesGridProps> = ({ gameDate, games }) => {
  const date = dayjs(gameDate.split(' ')[0]);

  return (
    <StyledGamesGrid>
      <h2>{date.format('dddd, MMMM D, YYYY')}</h2>

      <hr />

      <div>
        {games?.map(({ gameId, awayTeam, homeTeam }) => (
          <Game
            key={gameId}
            gameId={gameId}
            awayTeam={awayTeam}
            homeTeam={homeTeam}
          />
        ))}
      </div>
    </StyledGamesGrid>
  );
};

export default GamesGrid;
