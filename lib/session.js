import axios from 'axios';
import { withIronSession } from 'next-iron-session';

export default function withSession(handler) {
  return withIronSession(handler, {
    password: '4c5qCRUUo2LZ7GMRgHyEwUQQ74gjpaDK',
    cookieName: 'https://www.atomworks.io/',
    cookieOptions: {
      secure: false, // process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
    },
  });
}

export function withAuth(handler) {
  function _withAuth(handler) {
    return async context => {
      const { req } = context;
      try {
        const user = req.session.get('user');
        const menus = req.session.get('menus');
        let jwt = req.session.get('jwt');

        if (!user) {
          throw 'No user';
        }

        if (jwt) {
          const newJwt = await jwtRefresh(jwt);
          if (newJwt) {
            session.set('jwt', newJwt);
            jwt = newJwt;
          }
        }

        const newCtx = {
          ...context,
          pageProps: {
            user,
            jwt,
            menus,
          },
        };

        return handler(newCtx);
      } catch (e) {
        console.log('no user or token refresh failed, login again');
        req.session.destroy();
        const redirectUrl = context?.asPath;
        if (!!redirectUrl && redirectUrl != '/login') {
          return {
            redirect: {
              destination: `/login?redirect=${redirectUrl}`,
              permanent: false,
            },
          };
        }
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }
    };
  }

  return withSession(_withAuth(handler));
}

export async function jwtRefresh(sessionJwt) {
  const { refreshTime, accessToken, refreshToken } = sessionJwt;

  const dateRefreshTime = new Date(refreshTime);
  const dateNow = new Date();

  if (dateRefreshTime.valueOf() >= dateNow.valueOf()) {
    return null;
  }

  const { message, result } = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + '/jcb/auth/newToken',
    { refreshToken: refreshToken }
  );

  const { jwt } = result;

  return jwt;
}
