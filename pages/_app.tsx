import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@fontsource/fira-sans/latin-400.css';
import '@fontsource/fira-sans/latin-400-italic.css';
import '@fontsource/fira-sans/latin-700.css';
import '@fontsource/fira-sans/latin-700-italic.css';

import '@fontsource/lato/latin-400.css';
import '@fontsource/lato/latin-400-italic.css';
import '@fontsource/lato/latin-700.css';
import '@fontsource/lato/latin-700-italic.css';

import '@fontsource/montserrat/latin-400.css';
import '@fontsource/montserrat/latin-400-italic.css';
import '@fontsource/montserrat/latin-700.css';
import '@fontsource/montserrat/latin-700-italic.css';

import '@fontsource/kalam/latin-400.css';
import '@fontsource/kalam/latin-700.css';

import '@fontsource/kalam/latin-400.css';
import '@fontsource/kalam/latin-700.css';

import '@fontsource/bungee/latin-400.css';
import '@fontsource/fredoka-one/latin-400.css';
import '@fontsource/fugaz-one/latin-400.css';
import '@fontsource/monoton/latin-400.css';
import '@fontsource/rubik-dirt/latin-400.css';
import '@fontsource/smokum/latin-400.css';
import '@fontsource/leckerli-one/latin-400.css';
import '@fontsource/sriracha/latin-400.css';

import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import createEmotionCache from '../lib/createEmotionCache';
import theme from '../lib/theme';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache,
}: AppProps & { emotionCache: ReturnType<typeof createEmotionCache> }) {
  emotionCache = emotionCache ?? clientSideEmotionCache;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
