import withSession from '@/lib/session';
import { jwtRefresh } from '@/lib/session';
import axios from 'axios';

export default withSession(async (req, res) => {
  console.log('Request: /api/auth/sign-out');
  let jwt = req.session.get('jwt');

  const forwarded = req.headers['x-forwarded-for'];

  const ipRes = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/jcb/auth/logout`;
  try {
    if (jwt) {
      const newJwt = await jwtRefresh(jwt);
      if (newJwt) {
        session.set('jwt', newJwt);
        jwt = newJwt;
      }
    }

    const apiRes = await axios.get(url, {
      headers: {
        Authorization: jwt?.accessToken || null,
        Client_IP: ipRes || null,
      },
    });

    req.session.destroy();
    res.json({ isLoggedIn: false });
  } catch (error) {
    console.log('error', error);
    const { response: fetchResponse } = error;

    if (fetchResponse?.status === 401) {
      if (fetchResponse?.data?.rtnCode === '9897') {
        req.session.destroy();
      }
    }

    res.status(fetchResponse?.status || 500).json(fetchResponse?.data);
  }
});
