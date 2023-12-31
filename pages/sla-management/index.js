import Btn from '@/components/btn';
import Container from '@/components/container';
import ContainerCol_3 from '@/components/containerCol_3';
import FeedbackMsg from '@/components/feedbackMsg';
import FormItemInput from '@/components/formItemInput';
import Spinner from '@/components/spinner';
import { postFetcher } from '@/lib/fetcher';
import useUser from '@/lib/useUser';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import Breadcrumb from '../../components/breadcrumb';
import BreadcrumbItem from '../../components/breadcrumbItem';
import BtnUp from '../../components/btnUp';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Nav from '../../components/nav';
import UserThumb from '../../components/userThumb';

export default function SlaManagementPage() {
  const { user } = useUser({ redirectTo: '/login' });
  const router = useRouter();
  const defaultFeedback = { isFeedback: false, message: '', type: '' };
  const defaultSla = {
    profileReviewDays: 0,
    resultsReviewDays: 0,
    approvalDays: 0,
  };

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [feedback, setFeedback] = useState(defaultFeedback);
  const [sla, setSla] = useState(defaultSla);
  const [submitted, setSubmitted] = useState(false);

  const handleFeedBack = feedBack =>
    window.scrollTo(0, 0) & setFeedback(feedBack);
  const handleSla = (id, value) => setSla({ ...sla, [id]: value });

  const { data: dataSla, error: errorSla } = useSWR(
    '/jcb/getSla',
    postFetcher(),
    { revalidateOnFocus: true }
  );

  useMemo(() => {
    if (dataSla?.result) {
      const result = dataSla?.result;
      setSla(result);
    }
    if (errorSla) {
      setSla(null);
      if (errorSla?.response?.data?.rtnCode === '9897') {
        router.reload();
      }
      localStorage.setItem('isIdle', false);
    }
  }, [dataSla, errorSla]);

  const handleSubmit = async () => {
    try {
      setSubmitted(true);

      const slaUpdateRes = await postFetcher(sla)('/jcb/updateSla');

      if (slaUpdateRes.rtnCode !== '1')
        return handleFeedBack({
          isFeedback: true,
          message: staffCreateRes.message,
          type: 'error',
        });

      handleFeedBack({
        isFeedback: true,
        message: 'SLA updated successfully!',
        type: 'success',
      });
    } catch (error) {
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      return handleFeedBack({
        isFeedback: true,
        message: error?.message,
        type: 'error',
      });
    } finally {
      setSubmitted(false);
      setTimeout(() => setFeedback(defaultFeedback), 5000);
    }
  };

  return (
    <main className="relative flex w-full min-h-screen 2xl:min-h-main m-auto max-w-1688 2xl:my-8 2xl:pl-8">
      <Nav
        status={isSideBarOpen}
        setStatus={setIsSideBarOpen}
        activeSection={'settings/sla-management'}
      />
      <div className="relative z-0 w-full p-2 lg:pt-2 lg:ml-menu-lg 2xl:ml-menu py:0 lg:px-8">
        <Header setStatus={setIsSideBarOpen}>
          <Breadcrumb>
            <BreadcrumbItem
              isFirst
              label="Dashboard"
              link="/dashboard"
              fontSize="text-base"
            />
            <BreadcrumbItem label="SLA management" fontSize="text-base" />
          </Breadcrumb>
          <UserThumb alt={!!user ? user?.fullName : ''} />
        </Header>
        <section>
          {feedback.isFeedback ? (
            <Container>
              <FeedbackMsg type={feedback.type} text={feedback.message} />
            </Container>
          ) : null}
          <Container hasBorder>
            <div className="w-full flex justify-between">
              <h1 className="text-xl ml-2 mb-3 font-semibold tracking-wide">
                Enter your SLA for all services applicable
              </h1>
            </div>
            {!!sla ? (
              <ContainerCol_3 xtra="mb-6">
                <FormItemInput
                  onChange={e => handleSla(e.target.id, e.target.value)}
                  id="profileReviewDays"
                  value={sla['profileReviewDays']}
                  label="Profile Review Days*"
                  info="Select your for Profile Review Days* here"
                  type="number"
                  isRequired
                />
                <FormItemInput
                  onChange={e => handleSla(e.target.id, e.target.value)}
                  id="resultsReviewDays"
                  value={sla['resultsReviewDays']}
                  label="Results Review Days*"
                  info="Select your Results Review Days*"
                  type="number"
                  isRequired
                />
                <FormItemInput
                  onChange={e => handleSla(e.target.id, e.target.value)}
                  id="approvalDays"
                  value={sla['approvalDays']}
                  label="Approval Days*"
                  info="Select your Approval Days*"
                  type="number"
                  isRequired
                />
              </ContainerCol_3>
            ) : (
              <Spinner isLoading size={5} />
            )}
            <ContainerCol_3 xtra="pb-6">
              <div />
              <div />
              <div className="flex flex-col items-end">
                <div className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap gap-4">
                  <Btn
                    label="cancel"
                    xtra="w-full mr-2"
                    secondary
                    onClick={() => setSla(defaultSla)}
                  />
                  <Btn
                    label="submit"
                    type="button"
                    ico={submitted ? 'spinner' : 'submit'}
                    isDisable={
                      submitted ||
                      !sla.approvalDays ||
                      !sla.profileReviewDays ||
                      !sla.resultsReviewDays
                    }
                    xtra="w-full mr-2"
                    onClick={() => handleSubmit()}
                  />
                </div>
              </div>
            </ContainerCol_3>
          </Container>
        </section>
        <Footer />
        <BtnUp />
      </div>
    </main>
  );
}
