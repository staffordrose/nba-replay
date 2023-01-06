import styled from '@emotion/styled';
import { teamColors } from '@/common/data';
import { rgbToHsl } from '@/common/utils';

interface StyledGameBannerProps {
  awayTeamTricode: string;
  homeTeamTricode: string;
}

export const StyledGameBanner = styled.div<StyledGameBannerProps>`
  position: relative;
  overflow: hidden;
  width: ${({ theme }) => theme.width.full};
  height: ${({ theme }) => theme.height[28]};
  margin: ${({ theme }) => theme.margin.center};
  padding: ${({ theme }) => theme.borderWidth[3]} 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.whiteAlpha[200]},
    ${({ theme }) => theme.colors.whiteAlpha[500]}
  );

  &::after {
    content: '';
    position: absolute;
    z-index: -2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      120deg,
      ${({ theme, awayTeamTricode }) =>
          teamColors[awayTeamTricode]
            ? rgbToHsl(teamColors[awayTeamTricode][0])
            : theme.colors.white}
        0% 47.5%,
      ${({ theme, homeTeamTricode }) =>
          teamColors[homeTeamTricode]
            ? rgbToHsl(teamColors[homeTeamTricode][0])
            : theme.colors.black}
        52.5% 100%
    );
  }

  & > div {
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: ${({ theme }) => theme.width.full};
    height: ${({ theme }) => theme.height.full};
    background: linear-gradient(
      120deg,
      ${({ theme, awayTeamTricode }) =>
          teamColors[awayTeamTricode]
            ? rgbToHsl(teamColors[awayTeamTricode][0])
            : theme.colors.white}
        0% 50%,
      ${({ theme, homeTeamTricode }) =>
          teamColors[homeTeamTricode]
            ? rgbToHsl(teamColors[homeTeamTricode][0])
            : theme.colors.black}
        50% 100%
    );
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: ${({ theme }) => theme.maxWidth.sm};
    height: ${({ theme }) => theme.height[28]};
    padding: ${({ theme }) => theme.borderWidth[3]};
    border-radius: ${({ theme }) => theme.borderRadius['3xl']};

    & > div {
      grid-template-columns: 1.25fr 1fr 1.25fr;
      border-radius: ${({ theme }) => theme.borderRadius['2xl']};
    }
  }
`;

export const GameColumn = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: ${({ theme }) => theme.width.full};
  height: ${({ theme }) => theme.height.full};
  padding: ${({ theme }) => theme.padding[1]};
  text-align: center;
  color: ${({ theme }) => theme.colors.white};

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    width: ${({ theme }) => theme.width.full};
    height: ${({ theme }) => theme.height.full};
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.whiteAlpha[600]} 0%,
      ${({ theme }) => theme.colors.whiteAlpha[50]} 50%,
      ${({ theme }) => theme.colors.blackAlpha[50]} 50%,
      ${({ theme }) => theme.colors.blackAlpha[600]} 100%
    );
  }

  & > span {
    padding: ${({ theme }) => `${theme.padding[1]} ${theme.padding[2]}`};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    white-space: nowrap;
    background-color: ${({ theme }) => theme.colors.blackAlpha[300]};
  }

  & > span:first-of-type {
    margin: ${({ theme }) => theme.margin[2]} 0;
    font-size: ${({ theme }) => theme.fontSize.lg};
  }

  & > span:last-of-type {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
  }
`;

export const TeamColumn = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => theme.width.full};
  height: ${({ theme }) => theme.height.full};
  margin: 0;
  padding: ${({ theme }) => `0 ${theme.padding[1]}`};
  color: ${({ theme }) => theme.colors.white};

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    width: ${({ theme }) => theme.width.full};
    height: ${({ theme }) => theme.height.full};
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.whiteAlpha[600]} 0%,
      ${({ theme }) => theme.colors.whiteAlpha[50]} 50%,
      ${({ theme }) => theme.colors.blackAlpha[50]} 50%,
      ${({ theme }) => theme.colors.blackAlpha[600]} 100%
    );
  }

  & > span:first-of-type {
    width: ${({ theme }) => theme.width[16]};
    height: ${({ theme }) => theme.height[16]};
  }

  & > span:last-of-type {
    position: relative;
    top: -${({ theme }) => theme.space[1]};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;
