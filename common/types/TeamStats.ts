import { TeamName } from './TeamName';
import { TeamSlug } from './TeamSlug';
import { TeamTricode } from './TeamTricode';

type TeamStat = {
  avg: string;
  rank: string;
};

export type TeamStats = {
  abbreviation: TeamTricode;
  apg: TeamStat;
  bpg: TeamStat;
  drpg: TeamStat;
  eff: TeamStat;
  fgp: TeamStat;
  ftp: TeamStat;
  min: TeamStat;
  name: string;
  nickname: TeamName;
  oppg: TeamStat;
  orpg: TeamStat;
  pfpg: TeamStat;
  ppg: TeamStat;
  spg: TeamStat;
  teamId: string;
  teamcode: TeamSlug;
  tpg: TeamStat;
  tpp: TeamStat;
  trpg: TeamStat;
};
