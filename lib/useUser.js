import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

import { fetcher } from '@/lib/fetcher';

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
  initialData = null,
} = {}) {
  const router = useRouter();
  const { data: user, mutate: mutateUser } = useSWR('/api/user', fetcher, {
    initialData,
    onError: error => {
      localStorage.removeItem('isIdle');
    },
  });

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      router.push(redirectTo);
    }

    if (!user?.isLoggedIn) {
      localStorage.setItem('isIdle', false);
    }
  }, [user, redirectIfFound, redirectTo, mutateUser]);

  return { user, mutateUser };
}
