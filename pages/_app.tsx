import type { FC } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import 'modern-normalize/modern-normalize.css';
import { seasons } from '@/common/data';
import { Global, theme } from '@/common/styles';
import { ScheduleContextProvider } from '@/context';
import { Footer, Header, PageError } from '@/layout';

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
