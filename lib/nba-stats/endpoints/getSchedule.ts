import { Game, GameDate, Week } from '@/common/types';
import headers from '@/lib/nba-stats/headers';

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

interface Data {
  leagueSchedule: {
    leagueId: string;
    seasonYear: string;
    gameDates: GameDate[];
    weeks: Week[];
  };
  meta: {
    request: string;
    time: string;
    version: number;
  };
}

function filterGameProperties(obj: Game): Game {
  for (const property in obj) {
    if (!keepProperties.includes(property)) {
      delete obj[property as keyof Game];
    }
  }

  return obj;
}

async function getSchedule(): Promise<Data> {
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

    return data?.leagueSchedule?.gameDates
      ? {
          ...data,
          leagueSchedule: {
            ...data.leagueSchedule,
            gameDates: data.leagueSchedule.gameDates.map(
              ({ games, ...rest }: { games: Game[] }) => ({
                ...rest,
                games: games.map((game: Game) => filterGameProperties(game)),
              })
            ),
          },
        }
      : data;
  } catch (error) {
    throw error;
  }
}

export default getSchedule;
