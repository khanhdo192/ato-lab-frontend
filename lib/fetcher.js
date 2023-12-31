import axios from 'axios';

const ROUTES_WITHOUT_API_BE = [
  `${process.env.NEXT_PUBLIC_HOST}/api/auth/sign-in`,
  `${process.env.NEXT_PUBLIC_HOST}/api/auth/sign-out`,
  `${process.env.NEXT_PUBLIC_HOST}/api/user`,
  `${process.env.NEXT_PUBLIC_HOST}/api/user/update`,
  `${process.env.NEXT_PUBLIC_HOST}/api/auth/reset`,
  `${process.env.NEXT_PUBLIC_HOST}/api/auth/password-change`,
  '/api/auth/sign-in',
  '/api/auth/sign-out',
  '/api/user',
  '/api/user/update',
  '/api/auth/reset',
  '/api/auth/password-change',
];

const postUrlBuilder = url =>
  ROUTES_WITHOUT_API_BE.includes(url) ? url : '/api/be/post' + url;
const getUrlBuilder = url =>
  ROUTES_WITHOUT_API_BE.includes(url) ? url : '/api/be/get' + url;
const postMultipartUrlBuilder = url =>
  ROUTES_WITHOUT_API_BE.includes(url) ? url : '/api/be/post-multipart' + url;
export const getFetcher = url =>
  axios.get(getUrlBuilder(url)).then(res => res.data);
export const fetcher = getFetcher;

export const postMultipartFetcher = body => url =>
  axios.post(postMultipartUrlBuilder(url), body).then(res => res.data);
export const postFetcher =
  (body, config = null) =>
  url =>
    axios.post(postUrlBuilder(url), { ...body, config }).then(res => res.data);
export const postFetcherWithoutConfig = body => url =>
  axios.post(postUrlBuilder(url), body).then(res => res.data);

// axios.interceptors.response.use(
//   res => res,
//   function (error) {
//     console.log('error :>> ', error.response.status);
//     if (error.response.status === 401) {
//       localStorage.setItem('isIdle', false);
//       window.location.replace('/login');
//     } else if (error.response.status === 500) {
//       localStorage.setItem('isIdle', false);
//       // window.location.reload();
//     } else {
//       throw error;
//     }
//   }
// );
