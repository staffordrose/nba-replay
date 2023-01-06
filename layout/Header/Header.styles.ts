import styled from '@emotion/styled';

export type StyledHeaderProps = {
  showTitle: boolean;
};

export const StyledHeader = styled.header<StyledHeaderProps>`
  overflow: hidden;
  position: sticky;
  z-index: 1200;
  top: 0;
  left: 0;
  height: ${({ theme }) => theme.height[14]};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) =>
    `0 8px 12px -2px ${theme.colors.whiteAlpha[600]}, 0 4px 8px -4px ${theme.colors.whiteAlpha[600]}`};

  & > div {
    display: flex;
    gap: ${({ theme }) => theme.space[2]};
    align-items: center;
    width: ${({ theme }) => theme.width.full};
    max-width: ${({ theme }) => theme.maxWidth['7xl']};
    height: ${({ theme }) => theme.height.full};
    margin: ${({ theme }) => theme.margin.center};
    padding: 0 ${({ theme }) => theme.padding[2]};
    background: ${({ theme }) => `linear-gradient(
      to right,
      transparent 0,
      ${theme.colors.primary[50]} 25%,
      ${theme.colors.primary[50]} 75%,
      transparent 100%
    )`};

    & > span {
      overflow: hidden;
      position: relative;
      font-size: ${({ theme }) => theme.fontSize.lg};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      text-overflow: ellipsis;
      white-space: nowrap;
      transform: ${({ theme, showTitle }) =>
        `translateY(${showTitle ? 0 : theme.space[10]})`};
      color: ${({ theme }) => theme.colors.primary[700]};
      opacity: ${({ showTitle }) => (showTitle ? 1 : 0)};
      transition-property: transform opacity;
      transition-duration: 300ms;
      transition-timing-function: ease-in-out;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    & > div {
      gap: ${({ theme }) => theme.space[3]};
      padding: 0 ${({ theme }) => theme.padding[3]};
    }
  }
`;
