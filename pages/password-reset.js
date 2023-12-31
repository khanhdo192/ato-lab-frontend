import Btn from '@/components/btn';
import Container from '@/components/container';
import ContainerCol_2 from '@/components/containerCol_2';
import FeedbackMsg from '@/components/feedbackMsg';
import LoginInput from '@/components/loginInput';
import Spinner from '@/components/spinner';
import { postFetcher } from '@/lib/fetcher';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import Link from 'next/link';

const validEmailExpresion = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default function PasswordResetPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState({
    isFeedback: false,
    message: '',
    type: '',
  });

  const handleEmail = useCallback(value => {
    setEmail(value);
  }, []);

  const handlePasswordReset = async () => {
    if (!email) {
      return setErrorMsg({
        isFeedback: true,
        message: 'Please enter your email!',
        type: 'error',
      });
    }
    const emailValid = validEmailExpresion.test(email);

    if (emailValid) {
      setStatus('busy');
      try {
        const body = {
          email,
        };

        const res = await postFetcher(body)(
          `${process.env.NEXT_PUBLIC_HOST}/api/auth/reset`
        );

        if (res.rtnCode === '1') {
          setStatus('success');
          setErrorMsg({
            isFeedback: true,
            message:
              'Your password reset was accepted, please check your email address for the password reset link.',
            type: 'success',
          });
          setTimeout(() => {
            router.push('/login');
          }, 5000);
        } else {
          setErrorMsg({
            isFeedback: true,
            message: res?.message,
            type: 'error',
          });
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.rtnCode === '9897') {
          router.push('/login');
        }
        setErrorMsg({
          isFeedback: true,
          message: error?.message,
          type: 'error',
        });
        setStatus('error');
      }
    } else {
      setStatus('error');
      setErrorMsg({
        isFeedback: true,
        message: 'Email invalid',
        type: 'error',
      });
    }
  };

  return (
    <main className="flex w-full min-h-screen items-center justify-center px-2 flex-col">
      <form>
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
            {status === 'busy' ? (
              <div className="flex flex-grow items-center justify-center h-full w-full">
                <Spinner isLoading />
              </div>
            ) : (
              <Container xtra="bg-b-800 m-n">
                <div className="flex flex-col justify-between">
                  <p className="text-sm text-white tracking-wider text-center p-6">
                    Reset password
                  </p>

                  {errorMsg.isFeedback ? (
                    <FeedbackMsg type={errorMsg.type} text={errorMsg.message} />
                  ) : null}
                  <LoginInput
                    id="email"
                    type="text"
                    placeholder="Enter email"
                    ico="mail"
                    value={email}
                    onChange={handleEmail}
                  />
                  <Btn
                    label="Send Password Reset Link"
                    xtra="mt-4"
                    onClick={() => handlePasswordReset()}
                  />
                </div>
              </Container>
            )}
          </ContainerCol_2>
        </Container>
        <div className="h-mt mt-3 lg:mt-0">
          <Link href="/login">
            <a className="cursor-pointer float-right hover:text-blue-700 text-blue-500 font-bold">
              Back to login
            </a>
          </Link>
        </div>
      </form>
    </main>
  );
}
