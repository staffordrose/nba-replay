import fs from 'fs';
import type { NextApiHandler, NextApiResponse } from 'next';
import { GameDate } from '@/common/types';
import { getSchedule } from '@/lib/nba-stats';

const BASE_PATH = 'public/data';
const SEASON = '2021';
const RESOURCE = 'schedule';
const PATH = `${BASE_PATH}/${SEASON}/${RESOURCE}`;

const handler: NextApiHandler = async (
  req,
  res
): Promise<NextApiResponse<GameDate[]> | void> => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests are allowed.' });
  }

  try {
    const data = await getSchedule();

    if (Array.isArray(data.leagueSchedule?.gameDates)) {
      const allGameDates = data.leagueSchedule.gameDates;

      if (!fs.existsSync(BASE_PATH)) {
        fs.mkdirSync(BASE_PATH);
      }
      if (!fs.existsSync(`${BASE_PATH}/${SEASON}`)) {
        fs.mkdirSync(`${BASE_PATH}/${SEASON}`);
      }
      if (!fs.existsSync(PATH)) {
        fs.mkdirSync(PATH);
      }

      if (!fs.existsSync(`${PATH}/pre-season`)) {
        fs.mkdirSync(`${PATH}/pre-season`);
      }
      if (!fs.existsSync(`${PATH}/reg-season`)) {
        fs.mkdirSync(`${PATH}/reg-season`);
      }
      if (!fs.existsSync(`${PATH}/all-star`)) {
        fs.mkdirSync(`${PATH}/all-star`);
      }
      if (!fs.existsSync(`${PATH}/post-season`)) {
        fs.mkdirSync(`${PATH}/post-season`);
      }
      if (!fs.existsSync(`${PATH}/play-in`)) {
        fs.mkdirSync(`${PATH}/play-in`);
      }

      const PRE_SEASON = `001${SEASON.slice(2)}`;
      const REG_SEASON = `002${SEASON.slice(2)}`;
      const ALL_STAR = `003${SEASON.slice(2)}`;
      const POST_SEASON = `004${SEASON.slice(2)}`;
      const PLAY_IN = `005${SEASON.slice(2)}`;

      const preSeason = [];
      const regSeason: GameDate[][] = [...Array(25)].map(() => []);
      const allStar = [];
      const postSeason: GameDate[][] = [...Array(4)].map(() => []);
      const playIn = [];

      for (let i = 0; i < allGameDates.length; i++) {
        const gameDate = allGameDates[i];

        // Pre-season
        if (gameDate.games.some((game) => game.gameId.startsWith(PRE_SEASON))) {
          const games = gameDate.games.filter((game) =>
            game.gameId.startsWith(PRE_SEASON)
          );
          preSeason.push({ ...gameDate, games });
        }

        // Regular season
        if (gameDate.games.some((game) => game.gameId.startsWith(REG_SEASON))) {
          const games = gameDate.games.filter((game) =>
            game.gameId.startsWith(REG_SEASON)
          );
          regSeason[games[0].weekNumber - 1].push({ ...gameDate, games });
        }

        // All-star
        if (gameDate.games.some((game) => game.gameId.startsWith(ALL_STAR))) {
          const games = gameDate.games.filter((game) =>
            game.gameId.startsWith(ALL_STAR)
          );
          allStar.push({ ...gameDate, games });
        }

        // Post-season
        if (
          gameDate.games.some((game) => game.gameId.startsWith(POST_SEASON))
        ) {
          const games = gameDate.games.filter((game) =>
            game.gameId.startsWith(POST_SEASON)
          );

          for (let r = 0; r < 4; r++) {
            const roundGames = games.filter(
              (game) => parseInt(game.gameId.slice(7, 8)) === r + 1
            );

            if (roundGames.length)
              postSeason[r].push({ ...gameDate, games: roundGames });
          }
        }

        // Play-in
        if (gameDate.games.some((game) => game.gameId.startsWith(PLAY_IN))) {
          const games = gameDate.games.filter((game) =>
            game.gameId.startsWith(PLAY_IN)
          );
          playIn.push({ ...gameDate, games });
        }
      }

      // Write pre-season game dates to file
      fs.writeFile(
        `${PATH}/pre-season/pre-season.json`,
        JSON.stringify(preSeason, null, 2),
        (err) => {
          if (err instanceof Error) throw err;
        }
      );

      // Write reg-season game dates to week files
      for (let i = 0; i < regSeason.length; i++) {
        fs.writeFile(
          `${PATH}/reg-season/week-${i + 1}.json`,
          JSON.stringify(regSeason[i], null, 2),
          (err) => {
            if (err instanceof Error) throw err;
          }
        );
      }

      // Write all-star game date to file
      fs.writeFile(
        `${PATH}/all-star/all-star.json`,
        JSON.stringify(allStar, null, 2),
        (err) => {
          if (err instanceof Error) throw err;
        }
      );

      // Write post-season game dates to round files
      for (let i = 0; i < postSeason.length; i++) {
        fs.writeFile(
          `${PATH}/post-season/round-${i + 1}.json`,
          JSON.stringify(postSeason[i], null, 2),
          (err) => {
            if (err instanceof Error) throw err;
          }
        );
      }

      // Write play-in game dates to file
      fs.writeFile(
        `${PATH}/play-in/play-in.json`,
        JSON.stringify(playIn, null, 2),
        (err) => {
          if (err instanceof Error) throw err;
        }
      );
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error?.message
          : `Something went wrong setting the season schedule`,
    });
  }
};

export default handler;
