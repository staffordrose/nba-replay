import { Global as EmotionGlobal, css } from '@emotion/react';

export const Global = () => {
  return (
    <EmotionGlobal
      styles={(theme) => css`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600;700&display=swap');

        body {
          font-family: 'Poppins', sans-serif;
          color: ${theme.colors.primary[900]};
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: ${theme.colors.primary[700]};
        }
        h1 {
          font-size: ${theme.fontSize['2xl']};
        }
        h2 {
          font-size: ${theme.fontSize.xl};
        }
        h3 {
          font-size: ${theme.fontSize.lg};
        }
        h4 {
          font-size: ${theme.fontSize.base};
        }
        h5 {
          font-size: ${theme.fontSize.sm};
        }
        h6 {
          font-size: ${theme.fontSize.xs};
        }

        @media (min-width: ${theme.breakpoints.sm}) {
          h1 {
            font-size: ${theme.fontSize['3xl']};
          }
          h2 {
            font-size: ${theme.fontSize['2xl']};
          }
          h3 {
            font-size: ${theme.fontSize.xl};
          }
        }
        @media (min-width: ${theme.breakpoints.lg}) {
          h1 {
            font-size: ${theme.fontSize['4xl']};
          }
          h2 {
            font-size: ${theme.fontSize['3xl']};
          }
          h3 {
            font-size: ${theme.fontSize['2xl']};
          }
        }
      `}
    />
  );
};
