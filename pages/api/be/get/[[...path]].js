import axios from 'axios';
import withSession, { jwtRefresh } from '@/lib/session';

export default withSession(async (req, res) => {
  const user = req.session.get('user');
  let jwt = req.session.get('jwt');

  const forwarded = req.headers['x-forwarded-for'];

  const ipRes = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;

  const {
    query: { path, ...params },
  } = req;

  let url = process.env.NEXT_PUBLIC_API_URL + '/' + path.join('/');

  if (!!params) {
    const keys = Object.keys(params);
    const values = Object.values(params);
    url += '?';
    for (let i = 0; i < keys.length; i++) {
      url += keys[i] + '=' + values[i];
      if (!(i == keys.length - 1)) {
        url += '&';
      }
    }
  }
  if (!user) {
    return res.status(401).json({ isLoggedIn: false });
  }

  try {
    const apiRes = await axios.get(url, {
      headers: {
        Authorization: jwt?.accessToken || null,
        Client_IP: ipRes || null,
      },
    });

    return res.status(200).json(apiRes.data);
  } catch (e) {
    console.log('API ERROR', e);
    const { response: fetchResponse } = e;

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

        const apiRes = await axios.get(url, {
          headers: {
            Authorization: jwt?.accessToken || null,
            Client_IP: ipRes || null,
          },
        });

        return res.status(200).json(apiRes.data);
      }
    }

    res.status(fetchResponse?.status || 500).json(fetchResponse?.data);
  }
});
