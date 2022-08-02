import type { FC } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import 'modern-normalize/modern-normalize.css';
import { seasons } from '../src/common/data';
import Global from '../src/common/Global';
import theme from '../src/common/theme';

import { ScheduleContextProvider } from '../src/context';
import { Footer, Header, PageError } from '../src/layout';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const { season, game, error } = pageProps;

  return (
    <ThemeProvider theme={theme}>
      <ScheduleContextProvider>
        <Global />
        <Header
          title={
            game?.awayTeam?.teamName
              ? `${game.awayTeam.teamName} @ ${game.homeTeam.teamName}`
              : season
              ? `${seasons[season]?.id} Schedule`
              : 'Seasons'
          }
        />
        {error?.title ? (
          <PageError title={error.title} message={error.message} />
        ) : (
          <Component {...pageProps} />
        )}
        <Footer />
      </ScheduleContextProvider>
    </ThemeProvider>
  );
};

export default MyApp;
