import Image from 'next/image';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getFetcher, postFetcher } from '@/lib/fetcher';
import Btn from '@/components/btn';
import Container from '@/components/container';
import ContainerCol_2 from '@/components/containerCol_2';
import FeedbackMsg from '@/components/feedbackMsg';

export default function TestPage({ user }) {
  const { data, error } = useSWR(
    '/tester/auth/login',
    postFetcher({ email: user?.email, password: user?.fullName })
  );

  const [feedback, setFeedback] = useState({
    type: 'info',
    message: 'Loading',
  });
  const [dataFetched, setDataFetched] = useState(null);

  useEffect(() => {
    if (data) {
      setDataFetched(data?.result?.user);
      setFeedback({ type: 'success', message: 'Check the data!' });
    }

    if (error) {
      setFeedback({ type: 'error', message: error.message });
    }
  }, [data, error]);

  const handleClick = async () => {
    try {
      const loginReq = await postFetcher({
        email: 'admin@jcb.com',
        password: 'admin',
      })('/jcb/auth/login');

      setDataFetched(loginReq?.result?.user);
      setFeedback({ type: 'success', message: loginReq?.message });

      const logoutReq = await getFetcher('/jcb/auth/logout');

      setDataFetched({});
      setFeedback({ type: 'success', message: logoutReq?.message });
    } catch (error) {
      setFeedback({ type: 'error', message: error?.message });
    }
  };

  return (
    <main className="flex w-full min-h-screen sm:items-center justify-center px-2">
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
              <p className="text-sm tracking-wider text-center p-6 text-p-400 bg-p-100">
                Please test data fetching of 3-D Secure Testing Services.
              </p>
              {feedback && (
                <FeedbackMsg type={feedback.type} text={feedback.message} />
              )}
              <pre className="w-full overflow-scroll bg-gray-400">
                {JSON.stringify(dataFetched, null, 2)}
              </pre>
              <Btn
                label="Fetch Data"
                xtra="mt-4"
                onClick={() => handleClick()}
              />
            </div>
          </Container>
        </ContainerCol_2>
      </Container>
    </main>
  );
}
