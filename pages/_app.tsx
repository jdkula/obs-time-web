import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
