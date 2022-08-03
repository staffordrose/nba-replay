import headers from '../headers';
import { Game } from '../../../common/types';

async function getGameIds(): Promise<string[]> {
  try {
    const request = new Request(
      `https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json`,
      {
        method: 'GET',
        headers,
      }
    );
    const response = await fetch(request);
    const data = await response.json();

    const games =
      data?.leagueSchedule?.gameDates?.flatMap(
        ({ games }: { games: Game[] }) => games
      ) ?? [];

    let gameIds = [];

    for (let i = 0; i < games.length; i++) {
      gameIds[i] = games[i].gameId;
    }

    return gameIds;
  } catch (error) {
    throw error;
  }
}

export default getGameIds;
