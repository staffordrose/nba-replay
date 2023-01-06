import { Game } from '@/common/types';
import { headers } from '@/lib/nba-stats/headers';

const keepProperties = [
  'arenaCity',
  'arenaName',
  'arenaState',
  'awayTeam',
  'day',
  'gameCode',
  'gameDateTimeEst',
  'gameDateTimeUTC',
  'gameId',
  'gameStatus',
  'gameStatusText',
  'homeTeam',
  'homeTeamTime',
  'ifNecessary',
  'monthNum',
  'postponedStatus',
  'seriesGameNumber',
  'seriesText',
  'weekNumber',
];

const filterGameProperties = (obj: Game): Game => {
  for (const property in obj) {
    if (!keepProperties.includes(property)) {
      delete obj[property as keyof Game];
    }
  }

  return obj;
};

export const getGames = async (): Promise<Game[]> => {
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

    const filteredGames = [];

    for (let i = 0; i < games.length; i++) {
      filteredGames[i] = filterGameProperties(games[i]);
    }

    return filteredGames;
  } catch (error) {
    throw error;
  }
};
