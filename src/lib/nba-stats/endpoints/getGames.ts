import headers from '../headers';
import { Game } from '../../../common/types';

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

function filterGameProperties(obj: Game): Game {
  for (const property in obj) {
    if (!keepProperties.includes(property)) {
      delete obj[property as keyof Game];
    }
  }

  return obj;
}

async function getGames(): Promise<Game[]> {
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

    let filteredGames = [];

    for (let i = 0; i < games.length; i++) {
      filteredGames[i] = filterGameProperties(games[i]);
    }

    return filteredGames;
  } catch (error) {
    throw error;
  }
}

export default getGames;
