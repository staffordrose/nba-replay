import { useState } from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { css } from '@emotion/react';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import dayjs from 'dayjs';
import { Game as IGame, GameAction } from '../../src/common/types';
import { Button, IconButton, Slider, Switch } from '../../src/components';
import { GameActions, GameBanner, ShotChart } from '../../src/features';
import { useGame, useGameSlider } from '../../src/hooks';
import { getGameIds } from '../../src/lib/nba-stats';

interface GameProps {
  game: IGame;
  playByPlay: GameAction[];
}

const Game: NextPage<GameProps> = ({ game, playByPlay }) => {
  const {
    isPlaying,
    playSpeed,
    togglePlaying,
    togglePlaySpeed,
    totalMinutes,
    totalSeconds,
    gameClock,
    setGameClock,
    elapsedSeconds,
    gameScore,
    setGameScore,
    shots,
    filteredPlayByPlay,
  } = useGame({ playByPlay });

  const { sliderRef, sliderApi } = useGameSlider({
    playByPlay,
    totalMinutes,
    elapsedSeconds,
    setGameClock,
    setGameScore,
    isPlaying,
    playSpeed,
  });

  const [camPosition, setCamPosition] = useState<'top' | 'side'>('top');

  const gameTitle = `${game.awayTeam.teamName} @ ${game.homeTeam.teamName}`;

  return (
    <>
      <Head>
        <title>{gameTitle} | NBA REPLAY</title>
        <meta name='description' content={`View ${gameTitle}.`} />
      </Head>

      <main
        css={(theme) => css`
          display: flex;
          flex-direction: column;
          width: ${theme.width.full};
          max-width: ${theme.maxWidth['5xl']};
          min-height: calc(${theme.height.screen} - ${theme.height[16]});
          margin: ${theme.margin.center};
          padding-bottom: ${theme.padding[16]};
        `}
      >
        <div
          css={(theme) => css`
            position: relative;
            display: grid;
            grid-template-areas:
              'teams teams teams'
              'date dot arena';
            grid-template-columns: repeat(3, auto);
            gap: ${theme.space[2]};
            justify-content: center;
            align-items: center;
            padding: ${theme.padding[4]} ${theme.padding[2]};

            & > h1,
            & > span {
              margin: 0;
              line-height: ${theme.lineHeight.base};
            }

            & > h1 {
              grid-area: teams;
              text-align: center;
            }
            & span:nth-of-type(1) {
              grid-area: date;
              justify-self: end;
            }
            & span:nth-of-type(2) {
              grid-area: dot;
              justify-self: center;
              display: inline;
              width: ${theme.width[1.5]};
              height: ${theme.height[1.5]};
              border-radius: ${theme.borderRadius.half};
              background-color: ${theme.colors.primary[100]};
            }
            & span:nth-of-type(3) {
              grid-area: arena;
              justify-self: start;
            }

            @media (min-width: ${theme.breakpoints.sm}) {
              grid-template-areas: 'date teams arena';
              grid-template-columns: 1fr 1.75fr 1fr;
              justify-content: space-between;
              margin-bottom: ${theme.margin[0.5]};
              padding: ${theme.padding[4]} ${theme.padding[3]};

              &::after {
                content: '';
                position: absolute;
                z-index: -2;
                bottom: -2px;
                left: 0;
                right: 0;
                height: ${theme.height[1]};
                background: linear-gradient(
                  to right,
                  transparent 0,
                  ${theme.colors.primary[50]} 25%,
                  ${theme.colors.primary[50]} 75%,
                  transparent 100%
                );
              }

              & > span:nth-of-type(1) {
                justify-self: start;
                text-align: left;
              }
              & > span:nth-of-type(2) {
                display: none;
                visibility: hidden;
              }
              & > span:nth-of-type(3) {
                justify-self: end;
                text-align: right;
              }
            }
          `}
        >
          <h1>{gameTitle}</h1>

          <span>
            {dayjs(game.gameDateTimeEst?.split('T')[0]).format('MMMM D, YYYY')}
          </span>

          <span />

          <span>{game.arenaName}</span>
        </div>

        <div
          css={(theme) => css`
            position: sticky;
            z-index: 1000;
            top: ${theme.space[14]};
            background: linear-gradient(
              ${theme.colors.white} 96.5%,
              ${theme.colors.transparent} 100%
            );
          `}
        >
          <div
            css={(theme) => css`
              width: ${theme.width.full};

              @media (min-width: ${theme.breakpoints.sm}) {
                padding: ${theme.padding[3]};
              }
            `}
          >
            <GameBanner
              awayTeam={game.awayTeam}
              homeTeam={game.homeTeam}
              gameStatusText={game.gameStatusText}
              gameClock={gameClock}
              gameScore={gameScore}
              totalSeconds={totalSeconds}
              elapsedSeconds={elapsedSeconds}
            />
          </div>

          <div
            css={(theme) => css`
              width: ${theme.width.full};
              margin: 0 ${theme.margin.auto} ${theme.margin[4]}
                ${theme.margin.auto};

              @media (min-width: ${theme.breakpoints.sm}) {
                padding-left: ${theme.padding[3]};
                padding-right: ${theme.padding[3]};
              }
            `}
          >
            <div
              css={(theme) => css`
                @media (min-width: ${theme.breakpoints.sm}) {
                  border-width: ${theme.borderWidth[3]};
                  border-style: solid;
                  border-color: ${theme.colors.primary[50]};
                  border-radius: ${theme.borderRadius['2xl']};
                }
              `}
            >
              <div
                css={(theme) => css`
                  position: relative;
                  overflow: hidden;
                  border-top-left-radius: ${theme.borderRadius.xl};
                  border-top-right-radius: ${theme.borderRadius.xl};
                  background-color: ${theme.colors.white};

                  @media (min-width: ${theme.breakpoints.sm}) {
                    border-width: ${theme.borderWidth[0]};
                    border-bottom-width: ${theme.borderWidth[3]};
                    border-style: solid;
                    border-color: ${theme.colors.primary[50]};
                  }
                `}
              >
                <div
                  css={(theme) => css`
                    position: absolute;
                    z-index: 2;
                    top: ${theme.space[3]};
                    left: ${theme.space[3]};
                    width: ${theme.width.auto};
                    height: ${theme.height.auto};
                  `}
                >
                  <Switch
                    variant='light'
                    orientation='vertical'
                    isChecked={camPosition === 'side'}
                    onChange={() =>
                      setCamPosition(camPosition === 'top' ? 'side' : 'top')
                    }
                  />
                </div>

                <div
                  css={(theme) => css`
                    aspect-ratio: 2.25 / 1;
                    object-fit: contain;
                    padding-top: 4%;

                    @media (min-width: ${theme.breakpoints.sm}) {
                      aspect-ratio: 2.75 / 1;
                      padding-top: 0;
                    }
                  `}
                >
                  <ShotChart
                    camPosition={camPosition}
                    awayTeam={game.awayTeam}
                    homeTeam={game.homeTeam}
                    shots={shots}
                    gameClock={gameClock}
                  />
                </div>
              </div>

              <div
                css={(theme) => css`
                  display: grid;
                  grid-template-columns: 1fr repeat(2, auto);
                  align-items: center;
                  width: ${theme.width.full};
                  background-color: ${theme.colors.primary[50]};

                  @media (min-width: ${theme.breakpoints.lg}) {
                    border-bottom-left-radius: ${theme.borderRadius.base};
                    border-bottom-right-radius: ${theme.borderRadius.base};
                  }
                `}
              >
                <div
                  css={(theme) => css`
                    width: ${theme.width.full};
                    padding-left: ${theme.padding[4]};
                    padding-right: ${theme.padding[4]};
                  `}
                >
                  <Slider innerRef={sliderRef} api={sliderApi} />
                </div>

                <IconButton
                  variant='solid'
                  colorScheme='secondary'
                  size='xl'
                  p={0}
                  borderRadius='full'
                  aria-label={isPlaying ? 'Pause game' : 'Play game'}
                  onClick={() => {
                    if (elapsedSeconds >= totalSeconds) {
                      setGameClock({
                        period: 1,
                        minutes: 12,
                        seconds: 0,
                      });
                    }

                    togglePlaying();
                  }}
                  css={(theme) => css`
                    position: relative;
                    z-index: 1;
                    width: ${theme.width[12]};
                    height: ${theme.height[12]};
                    margin-top: -${theme.margin[1]};
                    margin-bottom: -${theme.margin[1]};
                    margin-right: -${theme.margin[3]};

                    & > span > svg {
                      width: ${theme.width[8]};
                      height: ${theme.height[8]};
                    }

                    @media (min-width: ${theme.breakpoints.sm}) {
                      width: ${theme.width[16]};
                      height: ${theme.height[16]};
                      margin-top: -${theme.margin[3]};
                      margin-bottom: -${theme.margin[3]};
                      margin-right: -${theme.margin[2]};

                      & > span > svg {
                        width: ${theme.width[10]};
                        height: ${theme.height[10]};
                      }
                    }
                  `}
                >
                  {isPlaying ? <MdPause /> : <MdPlayArrow />}
                </IconButton>

                <Button
                  size='md'
                  borderWidth={0}
                  borderRadius='none'
                  fontSize='xl'
                  fontWeight='medium'
                  aria-label='Toggle play speed'
                  onClick={togglePlaySpeed}
                  css={(theme) => css`
                    width: ${theme.width[14]};

                    & > span {
                      padding-left: ${theme.padding[5]};
                    }

                    @media (min-width: ${theme.breakpoints.sm}) {
                      width: ${theme.width[16]};
                      border-bottom-right-radius: ${theme.borderRadius.xl};

                      & > span {
                        padding-left: ${theme.padding[3]};
                        border-bottom-right-radius: ${theme.borderRadius.xl};
                      }
                    }
                  `}
                >
                  {playSpeed}x
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          css={(theme) => css`
            width: ${theme.width.full};
            max-width: ${theme.maxWidth['4xl']};
            min-height: ${theme.height[40]};
            margin: ${theme.margin.center};
            padding: 0 ${theme.padding[2]};

            & > h2 {
              margin-bottom: ${theme.margin[4]};
              text-align: center;
            }

            & > hr {
              width: ${theme.width.full};
              height: ${theme.height[1]};
              margin-bottom: ${theme.margin[4]};
              border: none;
              background: linear-gradient(
                to right,
                transparent 0,
                ${theme.colors.primary[50]} 25%,
                ${theme.colors.primary[50]} 75%,
                transparent 100%
              );
            }

            @media (min-width: ${theme.breakpoints.sm}) {
              padding: 0 ${theme.padding[3]};
            }
          `}
        >
          <h2>Play by Play</h2>

          <hr />

          <GameActions playByPlay={filteredPlayByPlay} />
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const gameIds = await getGameIds();

  return {
    paths: gameIds.map((gameId) => ({ params: { season: '2021', gameId } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fs = require('fs');
  const path = require('path');

  let game: IGame = {} as IGame;
  let playByPlay: GameAction[] = [];
  let error = null;

  const season = Array.isArray(params?.season)
    ? params?.season[0]
    : params?.season;
  const gameId = Array.isArray(params?.gameId)
    ? params?.gameId[0]
    : params?.gameId;

  try {
    if (!season) throw new Error('season is missing');
    if (!gameId) throw new Error('gameId is missing');

    const gameRes = fs.readFileSync(
      path.join(process.cwd(), `/public/data/${season}/games/${gameId}.json`),
      'utf8'
    );
    game = JSON.parse(gameRes);

    const playByPlayRes = fs.readFileSync(
      path.join(
        process.cwd(),
        `/public/data/${season}/playbyplay/${gameId}.json`
      ),
      'utf8'
    );
    playByPlay = JSON.parse(playByPlayRes);
  } catch (err: any) {
    const msg = err.message;

    console.log('Error requesting game :>> ', msg);

    error = {
      title: `Couldn't Retrieve Game`,
      message:
        msg === 'season is missing' || msg === 'gameId is missing'
          ? `The ${msg}.`
          : `The ${season}-${(Number(season) + 1)
              .toString()
              .slice(
                2
              )} season is unavailable, or game "${gameId}" does not exist for that season.`,
    };
  }

  return {
    props: {
      game,
      playByPlay,
      error,
    },
  };
};

export default Game;
