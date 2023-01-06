import { Team } from '@/common/types';
import headers from '@/lib/nba-stats/headers';

async function getAllTeams(year = 2021): Promise<Team[]> {
  try {
    const request = new Request(
      `https://data.nba.net/10s/prod/v1/${year}/teams.json`,
      {
        method: 'GET',
        headers,
      }
    );
    const response = await fetch(request);
    const data = await response.json();

    return (
      data?.league?.vegas?.filter((team: Team) => team.isNBAFranchise) ?? []
    );
  } catch (error) {
    throw error;
  }
}

export default getAllTeams;
