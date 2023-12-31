import Breadcrumb from '@/components/breadcrumb';
import BreadcrumbItem from '@/components/breadcrumbItem';
import Btn from '@/components/btn';
import BtnUp from '@/components/btnUp';
import Container from '@/components/container';
import ContainerCol_3 from '@/components/containerCol_3';
import Divider from '@/components/divider';
import FeedbackMsg from '@/components/feedbackMsg';
import FormItemCheckbox from '@/components/formItemCheckbox';
import FormItemInput from '@/components/formItemInput';
import Header from '@/components/header';
import Nav from '@/components/nav';
import TextH1 from '@/components/textH1';
import TextH2 from '@/components/textH2';
import TitleIcon from '@/components/titleIcon';
import UserThumb from '@/components/userThumb';
import { fetcher, postFetcher } from '@/lib/fetcher';
import { emailIsValid, passwordIsValid, textIsValid } from '@/utils/validator';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

export default function AssetsUserManageEdit({ user }) {
  const router = useRouter();
  const { id } = router.query;

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
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // States handlers
  const handleTester = (id, value) => setTester({ ...tester, [id]: value });
  const handleFeedBack = feedBack =>
    window.scrollTo(0, 0) & setFeedback(feedBack);

  // API calls
  const jcbUsersRes = useSWR('/jcb/getOpUsers', fetcher);
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

  useMemo(() => {
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

  useMemo(() => {
    if (jcbUsersRes?.data) {
      const testerToEditRes = jcbUsersRes?.data?.result?.users.find(
        user => user['id'] === id
      );
      setTester({ ...testerToEditRes, password: '' });
      return testerToEditRes;
    }

    if (jcbUsersRes?.error) {
      handleFeedBack({
        isFeedback: true,
        message: 'Ops! error loading tester Account to edit.',
        type: 'error',
      });
    }

    return null;
  }, [jcbUsersRes?.data?.result?.users, jcbUsersRes?.error, id]);

  useMemo(() => {
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

  useMemo(() => {
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
        !emailIsValid(tester['email']) ||
        !passwordIsValid(tester['password'])
      )
        return;

      if (!isConfirmed)
        return handleFeedBack({
          isFeedback: true,
          message: 'Confirm the action please.',
          type: 'info',
        });

      setIsSending(true);

      const testerCreateRes = await postFetcher(tester)('/jcb/users/update');

      if (testerCreateRes.rtnCode !== '1')
        return handleFeedBack({
          isFeedback: true,
          message: testerCreateRes.message,
          type: 'error',
        });

      handleFeedBack({
        isFeedback: true,
        message: 'Tester account updated successfully!',
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
      setIsSending(false);
      setTimeout(() => setFeedback(defaultFeedback), 5000);
    }
  };

  const handleRemoveTester = async () => {
    try {
      if (!isConfirmed)
        return setFeedback({
          isFeedback: true,
          message: 'Confirm the action please.',
          type: 'info',
        });
      // const roleDeleteRes = await postFetcher({ userId: user?.id, deletetesterId: id })('/jcb/users/delete');

      handleFeedBack({
        isFeedback: true,
        message: 'Tester acount deleted successfully!',
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
      setTimeout(() => setFeedback(defaultFeedback), 5000);
      router.push('/user-management');
    }
  };

  return (
    <main className="relative flex w-full min-h-screen 2xl:min-h-main m-auto max-w-1688 2xl:my-8 2xl:pl-8">
      <Nav
        status={isSideBarOpen}
        setStatus={setIsSideBarOpen}
        activeSection={'user-management'}
      />
      <div className="relative z-0 w-full p-2 lg:pt-2 lg:ml-menu-lg 2xl:ml-menu py:0 lg:px-8">
        <Header setStatus={setIsSideBarOpen}>
          <Breadcrumb>
            <BreadcrumbItem
              isFirst
              label="dashboard"
              link="/dashboard"
              fontSize="text-base"
            />
            <BreadcrumbItem
              label="user management"
              link="/user-management"
              fontSize="text-base"
            />
            <BreadcrumbItem label="edit" fontSize="text-base" />
          </Breadcrumb>
          <UserThumb alt={!!user ? user.fullName : ''} />
        </Header>
        <section>
          <div className="w-full">
            {feedback.isFeedback && (
              <Container>
                <FeedbackMsg type={feedback.type} text={feedback.message} />
              </Container>
            )}
          </div>
          <Container>
            {/* <div className="w-full flex justify-between">
              <TextH1 text="Role Name and Permissions" />
              <BtnAction onClick={() => handleRemoveTester()} label="REMOVE TESTER ACCOUNT" ico="delete" color="bg-r-400" xtra="-mt-1" />
            </div> */}
            <div className="mb-3 flex items-center">
              <TitleIcon ico="edit" />
              <TextH1 text="Edit" highliteText="Existing User" />
            </div>
            <TextH1 text="Enter User Account Details" />
            <TextH2
              text="Click on Send invite after filling in details. The user Will be provided with login credentials via their Email. IMPORTANT!: Password must containt at least 8 characters - including Uppercase, Lowercase, Special & Number characters."
              isInfo
            />
            <Divider />
            <form onSubmit={handleSubmit}>
              <ContainerCol_3 xtra="mb-12">
                <FormItemInput
                  onChange={e => handleTester(e.target.id, e.target.value)}
                  id="companyName"
                  value={tester['companyName']}
                  defaultValue={'JCB Co. Ltd.'}
                  label="Company Name"
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
                {/* <FormItemInput
                  onChange={e => handleTester(e.target.id, e.target.value)}
                  error={tester["title"] && !textIsValid(tester["title"])}
                  errorMsg={tester["title"] && (!textIsValid(tester["title"]) ? 'Characters not allowed: /[`!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?~]/' : null)}
                  id="title"
                  value={tester["title"]}
                  label="Title"
                  isRequired
                /> */}
                {/* <FormItemInput
                  onChange={e => handleTester(e.target.id, e.target.value)}
                  id="dept"
                  value={tester["dept"]}
                  label="Department"
                  isRequired
                /> */}
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
                  type="email"
                  isRequired
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
                  type="password"
                  isRequired
                />
                {/* <FormItemSelect id="component" label="Component*" onChange={e => handleTester(e.target.id, e.target.value)} >
                  <option value="" >Select Component</option>
                  { components && Object.keys(components).map(component => <option selected={tester["component"] === components[component]} id="component" value={components[component]} >{components[component]}</option>) }
                </FormItemSelect>

                <FormItemSelect id="protocolVersion" label="Protocol Version*" onChange={e => handleTester(e.target.id, e.target.value)} >
                  <option value="" >Select Protocol Version</option>
                  { protocolVersions && protocolVersions.map((version, i) => <option selected={tester["protocolVersion"].includes(version)} id="protocolVersions" value={version} >{version}</option>) }
                </FormItemSelect> */}
              </ContainerCol_3>
              <Divider />
              <ContainerCol_3 xtra="mb-12">
                <div />
                <div />
                <div className="flex flex-col items-end">
                  {/* <FormItemSelect id="userRoleId" label="Role*" onChange={e => handleTester(e.target.id, e.target.value)} >
                    <option defaultValue="" >Select Role</option>
                    { usersRole && <option selected={String(tester["userRoleId"]) === "3"} id="userRoleId" value={"3"} >{usersRole["3"]}</option> }
                    { usersRole && <option selected={String(tester["userRoleId"]) === "4"} id="userRoleId" value={"4"} >{usersRole["4"]}</option> }
                  </FormItemSelect> */}
                  <FormItemCheckbox
                    isChequed={isConfirmed}
                    onClick={e => setIsConfirmed(!isConfirmed)}
                    id="check"
                    name="check"
                    label="Please Confirm this Action!"
                  />
                  <div className="w-full lg:w-auto flex">
                    <Btn
                      label="go back"
                      xtra="mb-16 lg:mb-12 w-full mr-2"
                      secondary
                      onClick={e => handleCancel(e)}
                    />
                    <Btn
                      label="submit"
                      ico={isSending ? 'spinner' : 'submit'}
                      isDisable={isSending}
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
    </main>
  );
}
