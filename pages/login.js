import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import { postFetcher } from '@/lib/fetcher';
import useUser from '@/lib/useUser';
import Btn from '@/components/btn';
import Container from '@/components/container';
import ContainerCol_2 from '@/components/containerCol_2';
import FeedbackMsg from '@/components/feedbackMsg';
import LoginInput from '@/components/loginInput';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const newPassword = router?.query?.newPassword;
  const redirect = router?.query?.redirect;
  const { mutateUser } = useUser({
    redirectTo: `${!!redirect ? redirect : '/'}`,
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [email, setEmail] = useState('');
  const handleEmail = email => setEmail(email);

  const [password, setPassword] = useState('');
  const handlePassword = password => setPassword(password);

  const handleKeyDown = async e =>
    e.key.match('Enter') && (await handleSubmit(e));

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      const body = { email: email, password: password };
      if (submitted) return;

      setSubmitted(true);
      setErrorMsg('');

      const response = await postFetcher(body)(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/sign-in`
      );

      if (response?.isLoggedIn) {
        await mutateUser(response);
      }
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || '');
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <main className="flex w-full min-h-screen items-center justify-center px-2 flex-col">
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <Container xtra="w-full max-w-screen-xs lg:max-w-login h-mt mt-3 lg:mt-0">
          <ContainerCol_2>
            <Container
              hasBorder
              xtra="flex items-center justify-center mb-3 lg:mb-0"
            >
              <div className="">
                <Image
                  width="135"
                  height="79"
                  src="/images/jcb_logo_login.png"
                  alt="JCB"
                />
              </div>
            </Container>
            <Container xtra="bg-b-800 m-n">
              <div className="flex flex-col justify-between">
                <p className="text-sm text-white tracking-wider text-center p-6">
                  Please login to access your 3-D Secure Testing Services.
                </p>

                {errorMsg !== '' ? (
                  <FeedbackMsg type="error" text={errorMsg} />
                ) : null}
                <LoginInput
                  isRequired
                  type="text"
                  placeholder="Email"
                  ico="mail"
                  value={email}
                  onChange={handleEmail}
                />
                <LoginInput
                  isRequired
                  type="password"
                  placeholder="Password"
                  ico="pass"
                  value={password}
                  onChange={handlePassword}
                />
                <Btn
                  label="Sign in"
                  xtra="mt-4 cursor-pointer"
                  ico={submitted ? 'spinner' : null}
                  isDisable={submitted || !email || !password}
                />
                {newPassword && (
                  <FeedbackMsg
                    type="success"
                    text={
                      'Password is updated. Please login using your new password.'
                    }
                  />
                )}
              </div>
            </Container>
          </ContainerCol_2>
        </Container>
        <div className="h-mt mt-3 lg:mt-0">
          <Link href="/password-reset">
            <a className="cursor-pointer float-right hover:text-blue-700 text-blue-500 font-bold">
              Forgot your password?
            </a>
          </Link>
        </div>
      </form>
    </main>
  );
}
