import axios from 'axios';
import withSession, { jwtRefresh } from '@/lib/session';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSession(async (req, res) => {
  const user = req.session.get('user');
  let jwt = req.session.get('jwt');

  const forwarded = req.headers['x-forwarded-for'];

  const ipRes = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;

  const {
    query: { path },
  } = req;
  const url = process.env.NEXT_PUBLIC_API_URL + '/' + path.join('/');
  if (!user) {
    return res.status(401).json({ isLoggedIn: false });
  }
  try {
    const apiRes = await axios.post(url, req, {
      headers: {
        Authorization: jwt?.accessToken,
        'content-type': req.headers['content-type'],
        Client_IP: ipRes || null,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
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

        const apiRes = await axios.post(url, req, {
          headers: {
            Authorization: jwt?.accessToken,
            'content-type': req.headers['content-type'],
            Client_IP: ipRes || null,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        });
        return res.status(200).json(apiRes.data);
      }
    }

    res.status(fetchResponse?.status || 500).json(fetchResponse?.data);
  }
});
