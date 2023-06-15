import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Router from 'next/router';
import NProgress from 'nprogress';
import AppContextProvider from '../context/AppContext';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/nprogress.css';
import '../styles/globals.scss';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContextProvider>
        <Component {...pageProps} />
        <ToastContainer position='top-center' />
      </AppContextProvider>
    </SessionProvider>
  );
}
