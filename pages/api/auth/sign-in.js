import axios from 'axios';
import withSession from '@/lib/session';

export default withSession(async (req, res) => {
  console.log('Request: /api/auth/sign-in');

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/jcb/auth/login`;
    const { email, password } = req.body;

    const forwarded = req.headers['x-forwarded-for'];

    const ipRes = forwarded
      ? forwarded.split(/, /)[0]
      : req.connection.remoteAddress;

    console.log('ipRes', ipRes);

    const loginRes = await axios.post(
      url,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          Client_IP: ipRes || null,
        },
      }
    );

    if (loginRes?.data?.rtnCode === '1') {
      req.session.set('jwt', loginRes?.data?.result?.jwt);
      req.session.set('user', loginRes?.data?.result?.user);
      req.session.set('menus', loginRes?.data?.result?.menus);

      await req.session.save();
      return res.json({ isLoggedIn: true, ...loginRes?.data?.result?.user });
    }

    throw new Error(loginRes?.data?.message);
  } catch (error) {
    console.log('error', error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(fetchResponse?.data);
  }
});
