import { TeamName } from './TeamName';
import { TeamSlug } from './TeamSlug';
import { TeamTricode } from './TeamTricode';

export interface Team {
  teamId: string;
  altCityName: string;
  city: string;
  confName: 'East' | 'West';
  divName:
    | 'Atlantic'
    | 'Central'
    | 'Northwest'
    | 'Pacific'
    | 'Southeast'
    | 'Southwest';
  fullName: string;
  isAllStar: boolean;
  isNBAFranchise: boolean;
  nickname: TeamName;
  teamShortName: string;
  tricode: TeamTricode;
  urlName: TeamSlug;
}
