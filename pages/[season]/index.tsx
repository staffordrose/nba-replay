import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { css } from '@emotion/react';
import { scheduleItems, seasons } from '@/common/data';
import { GameDate } from '@/common/types';
import { useScheduleContext } from '@/context';
import { GamesGrid, Schedule } from '@/features';

interface GameScheduleProps {
  season: number;
  schedule: GameDate[];
}

const GameSchedule: NextPage<GameScheduleProps> = ({ season, schedule }) => {
  const { scrollToRef } = useScheduleContext();

  const { id } = seasons[season];

  const seasonTitle = `${id} Schedule`;

  return (
    <>
      <Head>
        <title>{seasonTitle} | NBA REPLAY</title>
        <meta name='description' content={`View ${seasonTitle}.`} />
      </Head>

      <main
        css={(theme) => css`
          min-height: calc(${theme.height.screen} - ${theme.height[16]});
        `}
      >
        <div
          css={(theme) => css`
            width: ${theme.width.full};
            max-width: ${theme.breakpoints.lg};
            margin: ${theme.margin.center};
            padding: 0 ${theme.padding[2]};
            text-align: center;

            @media (min-width: ${theme.breakpoints.sm}) {
              padding: 0 ${theme.padding[3]};
            }
          `}
        >
          <h1>{seasonTitle}</h1>
        </div>

        <div ref={scrollToRef} />

        <div
          css={(theme) => css`
            position: sticky;
            z-index: 1200;
            top: ${theme.space[14]};
          `}
        >
          <Schedule />
        </div>

        <div
          css={(theme) => css`
            width: ${theme.width.full};
            max-width: ${theme.breakpoints.lg};
            margin: ${theme.margin.center};
            padding: ${theme.padding[2]};

            @media (min-width: ${theme.breakpoints.sm}) {
              padding: ${theme.padding[3]};
            }
          `}
        >
          {schedule?.map(({ gameDate, games }) => (
            <GamesGrid key={gameDate} gameDate={gameDate} games={games} />
          ))}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  const fs = require('fs');
  const path = require('path');

  let season: string = Array.isArray(params?.season)
    ? params?.season[0] ?? ''
    : params?.season ?? '';
  let schedule: GameDate[] = [];
  let error = null;

  try {
    if (!season) throw new Error('season is missing');
    if (scheduleItems.some(({ id }) => id === season))
      throw new Error('season is invalid');

    const scheduleItemId = query.id
      ? Array.isArray(query.id)
        ? query.id[0]
        : query.id
      : 'pre-season';

    const scheduleItem =
      scheduleItems.find(({ id }) => id === scheduleItemId) ?? scheduleItems[0];

    const res = fs.readFileSync(
      path.join(
        process.cwd(),
        `/public/data/${season}/schedule/${scheduleItem.category}/${scheduleItem.id}.json`
      ),
      'utf8'
    );
    schedule = JSON.parse(res);
  } catch (err: any) {
    const msg = err.message;

    console.log('Error requesting season :>> ', msg);

    error = {
      title: `Couldn't Retrieve Season`,
      message:
        msg === 'season is missing'
          ? `The ${msg}.`
          : `The ${season}-${(Number(season) + 1)
              .toString()
              .slice(2)} season is unavailable.`,
    };
  }

  return {
    props: {
      season,
      schedule,
      error,
    },
  };
};

export default GameSchedule;
