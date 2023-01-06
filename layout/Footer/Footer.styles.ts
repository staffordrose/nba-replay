import styled from '@emotion/styled';

export const StyledFooter = styled.footer`
  display: flex;
  align-items: flex-end;
  width: ${({ theme }) => theme.width.full};
  height: ${({ theme }) => theme.height[40]};
  background: ${({ theme }) => `radial-gradient(
      ellipse at bottom,
      ${theme.colors.primary[50]} 25%,
      transparent 70%
    )`};

  & > div {
    display: flex;
    gap: ${({ theme }) => theme.space[6]};
    justify-content: center;
    align-items: center;
    width: ${({ theme }) => theme.width.full};
    max-width: ${({ theme }) => theme.maxWidth['7xl']};
    height: ${({ theme }) => theme.height.auto};
    margin: ${({ theme }) => theme.margin.center};
    padding: ${({ theme }) => `${theme.padding[3]} ${theme.padding[2]}`};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    text-align: center;
    background: ${({ theme }) => `radial-gradient(
      ellipse at top,
      ${theme.colors.whiteAlpha[600]} 25%,
      transparent 70%
    )`};

    & > a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.primary[700]};
      transition: color 0.2s ease-in-out;

      &:hover {
        color: ${({ theme }) => theme.colors.primary[500]};
      }
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    & > div {
      padding: ${({ theme }) => theme.padding[3]};
    }
  }
`;
