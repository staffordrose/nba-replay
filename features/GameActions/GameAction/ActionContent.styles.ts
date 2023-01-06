import styled from '@emotion/styled';
import { teamColors } from '@/common/data';
import { GameAction, TeamTricode } from '@/common/types';

export type StyledActionContentProps = {
  shotResult: GameAction['shotResult'];
  teamTricode?: TeamTricode;
};

export const StyledActionContent = styled.div<StyledActionContentProps>`
  position: relative;
  overflow: hidden;
  display: inline-grid;
  grid-template-columns: ${({ theme }) =>
    `${theme.width[12]} ${theme.width[7]} 1fr auto`};
  gap: ${({ theme }) => theme.space[2]};
  align-items: center;
  width: ${({ theme }) => theme.width.full};
  min-height: ${({ theme }) => theme.height[9]};
  padding: ${({ theme }) => `${theme.padding[1]} ${theme.padding[3]}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme, shotResult }) =>
    shotResult === 'Made' ? theme.fontWeight.medium : theme.fontWeight.light};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ theme }) => theme.width[1.5]};
    height: ${({ theme }) => theme.height.full};
    background-color: ${({ theme, teamTricode }) =>
      teamTricode ? teamColors[teamTricode][0] : theme.colors.gray[100]};
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: ${({ theme }) => theme.width.full};
    height: ${({ theme }) => theme.height.full};
    background: ${({ theme, teamTricode }) => `
      linear-gradient(
        to right,
        ${
          teamTricode ? teamColors[teamTricode][0] : theme.colors.gray[400]
        } 85%,
        ${theme.colors.transparent} 100%
      )
    `};
    opacity: 0.05;
  }

  & > span:first-of-type {
    padding-left: ${({ theme }) => theme.padding[1]};
    text-align: center;
  }
  & > span:nth-of-type(2) {
    line-height: ${({ theme }) => theme.lineHeight['2xl']};

    & > a {
      color: ${({ theme, teamTricode }) =>
        teamTricode ? teamColors[teamTricode][0] : theme.colors.primary[600]};
      text-decoration: none;
    }
    & > a:hover {
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-decoration-skip-ink: auto;
    }
  }
  & > span:last-of-type {
    padding-left: ${({ theme }) => theme.padding[2]};
  }
`;
