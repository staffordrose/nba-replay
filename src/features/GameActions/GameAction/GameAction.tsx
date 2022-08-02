import { memo } from 'react';
import type { FC } from 'react';
// import Link from 'next/link';
import { teamNames } from '../../../common/data';
import { areEqual } from '../../../common/utils';
import { GameAction as IGameAction } from '../../../common/types';
import { addOrdinalSuffix, toTitleCase } from '../../../common/utils';
import ActionContent from './ActionContent';

interface GameActionProps {
  action: IGameAction;
  previousAction?: IGameAction;
  nextAction?: IGameAction;
}

const GameAction: FC<GameActionProps> = ({
  action,
  previousAction: previous,
  nextAction: next,
}) => {
  const {
    actionType,
    // assistPersonId,
    assistPlayerNameInitial: assistPlayerNameI,
    clock,
    descriptor,
    // foulDrawnPersonId,
    foulDrawnPlayerName,
    // jumpBallLostPersonId,
    jumpBallLostPlayerName,
    // jumpBallRecoverdPersonId,
    jumpBallRecoveredName,
    // jumpBallWonPersonId,
    jumpBallWonPlayerName,
    period,
    personId,
    playerNameI,
    qualifiers,
    scoreAway,
    scoreHome,
    shotDistance,
    shotResult,
    subType,
    // teamId,
    teamTricode,
    value,
  } = action;

  const contentProps = {
    clock,
    personId,
    playerNameI,
    scoreAway,
    scoreHome,
    shotResult,
    teamTricode,
  };

  switch (actionType) {
    case '2pt':
      return (
        <ActionContent {...contentProps}>
          {/* <Link href={`/players/${personId}`}>
            <a>{playerNameI}</a>
          </Link>{' '} */}
          {playerNameI} {shotResult?.toLowerCase()}{' '}
          {descriptor ? `${descriptor} ` : ``}
          {['Layup', 'DUNK'].includes(subType)
            ? ''
            : shotDistance
            ? `${Math.floor(shotDistance)}'`
            : 'two-point'}{' '}
          {subType?.toLowerCase()}
          {/* {!!assistPlayerNameI && (
            <>
              {` (assisted by `}
              <Link href={`/players/${assistPersonId}`}>
                <a>{assistPlayerNameI}</a>
              </Link>
              {`)`}
            </>
          )} */}
          {!!assistPlayerNameI && ` (assisted by ${assistPlayerNameI})`}
        </ActionContent>
      );
    case '3pt':
      return (
        <ActionContent {...contentProps}>
          {/* <Link href={`/players/${personId}`}>
            <a>{playerNameI}</a>
          </Link>{' '} */}
          {playerNameI} {shotResult?.toLowerCase()}{' '}
          {shotDistance ? `${Math.floor(shotDistance)}'` : ``} {'three point '}
          {subType?.toLowerCase()}
          {/* {!!assistPlayerNameI && (
            <>
              {` (assisted by `}
              <Link href={`/players/${assistPersonId}`}>
                <a>{assistPlayerNameI}</a>
              </Link>
              {`)`}
            </>
          )} */}
          {!!assistPlayerNameI && ` (assisted by ${assistPlayerNameI})`}
        </ActionContent>
      );
    case 'block':
      return (
        <ActionContent {...contentProps}>
          {/* <Link href={`/players/${personId}`}>
            <a>{playerNameI}</a>
          </Link>{' '} */}
          {playerNameI} blocked{' '}
          {previous?.playerNameI ? (
            <>
              {/* <Link href={`/players/${previous.personId}`}>
                <a>{previous.playerNameI}</a>
              </Link>{' '} */}
              {previous.playerNameI}{' '}
              {previous.descriptor ? `${previous.descriptor} ` : ``}
              {['Layup', 'DUNK'].includes(previous.subType)
                ? ''
                : previous.shotDistance
                ? `${Math.floor(previous.shotDistance)}'`
                : 'two-point'}{' '}
              {previous.subType?.toLowerCase()} attempt
            </>
          ) : (
            'shot attempt'
          )}{' '}
        </ActionContent>
      );
    case 'ejection':
      return (
        <ActionContent {...contentProps}>
          {/* <Link href={`/players/${personId}`}>
            <a>{playerNameI}</a>
          </Link>{' '} */}
          {playerNameI} {actionType} ({subType?.toLowerCase()})
        </ActionContent>
      );
    case 'freethrow':
      return (
        <ActionContent {...contentProps}>
          {/* <Link href={`/players/${personId}`}>
            <a>{playerNameI}</a>
          </Link>{' '} */}
          {playerNameI} {shotResult?.toLowerCase()}{' '}
          {descriptor ? `${descriptor} ` : ``}
          {actionType} {subType?.toLowerCase()}
        </ActionContent>
      );
    case 'foul':
      return (
        <ActionContent {...contentProps}>
          {/* <Link href={`/players/${personId}`}>
            <a>{playerNameI}</a>
          </Link>{' '} */}
          {playerNameI} {subType}{' '}
          {qualifiers.includes('2freethrow') ? `shooting` : ``} {actionType}
          {/* {!!foulDrawnPlayerName && (
            <>
              {` (drawn by `}
              <Link href={`/players/${foulDrawnPersonId}`}>
                <a>{foulDrawnPlayerName}</a>
              </Link>
              {`)`}
            </>
          )} */}
          {!!foulDrawnPlayerName && ` (drawn by ${foulDrawnPlayerName})`}
        </ActionContent>
      );
    case 'game':
      return <ActionContent {...contentProps}>End of game</ActionContent>;
    case 'instantreplay':
      return (
        <ActionContent {...contentProps}>
          Instant replay
          {!!value && ` (${value.toLowerCase()})`}
        </ActionContent>
      );
    case 'jumpball':
      return (
        <ActionContent {...contentProps}>
          Jump ball{' '}
          {/* <Link href={`/players/${jumpBallWonPersonId}`}>
            <a>{jumpBallWonPlayerName}</a>
          </Link>{' '} */}
          {jumpBallWonPlayerName} vs.{' '}
          {/* <Link href={`/players/${jumpBallLostPersonId}`}>
            <a>{jumpBallLostPlayerName}</a>
          </Link>{' '} */}
          {jumpBallLostPlayerName}{' '}
          {/* {!!jumpBallRecoveredName && (
            <>
              {` (possession gained by `}
              <Link href={`/players/${jumpBallRecoverdPersonId}`}>
                <a>{jumpBallRecoveredName}</a>
              </Link>
              {`)`}
            </>
          )} */}
          {!!jumpBallRecoveredName &&
            ` (possession gained by ${jumpBallRecoveredName})`}
        </ActionContent>
      );
    case 'memo':
      return <ActionContent {...contentProps}>{value}</ActionContent>;
    case 'period':
      return (
        <ActionContent {...contentProps}>
          {toTitleCase(subType)} of {addOrdinalSuffix(period)} {actionType}
        </ActionContent>
      );
    case 'rebound':
      if (next?.actionType === 'freethrow' && next.subType === '2 of 2') {
        return null;
      }

      return (
        <ActionContent {...contentProps}>
          {personId
            ? // <Link href={`/players/${personId}`}>
              //   <a>{playerNameI}</a>
              // </Link>
              playerNameI
            : teamTricode
            ? // <Link href={`/teams/${teamId}`}>
              //   <a>{teamNames[teamTricode]}</a>
              // </Link>
              teamNames[teamTricode]
            : 'Team'}{' '}
          {subType} {actionType}
        </ActionContent>
      );
    case 'steal':
      return (
        <ActionContent {...contentProps}>
          {/* <Link href={`/players/${personId}`}>
            <a>{playerNameI}</a>
          </Link>{' '} */}
          {playerNameI} {subType} {actionType}
        </ActionContent>
      );
    case 'timeout':
      return (
        <ActionContent {...contentProps}>
          {teamTricode
            ? // <Link href={`/teams/${teamId}`}>
              //   <a>{teamNames[teamTricode]}</a>
              // </Link>
              teamNames[teamTricode]
            : 'Team'}{' '}
          {subType} {actionType}
        </ActionContent>
      );
    case 'turnover':
      return (
        <ActionContent {...contentProps}>
          {personId
            ? // <Link href={`/players/${personId}`}>
              //   <a>{playerNameI}</a>
              // </Link>
              playerNameI
            : teamTricode
            ? // <Link href={`/teams/${teamId}`}>
              //   <a>{teamNames[teamTricode]}</a>
              // </Link>
              teamNames[teamTricode]
            : 'Team'}{' '}
          {subType} {actionType}
        </ActionContent>
      );
    case 'violation':
      return (
        <ActionContent {...contentProps}>
          {personId
            ? // <Link href={`/players/${personId}`}>
              //   <a>{playerNameI}</a>
              // </Link>
              playerNameI
            : teamTricode
            ? // <Link href={`/teams/${teamId}`}>
              //   <a>{teamNames[teamTricode]}</a>
              // </Link>
              teamNames[teamTricode]
            : 'Team'}{' '}
          {subType} {actionType}
        </ActionContent>
      );
    case 'stoppage':
    case 'substitution':
    default:
      return null;
  }
};

export default memo(GameAction, areEqual);
