import { useMemo, useState } from 'react';
import { postFetcher } from '@/lib/fetcher';
import { emailIsValid, passwordIsValid, textIsValid } from '@/utils/validator';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Breadcrumb from '@/components/breadcrumb';
import BreadcrumbItem from '@/components/breadcrumbItem';
import Header from '@/components/header';
import Nav from '@/components/nav';
import UserThumb from '@/components/userThumb';
import TextH1 from '@/components/textH1';
import TextH2 from '@/components/textH2';
import TitleIcon from '@/components/titleIcon';
import Divider from '@/components/divider';
import Btn from '@/components/btn';
import BtnUp from '@/components/btnUp';
import FormItemInput from '@/components/formItemInput';
import FormItemSelect from '@/components/formItemSelect';
import Container from '@/components/container';
import ContainerCol_3 from '@/components/containerCol_3';
import FeedbackMsg from '@/components/feedbackMsg';
import ModalMedium from '@/components/modalMedium';

export default function AssetsUserManageAdd({ user }) {
  const router = useRouter();
  // Defaults states
  const defaultFeedback = { isFeedback: false, message: '', type: '' };
  const defaultTester = {
    companyName: '',
    fullName: '',
    title: '',
    dept: '',
    email: '',
    password: '',
    component: '',
    protocolVersion: '',
    userRoleId: '',
  };

  // States
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [feedback, setFeedback] = useState(defaultFeedback);
  const [tester, setTester] = useState(defaultTester);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // States handlers
  const handleTester = (id, value) => setTester({ ...tester, [id]: value });
  const handleFeedBack = feedBack =>
    window.scrollTo(0, 0) & setFeedback(feedBack);

  // API calls
  const jcbUsersRoleRes = useSWR('/jcb/getUsersRole', postFetcher());
  const jcbAllComponentRes = useSWR('/jcb/getAllComponent', postFetcher());
  const jcbAllProtocolVersionRes = useSWR(
    '/jcb/getAllProtocolVersion',
    postFetcher()
  );

  useEffect(() => {
    if (jcbUsersRoleRes?.error) {
      localStorage.setItem('isIdle', false);
      if (jcbUsersRoleRes?.error?.response?.data?.rtnCode === '9897') {
        router.reload();
      }
    }
  }, [jcbUsersRoleRes?.error]);

  const usersRole = useMemo(() => {
    if (jcbUsersRoleRes?.data) {
      return jcbUsersRoleRes?.data?.result?.usersRole;
    }

    if (jcbUsersRoleRes?.error) {
      handleFeedBack({
        isFeedback: true,
        message: 'Ops! error loading user roles.',
        type: 'error',
      });
    }
    return null;
  }, [jcbUsersRoleRes?.data?.result?.usersRole, jcbUsersRoleRes?.error]);

  const components = useMemo(() => {
    if (jcbAllComponentRes?.data) {
      return jcbAllComponentRes?.data?.result?.components;
    }

    if (jcbAllComponentRes?.error) {
      handleFeedBack({
        isFeedback: true,
        message: 'Ops! error loading components.',
        type: 'error',
      });
    }
    return null;
  }, [jcbAllComponentRes?.data?.result?.components, jcbAllComponentRes?.error]);

  const protocolVersions = useMemo(() => {
    if (jcbAllProtocolVersionRes?.data) {
      return jcbAllProtocolVersionRes?.data?.result?.protocolVersions;
    }

    if (jcbAllProtocolVersionRes?.error) {
      handleFeedBack({
        isFeedback: true,
        message: 'Ops! error loading protocol versions.',
        type: 'error',
      });
    }
    return null;
  }, [
    jcbAllProtocolVersionRes?.data?.result?.protocolVersions,
    jcbAllProtocolVersionRes?.error,
  ]);

  // Form handler
  const handleCancel = e => {
    e.preventDefault();
    router.push('/user-management');
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      if (
        !textIsValid(tester['fullName']) ||
        !textIsValid(tester['title']) ||
        !textIsValid(tester['dept']) ||
        !emailIsValid(tester['email']) ||
        !passwordIsValid(tester['password'])
      )
        return;

      if (isNaN(parseInt(tester['userRoleId']))) {
        return handleFeedBack({
          isFeedback: true,
          message: 'Check the company group role selected.',
          type: 'warn',
        });
      }

      if (!Object.values(components).includes(tester['component'])) {
        return handleFeedBack({
          isFeedback: true,
          message: 'Check the component selected.',
          type: 'warn',
        });
      }

      if (!protocolVersions.some(p => tester['protocolVersion'].includes(p))) {
        return handleFeedBack({
          isFeedback: true,
          message: 'Check the protocol version selected.',
          type: 'warn',
        });
      }

      return setShowModal(true);
    } catch (error) {
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      return handleFeedBack({
        isFeedback: true,
        message: error?.message,
        type: 'error',
      });
    }
  };

  const handleConfirm = async () => {
    try {
      setShowModal(false);
      setSubmitted(true);
      const testerCreateRes = await postFetcher(tester)('/jcb/users/create');

      if (testerCreateRes.rtnCode !== '1')
        return handleFeedBack({
          isFeedback: true,
          message: testerCreateRes.message,
          type: 'error',
        });

      handleFeedBack({
        isFeedback: true,
        message: 'Tester account created successfully!',
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
      setTester(defaultTester);
      setTimeout(() => setFeedback(defaultFeedback), 5000);
    }
  };

  return (
    <main className="flex w-full min-h-screen 2xl:min-h-main m-auto max-w-screen-2xl 2xl:my-8">
      {/*  Sidebar  */}
      <Nav
        status={isSideBarOpen}
        setStatus={setIsSideBarOpen}
        activeSection={'user-management'}
      />

      {/*  Content  */}
      <div className="relative z-0 w-full p-2 pt-20 lg:pt-2 lg:ml-menu-lg 2xl:ml-menu py:0 lg:px-8">
        <Header setStatus={setIsSideBarOpen}>
          {/*  Breadcrumbs  */}

          <Breadcrumb>
            <BreadcrumbItem isFirst label="dashboard" link="/dashboard" />
            <BreadcrumbItem label="user management" link="/user-management" />
            <BreadcrumbItem label="add new tester account" />
          </Breadcrumb>

          {/*  User info  */}

          <div>
            {/* User UI  */}
            <UserThumb alt={!!user ? user.fullName : ''} />
          </div>
        </Header>

        {/*  Content per PAGE  */}
        <section>
          <div className="w-full">
            {/* Feedback */}
            {feedback.isFeedback && (
              <Container>
                <FeedbackMsg type={feedback.type} text={feedback.message} />
              </Container>
            )}
          </div>

          <Container>
            <div className="mb-3 flex items-center">
              <TitleIcon ico="add-user" />
              <TextH1 text="Add" highliteText="New Tester Account" />
            </div>

            {/* Title + subtitles */}
            <TextH1 text="Enter User Account Details" />
            <TextH2
              text="Click on Submit after filling in details. The user Will be provided with login credentials via their Email. IMPORTANT!: Password must containt at least 8 characters - including Uppercase, Lowercase, Special & Number characters."
              isInfo
            />

            <Divider />
            <form onSubmit={handleSubmit}>
              <ContainerCol_3 xtra="mb-12">
                <FormItemInput
                  onChange={e => handleTester(e.target.id, e.target.value)}
                  error={
                    tester['companyName'] && !textIsValid(tester['companyName'])
                  }
                  errorMsg={
                    tester['companyName'] &&
                    (!textIsValid(tester['companyName'])
                      ? 'Characters not allowed: /[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/'
                      : null)
                  }
                  id="companyName"
                  value={tester['companyName']}
                  label="Company"
                  isRequired
                />
                <FormItemInput
                  onChange={e => handleTester(e.target.id, e.target.value)}
                  error={tester['fullName'] && !textIsValid(tester['fullName'])}
                  errorMsg={
                    tester['fullName'] &&
                    (!textIsValid(tester['fullName'])
                      ? 'Characters not allowed: /[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/'
                      : null)
                  }
                  id="fullName"
                  value={tester['fullName']}
                  label="Full Name"
                  isRequired
                />
                <FormItemInput
                  onChange={e => handleTester(e.target.id, e.target.value)}
                  error={tester['title'] && !textIsValid(tester['title'])}
                  errorMsg={
                    tester['title'] &&
                    (!textIsValid(tester['title'])
                      ? 'Characters not allowed: /[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/'
                      : null)
                  }
                  id="title"
                  value={tester['title']}
                  label="Title*"
                  isRequired
                />
                <FormItemInput
                  onChange={e => handleTester(e.target.id, e.target.value)}
                  id="dept"
                  value={tester['dept']}
                  label="Department*"
                  isRequired
                />
                <FormItemInput
                  onChange={e => handleTester(e.target.id, e.target.value)}
                  error={tester['email'] && !emailIsValid(tester['email'])}
                  errorMsg={
                    tester['email'] &&
                    (!emailIsValid(tester['email'])
                      ? 'Email is not valid.'
                      : '')
                  }
                  id="email"
                  value={tester['email']}
                  label="Email*"
                  isRequired
                  type="email"
                />
                <FormItemInput
                  onChange={e => handleTester(e.target.id, e.target.value)}
                  error={
                    tester['password'] && !passwordIsValid(tester['password'])
                  }
                  errorMsg={
                    tester['password'] &&
                    (!passwordIsValid(tester['password'])
                      ? 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
                      : '')
                  }
                  id="password"
                  value={tester['password']}
                  label="Password*"
                  isRequired
                  type="password"
                />

                <FormItemSelect
                  id="component"
                  label="Component*"
                  onChange={e => handleTester(e.target.id, e.target.value)}
                >
                  <option defaultValue="">Select Component</option>
                  {components &&
                    Object.keys(components).map(component => (
                      <option
                        selected={tester['component'] === components[component]}
                        id="component"
                        value={components[component]}
                      >
                        {components[component]}
                      </option>
                    ))}
                </FormItemSelect>

                <FormItemSelect
                  id="protocolVersion"
                  label="Protocol version*"
                  onChange={e => handleTester(e.target.id, e.target.value)}
                >
                  <option defaultValue="">Select Protocol version</option>
                  {protocolVersions &&
                    protocolVersions.map((version, i) => (
                      <option
                        selected={tester['protocolVersion'].includes(version)}
                        id="protocolVersion"
                        value={version}
                      >
                        {version}
                      </option>
                    ))}
                </FormItemSelect>
              </ContainerCol_3>

              <Divider />

              <ContainerCol_3 xtra="mb-12">
                <div />
                <div />
                <div className="flex flex-col items-end">
                  <FormItemSelect
                    id="userRoleId"
                    label="Role*"
                    onChange={e => handleTester(e.target.id, e.target.value)}
                  >
                    <option defaultValue="">Select Role</option>
                    {usersRole && (
                      <option
                        selected={String(tester['userRoleId']) === '3'}
                        id="userRoleId"
                        value={'3'}
                      >
                        {usersRole['3']}
                      </option>
                    )}
                    {usersRole && (
                      <option
                        selected={String(tester['userRoleId']) === '4'}
                        id="userRoleId"
                        value={'4'}
                      >
                        {usersRole['4']}
                      </option>
                    )}
                  </FormItemSelect>

                  <div className="w-full lg:w-auto flex">
                    <Btn
                      label="go back"
                      xtra="mb-16 lg:mb-12 w-full mr-2"
                      secondary
                      onClick={e => handleCancel(e)}
                    />
                    <Btn
                      label="submit"
                      ico={submitted ? 'spinner' : 'submit'}
                      isDisable={submitted}
                      xtra="mb-16 lg:mb-12 w-full mr-2"
                    />
                  </div>
                </div>
              </ContainerCol_3>
            </form>
          </Container>
        </section>

        <BtnUp />
      </div>
      <ModalMedium
        title={'JCB Tester Account'}
        text={'Are you completely sure to perform this action?'}
        onSubmit={() => handleConfirm()}
        onCancel={() => setShowModal(false)}
        isOpen={showModal}
      />
    </main>
  );
}
