import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { GameDate } from '../../src/common/types';
import { getGames } from '../../src/lib/nba-stats';

const BASE_PATH = 'public/data';
const SEASON = '2021';
const RESOURCE = 'games';
const PATH = `${BASE_PATH}/${SEASON}/${RESOURCE}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameDate[]>
) {
  try {
    const data = await getGames();

    if (Array.isArray(data)) {
      if (!fs.existsSync(BASE_PATH)) {
        fs.mkdirSync(BASE_PATH);
      }
      if (!fs.existsSync(`${BASE_PATH}/${SEASON}`)) {
        fs.mkdirSync(`${BASE_PATH}/${SEASON}`);
      }
      if (!fs.existsSync(PATH)) {
        fs.mkdirSync(PATH);
      }

      for (let i = 0; i < data.length; i++) {
        const game = data[i];

        fs.writeFile(
          `${PATH}/${game.gameId}.json`,
          JSON.stringify(game, null, 2),
          (err: any) => {
            if (err) throw err;
          }
        );
      }
    }
  } catch (error) {
    console.log('error :>>', error);
  }

  res.status(200);
}
