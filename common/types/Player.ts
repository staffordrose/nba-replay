interface PlayerTeam {
  teamId: string;
  seasonStart: string;
  seasonEnd: string;
}

export interface Player {
  collegeName: string;
  country: string;
  dateOfBirthUTC: string;
  draft: {
    teamId: string;
    pickNum: string;
    roundNum: string;
    seasonYear: string;
  };
  firstName: string;
  heightFeet: string;
  heightInches: string;
  heightMeters: string;
  isActive: boolean;
  jersey: string;
  lastAffiliation: string;
  lastName: string;
  nbaDebutYear: string;
  personId: string;
  pos: string;
  teamId: string;
  teamSitesOnly: {
    playerCode: string;
    posFull: string;
    displayAffiliation: string;
    freeAgentCode: string;
  };
  teams: PlayerTeam[];
  temporaryDisplayName: string;
  weightKilograms: string;
  weightPounds: string;
  yearsPro: string;
}
