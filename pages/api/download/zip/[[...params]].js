import withSession, { jwtRefresh } from '@/lib/session';
import axios from 'axios';
import fs from 'fs';

export default withSession(async (req, res) => {
  const user = req.session.get('user');
  let jwt = req.session.get('jwt');

  const forwarded = req.headers['x-forwarded-for'];

  const ipRes = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;

  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!user) {
    return res.status(401).json({ isLoggedIn: false });
  }
  const params = req.query.params;
  const id = params.shift();
  const fileName = params.join('_').replace(/(\r\n\s|\n|\r|\s)/gm, '');
  try {
    const response = await axios({
      method: 'get',
      url: `${url}/jcb/productProcess/downloadTestReport/2/${id}`,
      responseType: 'stream',
      headers: {
        Authorization: jwt?.accessToken || null,
        Client_IP: ipRes || null,
      },
    });
    const stream = response.data.pipe(fs.createWriteStream('/tmp/' + fileName));
    stream.on('finish', () => {
      const zipBuffer = fs.readFileSync('/tmp/' + fileName);
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader(
        'content-disposition',
        'attachment; filename=' + fileName + '.zip'
      );
      res.status(200).send(zipBuffer);
      fs.unlinkSync('/tmp/' + fileName);
    });
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

        const response = await axios({
          method: 'get',
          url: `${url}/jcb/productProcess/downloadTestReport/2/${id}`,
          responseType: 'stream',
          headers: {
            Authorization: jwt?.accessToken || null,
            Client_IP: ipRes || null,
          },
        });
        const stream = response.data.pipe(
          fs.createWriteStream('/tmp/' + fileName)
        );
        stream.on('finish', () => {
          const zipBuffer = fs.readFileSync('/tmp/' + fileName);
          res.setHeader('Content-Type', 'application/zip');
          res.setHeader(
            'content-disposition',
            'attachment; filename=' + fileName + '.zip'
          );
          res.status(200).send(zipBuffer);
          fs.unlinkSync('/tmp/' + fileName);
        });
      }
    }

    res.status(fetchResponse?.status || 500).json(fetchResponse?.data);
  }
});
