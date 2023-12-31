import withSession from '@/lib/session';
import { jwtRefresh } from '@/lib/session';
import axios from 'axios';

export default withSession(async (req, res) => {
  console.log('Request: /api/user/update');

  const forwarded = req.headers['x-forwarded-for'];

  const ipRes = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;

  let jwt = req.session.get('jwt');
  delete req.body.config;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/jcb/users/update`;
  try {
    const updateUserRes = await axios.post(url, req.body, {
      headers: {
        Authorization: jwt?.accessToken || null,
        Client_IP: ipRes || null,
      },
    });

    const user = { ...updateUserRes?.data?.result?.companyUsers };
    req.session.set('user', user);
    res.json({ isLoggedIn: true, ...user });
  } catch (error) {
    console.log('error', error);
    const { response: fetchResponse } = error;

    if (fetchResponse?.status === 401) {
      if (fetchResponse?.data?.rtnCode === '9897') {
        req.session.destroy();
      } else {
        if (jwt) {
          const newJwt = await jwtRefresh(jwt);
          if (newJwt) {
            session.set('jwt', newJwt);
            jwt = newJwt;
          }
        }

        const updateUserRes = await axios.post(url, req.body, {
          headers: {
            Authorization: jwt?.accessToken || null,
            Client_IP: ipRes || null,
          },
        });

        const user = { ...updateUserRes?.data?.result?.companyUsers };
        req.session.set('user', user);
        res.json({ isLoggedIn: true, ...user });
      }
    }

    res.status(fetchResponse?.status || 500).json(fetchResponse?.data);
  }
});
