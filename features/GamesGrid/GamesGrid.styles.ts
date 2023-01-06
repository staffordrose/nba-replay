import styled from '@emotion/styled';

export const StyledGamesGrid = styled.div`
  margin-bottom: ${({ theme }) => theme.margin[12]};

  & > h2 {
    position: relative;
    margin-bottom: ${({ theme }) => theme.margin[4]};
    text-align: center;
  }

  & > hr {
    height: ${({ theme }) => theme.height[1]};
    margin-bottom: ${({ theme }) => theme.margin[4]};
    border: none;
    background: ${({ theme }) => `linear-gradient(
      to right,
      transparent 0,
      ${theme.colors.primary[50]} 25%,
      ${theme.colors.primary[50]} 75%,
      transparent 100%
    )`};
  }

  & > div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: ${({ theme }) => theme.space[2]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    & > div {
      gap: ${({ theme }) => theme.space[3]};
    }
  }
`;
