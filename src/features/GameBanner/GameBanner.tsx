import type { FC } from 'react';
import { Game, GameScore, GameClock } from '../../common/types';
import { Image } from '../../components';
import { GameColumn, StyledGameBanner, TeamColumn } from './GameBanner.styles';

interface GameBannerProps {
  awayTeam: Game['awayTeam'];
  homeTeam: Game['homeTeam'];
  gameStatusText: Game['gameStatusText'];
  gameClock: GameClock;
  gameScore: GameScore;
  totalSeconds: number;
  elapsedSeconds: number;
}

const GameBanner: FC<GameBannerProps> = ({
  awayTeam,
  homeTeam,
  gameStatusText,
  gameClock,
  gameScore,
  totalSeconds,
  elapsedSeconds,
}) => {
  const isFinal = elapsedSeconds >= totalSeconds;
  const period = isFinal
    ? gameStatusText
    : gameClock.period > 4
    ? `OT${gameClock.period - 4}`
    : `Q${gameClock.period}`;
  const time =
    !isFinal &&
    `${gameClock.minutes}:${gameClock.seconds.toString().padStart(2, '0')}`;

  return (
    <StyledGameBanner
      awayTeamTricode={awayTeam.teamTricode}
      homeTeamTricode={homeTeam.teamTricode}
    >
      <div>
        <TeamColumn>
          <span>
            <Image
              src={`/images/teams/${awayTeam.teamTricode}.svg`}
              alt={`${homeTeam.teamTricode} Logo`}
              width={96}
              height={96}
            />
          </span>
          <span>{awayTeam.teamTricode}</span>
        </TeamColumn>

        <GameColumn>
          <span>{`${period}${time ? ` ${time}` : ``}`}</span>
          <span>
            {gameScore.away}-{gameScore.home}
          </span>
        </GameColumn>

        <TeamColumn>
          <span>
            <Image
              src={`/images/teams/${homeTeam.teamTricode}.svg`}
              alt={`${homeTeam.teamTricode} Logo`}
              width={96}
              height={96}
            />
          </span>
          <span>{homeTeam.teamTricode}</span>
        </TeamColumn>
      </div>
    </StyledGameBanner>
  );
};

export default GameBanner;
