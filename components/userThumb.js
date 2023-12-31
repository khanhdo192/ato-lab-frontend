import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { fetcher } from '@/lib/fetcher';
import useUser from '@/lib/useUser';
import UserMenuItem from '@/components/userMenuItem';
import { IcoUser, IcoLogout, IcoArwPull } from '@/components/icons';
import Spinner from '@/components/spinner';

export default function UserThumb({ img, alt, isOnline }) {
  const { mutateUser } = useUser({ redirectTo: '/login' });
  const router = useRouter();

  // Default States
  const icoClass =
    'group-hover:text-white transition duration-300 w-5 h-5 fill-current mr-3';
  const defaultLoading = { isLoading: false, event: '' };

  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const firstLetter = alt ? alt.charAt(0) : (alt = 'J');
  const tmpIndx = alt.lastIndexOf(' ');
  const secondLetter = tmpIndx != -1 ? alt.charAt(tmpIndx + 1) : '';
  const iLetter = firstLetter + secondLetter;

  const [loading, setLoading] = useState(defaultLoading);

  // States Handlers
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleBouncing = () => setIsBouncing(!isBouncing);
  const handleLoading = event =>
    setLoading({ isLoading: !loading.isLoading, event: event });

  const handleLogout = async () => {
    handleLoading('logout');
    await mutateUser(
      fetcher(`${process.env.NEXT_PUBLIC_HOST}/api/auth/sign-out`).catch(
        error => {
          if (error?.response?.data?.rtnCode === '9897') {
            router.reload();
          }
        }
      )
    );
  };

  const handleProfile = async () => {
    handleLoading('profile');
    if (window.location.pathname != '/dashboard/profile') {
      router.push('/dashboard/profile');
    } else {
      router.reload(window.location.pathname);
    }
  };

  return (
    <div className="relative mr-6 lg:mr-3">
      <a
        className="cursor-pointer"
        onClick={toggleMenu}
        onMouseEnter={toggleBouncing}
        onMouseLeave={toggleBouncing}
      >
        <div className="flex items-center justify-center bg-b-800 top-0 w-12 h-12 rounded-full overflow-hidden">
          <p className="font-light text-center text-white text-2xl tracking-wider mt-px">
            {iLetter?.toUpperCase()}
          </p>
        </div>
        <div
          className={
            (!isOnline ? 'hidden' : '') +
            ' w-3 h-3 absolute -bottom-0.5 -right-0.5 bg-g-300 rounded-full '
          }
        ></div>
        <div
          className={
            (isBouncing ? 'animate-bounce' : '') +
            ' w-5 h-5 absolute flex items-center justify-center top-3.5 -right-3.5 bg-white rounded-full shadow'
          }
        >
          <IcoArwPull className="w-2.5 h-2.5 text-gr-400 fill-current" />
        </div>
      </a>
      <div
        className={
          (isMenuOpen ? 'block' : 'hidden') +
          ' absolute w-40 right-0 top-16 bg-b-800 text-sm font-medium leading-0 text-b-300 tracking-wide rounded-xl p-4 anim-fade border-blue-400 border-2'
        }
      >
        <div className="absolute -top-1 right-4 w-5 h-5 transform rotate-45 bg-b-800"></div>

        <UserMenuItem label="Profile" onClick={() => handleProfile()}>
          {loading.isLoading && loading.event.match('profile') ? (
            <Spinner isLoading size={5} xtra="mr-2" />
          ) : (
            <IcoUser className={icoClass} />
          )}
        </UserMenuItem>

        <hr className="border-bottom border-b-300 my-2" />

        <UserMenuItem label="Logout" onClick={() => handleLogout()}>
          {loading.isLoading && loading.event.match('logout') ? (
            <Spinner isLoading size={5} xtra="mr-2" />
          ) : (
            <IcoLogout className={icoClass} />
          )}
        </UserMenuItem>
      </div>
    </div>
  );
}
