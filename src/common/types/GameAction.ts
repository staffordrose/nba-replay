import { TeamTricode } from './TeamTricode';

type ActionType =
  | '2pt'
  | '3pt'
  | 'block'
  | 'ejection'
  | 'freethrow'
  | 'foul'
  | 'game'
  | 'instantreplay'
  | 'jumpball'
  | 'memo'
  | 'period'
  | 'rebound'
  | 'steal'
  | 'stoppage'
  | 'substitution'
  | 'timeout'
  | 'turnover'
  | 'violation';

export interface GameAction {
  actionNumber: number;
  actionType: ActionType;
  assistPersonId?: number;
  assistPlayerNameInitial?: string;
  clock: string;
  description?: string;
  descriptor?: string;
  edited?: string;
  foulDrawnPersonId?: number;
  foulDrawnPlayerName?: string;
  foulPersonalTotal?: number;
  foulTechnicalTotal?: number;
  isFieldGoal?: number;
  jumpBallLostPersonId?: number;
  jumpBallLostPlayerName?: string;
  jumpBallRecoverdPersonId?: number;
  jumpBallRecoveredName?: string;
  jumpBallWonPersonId?: number;
  jumpBallWonPlayerName?: string;
  officialId?: number;
  orderNumber?: number;
  period: number;
  periodType: 'REGULAR' | 'OVERTIME';
  personId: number;
  personIdsFilter?: number[];
  playerName?: string;
  playerNameI?: string;
  possession: number;
  qualifiers: string[];
  reboundDefensiveTotal?: number;
  reboundOffensiveTotal?: number;
  reboundTotal?: number;
  scoreAway: string;
  scoreHome: string;
  shotActionNumber?: number;
  shotDistance?: number;
  shotResult?: string;
  side: string | null;
  subType: string;
  teamId?: number;
  teamTricode?: TeamTricode;
  timeActual?: string;
  turnoverTotal?: number;
  value?: string;
  x: number | null;
  xLegacy?: number | null;
  y: number | null;
  yLegacy?: number | null;
}
