import Btn from '@/components/btn';
import LoginInputV2 from '@/components/loginInputV2';
import ModalMain from '@/components/modalMain';
import ModalPopup from '@/components/modalPopup';
import { fetcher, postFetcher } from '@/lib/fetcher';
import useUser from '@/lib/useUser';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export default function ModalLockScreen({ isOpen, setIsOpen }) {
  const { mutateUser } = useUser({ redirectTo: '/login' });
  const router = useRouter();
  const initalCount = 300;
  const [counter, setCounter] = useState(initalCount);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState('');

  useEffect(() => {
    if (counter > 0) {
      const timeout = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [counter]);

  useEffect(() => {
    if (counter === 0) {
      setPassError('');
      mutateUser(fetcher(`${process.env.NEXT_PUBLIC_HOST}/api/auth/sign-out`))
        .then(() => {
          localStorage.setItem('isIdle', false);
          setIsOpen(false);
        })
        .catch(error => {
          if (error?.response?.data?.rtnCode === '9897') {
            router.reload();
          }
        });
    }
  }, [counter]);

  const handleChangePass = useCallback(value => {
    setPassword(value);
    setPassError('');
    setCounter(initalCount);
  }, []);

  const handleCheckPass = async () => {
    try {
      setCounter(initalCount);
      if (!password.trim()) {
        setPassError('Please enter password');
        return;
      }
      setLoading(true);

      const userRes = await fetcher(`${process.env.NEXT_PUBLIC_HOST}/api/user`);

      if (userRes && userRes?.isLoggedIn) {
        const body = { email: userRes?.email || '', password };
        const response = await postFetcher(body)(
          `${process.env.NEXT_PUBLIC_HOST}/api/auth/sign-in`
        );

        if (response && response?.isLoggedIn) {
          localStorage.setItem('isIdle', false);
          setIsOpen(false);
          setLoading(false);
          setPassword('');
        }
      } else {
        setPassError('Something wrong! Please login again');
        mutateUser(fetcher(`${process.env.NEXT_PUBLIC_HOST}/api/auth/sign-out`))
          .then(() => {
            localStorage.setItem('isIdle', false);
            setIsOpen(false);
          })
          .catch(error => {
            if (error?.response?.data?.rtnCode === '9897') {
              router.reload();
            }
          });
      }
    } catch (error) {
      setPassword('');
      setPassError('Password not correct');
      setLoading(false);
    }
  };

  return (
    <ModalMain isOpen={isOpen} className="bg-gr-700">
      <ModalPopup
        title="Warning!"
        text={
          counter === 0
            ? `Your session has closed. Please login again`
            : `Inactivity has been detected in the system. Please enter your password`
        }
        color="text-red-600"
        fontSize="text-2xl"
      >
        {counter > 0 && (
          <>
            <input
              type="text"
              defaultValue=""
              autoComplete="username"
              className="opacity-0 cursor-default h-0"
            />
            <LoginInputV2
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChangePass}
              xtra="w-full"
              autoComplete="new-password"
            />
          </>
        )}
        {passError && counter > 0 && (
          <p className="text-red-500 text-xs pl-1 -mt-2 self-start">
            {passError}
          </p>
        )}
        {counter > 0 && (
          <Btn
            label="Submit Password"
            xtra="mt-4 w-full"
            onClick={handleCheckPass}
            ico={loading ? 'spinner' : ''}
          />
        )}
      </ModalPopup>
    </ModalMain>
  );
}
