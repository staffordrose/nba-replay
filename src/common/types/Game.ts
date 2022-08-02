import { Player } from './Player';
import { TeamName } from './TeamName';
import { TeamSlug } from './TeamSlug';
import { TeamTricode } from './TeamTricode';

interface GameTeam {
  teamId: number;
  teamCity: string;
  teamName: TeamName;
  teamSlug: TeamSlug;
  teamTricode: TeamTricode;
  wins: number;
  losses: number;
  seed: number;
  score?: number;
}

export interface Game {
  arenaCity: string;
  arenaName: string;
  arenaState: string;
  awayTeam: GameTeam;
  awayTeamTime?: string;
  day: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
  gameCode: string;
  gameDateEst?: string;
  gameDateTimeEst: string;
  gameDateTimeUTC: string;
  gameDateUTC?: string;
  gameId: string;
  gameSequence?: number;
  gameStatus: number;
  gameStatusText: string;
  gameTimeEst?: string;
  gameTimeUTC?: string;
  homeTeam: GameTeam;
  homeTeamTime: string;
  ifNecessary: boolean | null;
  monthNum: number;
  pointsLeaders?: Player[];
  postponedStatus: string;
  seriesGameNumber: string;
  seriesText: string;
  weekName?: string;
  weekNumber: number;
}
