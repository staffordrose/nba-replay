import styled from '@emotion/styled';

export type StyledFeedbackProps = {
  type?: 'error' | 'success' | 'warning' | 'info';
  px?: number;
  py?: number;
  p?: number;
};

export const StyledFeedback = styled.div<StyledFeedbackProps>`
  padding-left: ${({ theme, px, p }) =>
    px ? theme.padding[px] : p ? theme.padding[p] : theme.padding[2]};
  padding-right: ${({ theme, px, p }) =>
    px ? theme.padding[px] : p ? theme.padding[p] : theme.padding[2]};
  padding-top: ${({ theme, py, p }) =>
    py ? theme.padding[py] : p ? theme.padding[p] : theme.padding[2]};
  padding-bottom: ${({ theme, py, p }) =>
    py ? theme.padding[py] : p ? theme.padding[p] : theme.padding[2]};
  text-align: center;
  background-color: ${({ theme, type }) =>
    type === 'error'
      ? theme.colors.error[50]
      : type === 'success'
      ? theme.colors.success[50]
      : type === 'warning'
      ? theme.colors.warning[50]
      : theme.colors.info[50]};

  & > h1,
  h2,
  h3 {
    margin: 0;
    line-height: ${({ theme }) => theme.lineHeight.xl};
    color: ${({ theme, type }) =>
      type === 'error'
        ? theme.colors.error[700]
        : type === 'success'
        ? theme.colors.success[700]
        : type === 'warning'
        ? theme.colors.warning[700]
        : theme.colors.info[700]};
  }
  & > hr {
    width: ${({ theme }) => theme.width[10]};
    height: ${({ theme }) => theme.height[1]};
    border: none;
    background-color: ${({ theme, type }) =>
      type === 'error'
        ? theme.colors.error[900]
        : type === 'success'
        ? theme.colors.success[900]
        : type === 'warning'
        ? theme.colors.warning[900]
        : theme.colors.info[900]};
  }
  & > p {
    color: ${({ theme, type }) =>
      type === 'error'
        ? theme.colors.error[900]
        : type === 'success'
        ? theme.colors.success[900]
        : type === 'warning'
        ? theme.colors.warning[900]
        : theme.colors.info[900]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-left: ${({ theme, px, p }) =>
      px ? theme.padding[px] : p ? theme.padding[p] : theme.padding[3]};
    padding-right: ${({ theme, px, p }) =>
      px ? theme.padding[px] : p ? theme.padding[p] : theme.padding[3]};
    padding-top: ${({ theme, py, p }) =>
      py ? theme.padding[py] : p ? theme.padding[p] : theme.padding[3]};
    padding-bottom: ${({ theme, py, p }) =>
      py ? theme.padding[py] : p ? theme.padding[p] : theme.padding[3]};
  }
`;
