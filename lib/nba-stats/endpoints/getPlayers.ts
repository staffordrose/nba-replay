import { Player } from '@/common/types';
import headers from '@/lib/nba-stats/headers';

async function getAllPlayers(year = 2021): Promise<Player[]> {
  try {
    const request = new Request(
      `https://data.nba.net/10s/prod/v1/${year}/players.json`,
      {
        method: 'GET',
        headers,
      }
    );
    const response = await fetch(request);
    const data = await response.json();

    return data.league?.standard ?? [];
  } catch (error) {
    throw error;
  }
}

export default getAllPlayers;
