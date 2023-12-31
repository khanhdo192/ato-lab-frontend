import axios from 'axios';
import withSession from '@/lib/session';

export default withSession(async (req, res) => {
  console.log('Request: /api/auth/password-change');

  const forwarded = req.headers['x-forwarded-for'];

  const ipRes = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/jcb/auth/password/change`;
    const { cwpToken, password, confirmPassword } = req.body;

    const changeRes = await axios.post(
      url,
      {
        cwpToken,
        password,
        confirmPassword,
      },
      {
        headers: {
          Client_IP: ipRes || null,
        },
      }
    );

    return res.status(200).json(changeRes.data);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(fetchResponse?.data);
  }
});
