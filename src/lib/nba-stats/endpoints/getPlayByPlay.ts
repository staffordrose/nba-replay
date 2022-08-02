import headers from '../headers';
import { GameAction } from '../../../common/types';

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

function filterActionProperties(obj: GameAction): GameAction {
  for (const property in obj) {
    if (!keepProperties.includes(property)) {
      delete obj[property as keyof GameAction];
    }
  }

  return obj;
}

async function getPlayByPlay(gameId: string): Promise<GameAction[]> {
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

    return data?.game?.actions
      ? data.game.actions.filter((action: GameAction) =>
          filterActionProperties(action)
        )
      : [];
  } catch (error) {
    throw error;
  }
}

export default getPlayByPlay;
