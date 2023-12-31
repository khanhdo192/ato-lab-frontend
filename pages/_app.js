import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { withAuth } from '@/lib/session';
import useUser from '@/lib/useUser';
import { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import ModalLockScreen from '@/components/lockScreen';
import Head from 'next/head';
import '../styles/index.css';

const progress = new ProgressBar({
  size: 2,
  className: 'bar-of-progress',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  const [isIdle, setIsIdle] = useState(false);

  const handleOnIdle = () => {
    if (
      Router.pathname !== '/login' &&
      Router.pathname !== '/password-reset' &&
      Router.pathname !== '/change-password/[token]'
    ) {
      setIsIdle(true);
      localStorage.setItem('isIdle', true);
    } else {
      setIsIdle(false);
      localStorage.setItem('isIdle', false);
    }
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 30,
    onIdle: handleOnIdle,
    debounce: 1000,
  });

  useEffect(() => {
    const localIdle = localStorage.getItem('isIdle')
      ? localStorage.getItem('isIdle')
      : false;
    if (localIdle === 'true') {
      setIsIdle(true);
    } else {
      setIsIdle(false);
    }
  }, [getRemainingTime]);

  const { user } = useUser({ initialData: pageProps?.user });

  return (
    <>
      <Head>
        <title>J/Secure | Admin Platform</title>
      </Head>
      <Component {...pageProps} user={user} />
      {isIdle && <ModalLockScreen isOpen={isIdle} setIsOpen={setIsIdle} />}
    </>
  );
}

const PAGES_WITHOUT_AUTH = [
  'LoginPage',
  'PasswordResetPage',
  'ChangePasswordPage',
];
MyApp.getInitialProps = async ({ router, Component, ctx }) => {
  if (ctx.req) {
    const { pageProps, redirect } = await withAuth(ctx => ctx)(ctx);

    if (redirect && !PAGES_WITHOUT_AUTH.includes(Component.name)) {
      if (ctx.pathname != '/500') {
        ctx.res.writeHead(302, { Location: redirect.destination });
        ctx.res.end();
      }
      return {
        pageProps: {},
      };
    }

    return {
      pageProps,
    };
  }

  return {
    pageProps: {},
  };
};

export default MyApp;
