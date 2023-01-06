import { GameAction } from '@/common/types';
import { headers } from '@/lib/nba-stats/headers';

const keepProperties = [
  'actionNumber',
  'actionType',
  'assistPersonId',
  'assistPlayerNameInitial',
  'clock',
  'descriptor',
  'foulDrawnPersonId',
  'foulDrawnPlayerName',
  'jumpBallLostPersonId',
  'jumpBallLostPlayerName',
  'jumpBallRecoverdPersonId',
  'jumpBallRecoveredName',
  'jumpBallWonPersonId',
  'jumpBallWonPlayerName',
  'period',
  'periodType',
  'personId',
  'playerNameI',
  'possession',
  'qualifiers',
  'scoreAway',
  'scoreHome',
  'shotDistance',
  'shotResult',
  'side',
  'subType',
  'teamId',
  'teamTricode',
  'value',
  'x',
  'y',
];

const filterActionProperties = (obj: GameAction): GameAction => {
  for (const property in obj) {
    if (!keepProperties.includes(property)) {
      delete obj[property as keyof GameAction];
    }
  }

  return obj;
};

export const getPlayByPlay = async (gameId: string): Promise<GameAction[]> => {
  try {
    const request = new Request(
      `https://cdn.nba.com/static/json/liveData/playbyplay/playbyplay_${gameId}.json`,
      {
        method: 'GET',
        headers,
      }
    );
    const response = await fetch(request);
    const data = await response.json();

    if (data?.game?.actions) {
      let filteredPlayByPlay = [];

      for (let i = 0; i < data.game.actions.length; i++) {
        filteredPlayByPlay[i] = filterActionProperties(data.game.actions[i]);
      }

      return filteredPlayByPlay;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};
