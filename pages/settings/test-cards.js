import Breadcrumb from '@/components/breadcrumb';
import BreadcrumbItem from '@/components/breadcrumbItem';
import BtnUp from '@/components/btnUp';
import Container from '@/components/container';
import Divider from '@/components/divider';
import FeedbackMsg from '@/components/feedbackMsg';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Nav from '@/components/nav';
import Spinner from '@/components/spinner';
import TestCardsTable from '@/components/testCardsTable/testCardsTable';
import TextH1 from '@/components/textH1';
import TextH2 from '@/components/textH2';
import UserThumb from '@/components/userThumb';
import { fetcher } from '@/lib/fetcher';
import useUser from '@/lib/useUser';
import 'jspdf-autotable';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

export default function testCards() {
  const { user } = useUser({ redirectTo: '/login' });
  const router = useRouter();
  const [testCards3DS, setTestCards3DS] = useState([]);
  const [testCardsACS, setTestCardsACS] = useState([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { data: dataTestCards3DS, error: errorTestCards3DS } = useSWR(
    '/tester/products/tc/getJcbTestCard?productType=3DSS',
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  const { data: dataTestCardsACS, error: errorTestCardsACS } = useSWR(
    '/tester/products/tc/getJcbTestCard?productType=ACS',
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  useMemo(() => {
    if (dataTestCards3DS?.result) {
      const testCards = dataTestCards3DS?.result?.data;
      setTestCards3DS(testCards);
    }
    if (errorTestCards3DS) {
      setTestCards3DS([]);
      setErrorMsg(errorTestCards3DS);
      if (errorTestCards3DS?.response?.data?.rtnCode === '9897') {
        router.reload();
      }
      localStorage.setItem('isIdle', false);
    }
  }, [dataTestCards3DS, errorTestCards3DS]);

  useMemo(() => {
    if (dataTestCardsACS?.result) {
      const testCards = dataTestCardsACS?.result?.data;
      setTestCardsACS(testCards);
    }
    if (errorTestCardsACS) {
      setTestCardsACS([]);
      setErrorMsg(errorTestCardsACS);
      if (errorTestCardsACS?.response?.data?.rtnCode === '9897') {
        router.reload();
      }
      localStorage.setItem('isIdle', false);
    }
  }, [dataTestCardsACS, errorTestCardsACS]);

  return (
    <main className="relative flex w-full min-h-screen 2xl:min-h-main m-auto max-w-1688 2xl:my-8 2xl:pl-8">
      <Nav
        status={isSideBarOpen}
        setStatus={setIsSideBarOpen}
        activeSection={'settings/test-cards'}
      />
      <div className="relative z-0 w-full p-2 lg:pt-2 lg:ml-menu-lg 2xl:ml-menu py:0 lg:px-8">
        <Header setStatus={setIsSideBarOpen}>
          <Breadcrumb>
            <BreadcrumbItem
              isFirst
              label="SETTINGS"
              link="/dashboard"
              fontSize="text-base"
            />
            <BreadcrumbItem label="TEST CARDS" fontSize="text-base" />
          </Breadcrumb>
          <UserThumb alt={!!user ? user?.fullName : ''} />
        </Header>
        <section>
          {errorMsg ? (
            <FeedbackMsg type="error" text={errorMsg} />
          ) : (
            <Container>
              <div className="w-full flex flex-col lg:flex-row justify-between mt-4">
                <div>
                  <TextH1 text="3DS Server Operator Test Cards" />
                </div>
              </div>
              <Divider />
              <div className="mb-6" id="table">
                {testCards3DS ? (
                  testCards3DS ? (
                    testCards3DS && (
                      <TestCardsTable testCards={testCards3DS} type="3ds" />
                    )
                  ) : (
                    <TextH1 text="There are no 3DS test cards." />
                  )
                ) : (
                  <div className="animate-pulse mt-10 text-center">
                    <Spinner isLoading />
                  </div>
                )}
              </div>
              <Divider />
              <div className="w-full flex flex-col lg:flex-row justify-between mt-7">
                <div>
                  <TextH1 text="ACS Operator Test Cards" />
                  <TextH2
                    text="Sets the testing card numbers for J/Secure 2.0 test cases in ACS."
                    style="-mt-1"
                    isInfo
                  />
                </div>
              </div>
              <Divider />
              <div className="mb-6" id="table">
                {testCardsACS ? (
                  testCardsACS.length > 0 ? (
                    testCardsACS && (
                      <TestCardsTable testCards={testCardsACS} type="acs" />
                    )
                  ) : (
                    <TextH1 text="There are no ACS test cards." />
                  )
                ) : (
                  <div className="animate-pulse mt-10 text-center">
                    <Spinner isLoading />
                  </div>
                )}
              </div>
            </Container>
          )}
        </section>
        <Footer />
        <BtnUp />
      </div>
    </main>
  );
}
