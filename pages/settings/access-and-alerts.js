import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher, postFetcher } from '@/lib/fetcher';
import Header from '@/components/header';
import Nav from '@/components/nav';
import CommonText from '@/components/commonText';
import Divider from '@/components/divider';
import InputNumberSteps from '@/components/inputNumberSteps';
import BlueSwitch from '@/components/blueSwitch';
import BtnUp from '@/components/btnUp';
import FeedbackMsg from '@/components/feedbackMsg';
import Breadcrumb from '@/components/breadcrumb';
import BreadcrumbItem from '@/components/breadcrumbItem';
import Container from '@/components/container';
import Footer from '@/components/footer';
import 'jspdf-autotable';
import UserThumb from '@/components/userThumb';
import Spinner from '@/components/spinner';
import { useRouter } from 'next/router';

export default function AccessAndAlerts({ user }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const defaultFeedback = { isFeedback: false, message: '', type: '' };
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const [setting, setSetting] = useState({});
  const [feedback, setFeedback] = useState(defaultFeedback);
  const handleFeedBack = feedBack => setFeedback(feedBack);

  const handleSetting = (id, value) => {
    setSetting({ ...setting, [id]: value });
  };

  const settingRes = useSWR('/jcb/setting', fetcher);

  useEffect(() => {
    if (settingRes?.data) {
      setSetting(settingRes?.data?.result);
    }

    if (settingRes?.error)
      handleFeedBack({
        isFeedback: true,
        message: 'Ops! error loading Settings.',
        type: 'error',
      });
    if (settingRes?.error?.response?.data?.rtnCode === '9897') {
      router.reload();
    }
    localStorage.setItem('isIdle', false);
  }, [settingRes?.data, settingRes?.error]);

  const handleSubmit = async () => {
    try {
      setSubmitted(true);

      const settingUpdateRes = await postFetcher(setting)('/jcb/setting');

      if (settingUpdateRes.rtnCode !== '1')
        return handleFeedBack({
          isFeedback: true,
          message: staffCreateRes.message,
          type: 'error',
        });

      handleFeedBack({
        isFeedback: true,
        message: 'Setting updated successfully!',
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
        activeSection={'settings/access-alerts'}
      />
      <div className="relative z-0 w-full p-2 lg:pt-2 lg:ml-menu-lg 2xl:ml-menu py:0 lg:px-8">
        <Header setStatus={setIsSideBarOpen}>
          <Breadcrumb>
            <BreadcrumbItem
              isFirst
              label="Settings"
              link="/dashboard"
              fontSize="text-base"
            />
            <BreadcrumbItem label="Access & Alerts" fontSize="text-base" />
          </Breadcrumb>
          <UserThumb alt={!!user ? user?.fullName : ''} />
        </Header>
        <section>
          {feedback.isFeedback ? (
            <FeedbackMsg type={feedback.type} text={feedback.message} />
          ) : null}
          <Container>
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 mb-8">
                <div className="flex flex-col gap-4">
                  <CommonText
                    xtra="text-2xl font-bold"
                    text="Platform Access"
                  />
                  <div className="flex items-center gap-4">
                    <CommonText xtra="text-lg" text="Default Access Time" />
                    <InputNumberSteps
                      min={0}
                      max={90}
                      id={'accessTime'}
                      value={setting['accessTime'] || 0}
                      onChange={(id, e) => handleSetting(id, e)}
                    />
                  </div>
                  <CommonText
                    xtra="text-sm"
                    text="Sets the default number of days granted for each Operator company when approved to
                        access the test platform."
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex">
                  <CommonText xtra="text-2xl font-bold" text="Email Alerts " />
                </div>
                <div className="flex items-center gap-x-2">
                  <BlueSwitch
                    xtra="m-n"
                    id={'documentUpdate'}
                    status={setting['documentUpdate'] || false}
                    onChange={(id, e) => handleSetting(id, e)}
                  />
                  <CommonText
                    xtra="font-light"
                    text="Documents updated. Only send alerts to Active accounts only"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16">
                <div className="flex flex-col gap-4">
                  <div className="flex">
                    <CommonText
                      xtra="text-xl font-medium"
                      text="Letter of Approval"
                    />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <BlueSwitch
                      xtra="m-n"
                      id={'productEmvcoLoaExpired'}
                      status={setting['productEmvcoLoaExpired'] || false}
                      onChange={(id, e) => handleSetting(id, e)}
                    />
                    <CommonText
                      xtra="font-light"
                      text="Product EMVCo LoA has expired."
                    />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <BlueSwitch
                      xtra="m-n justify-center"
                      id={'productEmvcoLoaExpiring'}
                      status={setting['productEmvcoLoaExpiring'] || false}
                      onChange={(id, e) => handleSetting(id, e)}
                    />
                    <CommonText
                      xtra="font-light"
                      text="Product EMVCo LoA is expiring."
                    />
                  </div>
                  <div className="flex">
                    <InputNumberSteps
                      min={0}
                      max={90}
                      id={'productEmvcoLoaDays'}
                      value={setting['productEmvcoLoaDays'] || 0}
                      onChange={(id, e) => handleSetting(id, e)}
                    />
                  </div>
                  <div className="flex mb-2">
                    <CommonText
                      xtra="text-sm"
                      text="Sets the number of days in advance the alert email is sent before the LoA expires (sent
                    to both JCB and Operators)."
                    />
                  </div>
                  <div className="flex">
                    <CommonText
                      xtra="text-xl font-medium"
                      text="Access Expiring"
                    />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <BlueSwitch
                      xtra="m-n justify-center"
                      id={'accessExpiring'}
                      status={setting['accessExpiring'] || false}
                      onChange={(id, e) => handleSetting(id, e)}
                    />
                    <CommonText
                      xtra="font-light"
                      text="Access expiration advanced warning"
                    />
                  </div>
                  <div className="flex">
                    <InputNumberSteps
                      min={0}
                      max={90}
                      id={'accessExpiringDays'}
                      value={setting['accessExpiringDays'] || 0}
                      onChange={(id, e) => handleSetting(id, e)}
                    />
                  </div>
                  <div className="flex mb-2">
                    <CommonText
                      xtra="text-sm"
                      text="Sets the number of days in advance Access Expiration Warning email is sent to an
                    operator account."
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex">
                    <CommonText
                      xtra="text-xl font-medium"
                      text="Letter of Compliance "
                    />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <BlueSwitch
                      xtra="m-n"
                      id={'productEmvcoLocExpired'}
                      status={setting['productEmvcoLocExpired'] || false}
                      onChange={(id, e) => handleSetting(id, e)}
                    />
                    <CommonText
                      xtra="font-light"
                      text="Product JCB LoC has expired. "
                    />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <BlueSwitch
                      xtra="m-n"
                      id={'productEmvcoLocExpiring'}
                      status={setting['productEmvcoLocExpiring'] || false}
                      onChange={(id, e) => handleSetting(id, e)}
                    />
                    <CommonText
                      xtra="font-light"
                      text="Product JCB LoC is expiring "
                    />
                  </div>
                  <div className="flex">
                    <InputNumberSteps
                      min={0}
                      max={90}
                      id={'productEmvcoLocDays'}
                      value={setting['productEmvcoLocDays'] || 0}
                      onChange={(id, e) => handleSetting(id, e)}
                    />
                  </div>
                  <div className="flex">
                    <CommonText
                      xtra="text-sm"
                      text="Sets the number of days in advance the alert email is sent before the LoC expires (sent
                        to both JCB and Operators). "
                    />
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div className="mb-4">
              <CommonText xtra="text-2xl font-bold" text="Password Policy" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 mb-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                  <CommonText
                    xtra="text-lg"
                    text="Operator Password Validity"
                  />
                  <InputNumberSteps
                    min={0}
                    max={90}
                    id={'operatorPasswordValidity'}
                    value={setting['operatorPasswordValidity'] || 0}
                    onChange={(id, e) => handleSetting(id, e)}
                  />
                </div>
                <div className="flex">
                  <CommonText
                    xtra="text-sm"
                    text="Sets the default number of days before a password change is required for operator
                    accounts (Admin and Tester)."
                  />
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                  <CommonText xtra="text-xl" text="Login Attempts:" />
                  <InputNumberSteps
                    min={0}
                    max={90}
                    id={'loginAttempts'}
                    value={setting['loginAttempts'] || 0}
                    onChange={(id, e) => handleSetting(id, e)}
                  />
                </div>
                <div className="flex">
                  <CommonText
                    xtra="text-sm"
                    text="Sets the number of times a failed login attempt is before the account is deactivated."
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                  <CommonText xtra="text-xl" text="Admin Password Validity" />
                  <InputNumberSteps
                    min={0}
                    max={90}
                    id={'adminPasswordValidity'}
                    value={setting['adminPasswordValidity'] || 0}
                    onChange={(id, e) => handleSetting(id, e)}
                  />
                </div>
                <div className="flex">
                  <CommonText
                    xtra="text-sm"
                    text="The default number of days before a password change is required for JCB Admin
                    accounts (TPPM and IM), Please contact Atomworks to change this value."
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <button
                className="bg-b-400 py-2 px-9 rounded-lg text-white mr-6"
                onClick={() => handleSubmit()}
                disabled={submitted}
              >
                {submitted ? <Spinner isLoading={submitted} /> : 'Save'}
              </button>
            </div>
          </Container>
        </section>
        <Footer />
        <BtnUp />
      </div>
    </main>
  );
}
