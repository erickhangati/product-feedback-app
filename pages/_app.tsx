import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import AppContextProvider from '../context/AppContext';

import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
  );
}
