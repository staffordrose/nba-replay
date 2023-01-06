import fs from 'fs';
import type { NextApiHandler, NextApiResponse } from 'next';
import { GameDate } from '@/common/types';
import { getGames } from '@/lib/nba-stats';

const BASE_PATH = 'public/data';
const SEASON = '2021';
const RESOURCE = 'games';
const PATH = `${BASE_PATH}/${SEASON}/${RESOURCE}`;

const handler: NextApiHandler = async (
  req,
  res
): Promise<NextApiResponse<GameDate[]> | void> => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests are allowed.' });
  }

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

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error?.message
          : `Something went wrong setting the season's games`,
    });
  }
};

export default handler;
