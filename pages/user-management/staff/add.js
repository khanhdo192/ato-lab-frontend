import Breadcrumb from '@/components/breadcrumb';
import BreadcrumbItem from '@/components/breadcrumbItem';
import Btn from '@/components/btn';
import BtnUp from '@/components/btnUp';
import Container from '@/components/container';
import ContainerCol_3 from '@/components/containerCol_3';
import Divider from '@/components/divider';
import FeedbackMsg from '@/components/feedbackMsg';
import FormItemInput from '@/components/formItemInput';
import FormItemSelect from '@/components/formItemSelect';
import Header from '@/components/header';
import ModalMedium from '@/components/modalMedium';
import Nav from '@/components/nav';
import TextH1 from '@/components/textH1';
import TextH2 from '@/components/textH2';
import TitleIcon from '@/components/titleIcon';
import UserThumb from '@/components/userThumb';
import { postFetcher } from '@/lib/fetcher';
import { emailIsValid, passwordIsValid, textIsValid } from '@/utils/validator';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

export default function AssetsUserManageAdd({ user }) {
  const router = useRouter();

  // Defaults states
  const defaultFeedback = { isFeedback: false, message: '', type: '' };
  const defaultStaff = {
    fullName: '',
    email: '',
    title: '',
    dept: '',
    password: '',
    userRoleId: '',
    companyName: '',
  };
  const defaultLoading = { isLoading: false, event: '' };

  // States
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [feedback, setFeedback] = useState(defaultFeedback);
  const [staff, setStaff] = useState(defaultStaff);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // States handlers
  const handleStaff = (id, value) => setStaff({ ...staff, [id]: value });
  const handleFeedBack = feedBack =>
    window.scrollTo(0, 0) & setFeedback(feedBack);

  // API calls
  const jcbUsersRoleRes = useSWR('/jcb/getUsersRole', postFetcher());

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

  // Form handler
  const handleCancel = e => {
    e.preventDefault();
    router.push('/user-management');
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      if (
        !textIsValid(staff['fullName']) ||
        !textIsValid(staff['title']) ||
        !emailIsValid(staff['email']) ||
        !passwordIsValid(staff['password'])
      )
        return;

      if (isNaN(parseInt(staff['userRoleId'])))
        return handleFeedBack({
          isFeedback: true,
          message: 'Check the company group role selected.',
          type: 'warn',
        });

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
      console.log(staff);
      const staffCreateRes = await postFetcher(staff)('/jcb/users/create');

      if (staffCreateRes.rtnCode !== '1')
        return handleFeedBack({
          isFeedback: true,
          message: staffCreateRes.message,
          type: 'error',
        });

      handleFeedBack({
        isFeedback: true,
        message: 'User staff created successfully!',
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
      setStaff(defaultStaff);
      setTimeout(() => setFeedback(defaultFeedback), 5000);
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
            <BreadcrumbItem
              label="add new staff account"
              fontSize="text-base"
            />
          </Breadcrumb>
          <UserThumb alt={!!user ? user.fullName : ''} />
        </Header>
        <section>
          <div className="w-full">
            {feedback.isFeedback ? (
              <Container>
                <FeedbackMsg type={feedback.type} text={feedback.message} />
              </Container>
            ) : null}
          </div>
          <Container>
            <div className="mb-3 flex items-center">
              <TitleIcon ico="add-user" />
              <TextH1 text="Add" highliteText="New Staff Account" />
            </div>
            <TextH1 text="Enter User Account Details" />
            <TextH2
              text="Click on Submit after filling in details. The user Will be provided with login credentials via their Email. IMPORTANT!: Password must containt at least 8 characters - including Uppercase, Lowercase, Special & Number characters."
              isInfo
            />
            <Divider />
            <form onSubmit={handleSubmit}>
              <ContainerCol_3 xtra="mb-12">
                <FormItemInput
                  onChange={e => handleStaff(e.target.id, e.target.value)}
                  error={staff['fullName'] && !textIsValid(staff['fullName'])}
                  errorMsg={
                    staff['fullName'] &&
                    (!textIsValid(staff['fullName'])
                      ? 'Characters not allowed: /[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/'
                      : null)
                  }
                  id="fullName"
                  value={staff['fullName']}
                  label="Full Name*"
                  isRequired
                />
                <FormItemInput
                  onChange={e => handleStaff(e.target.id, e.target.value)}
                  error={staff['email'] && !emailIsValid(staff['email'])}
                  errorMsg={
                    staff['email'] &&
                    (!emailIsValid(staff['email']) ? 'Email is not valid.' : '')
                  }
                  id="email"
                  value={staff['email']}
                  label="Email*"
                  type="email"
                />
                {/* <FormItemInput
                  onChange={e => handleStaff(e.target.id, e.target.value)}
                  error={staff['title'] && !textIsValid(staff['title'])}
                  errorMsg={
                    staff['title'] &&
                    (!textIsValid(staff['title'])
                      ? 'Characters not allowed: /[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/'
                      : null)
                  }
                  id="title"
                  value={staff['title']}
                  label="Title"
                />
                <FormItemInput
                  onChange={e => handleStaff(e.target.id, e.target.value)}
                  id="dept"
                  value={staff['dept']}
                  label="Department"
                /> */}
                <FormItemInput
                  onChange={e => handleStaff(e.target.id, e.target.value)}
                  error={
                    staff['password'] && !passwordIsValid(staff['password'])
                  }
                  errorMsg={
                    staff['password'] &&
                    (!passwordIsValid(staff['password'])
                      ? 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one special character.'
                      : '')
                  }
                  id="password"
                  value={staff['password']}
                  label="Password*"
                  type="password"
                  isRequired
                />
                {/* <FormItemInput
                  onChange={e => handleStaff(e.target.id, e.target.value)}
                  id="companyName"
                  value={staff['companyName']}
                  defaultValue={'JCB Co. Ltd.'}
                  label="Company Name"
                /> */}
              </ContainerCol_3>
              <Divider />
              <ContainerCol_3 xtra="mb-12">
                <div />
                <div />
                <div className="flex flex-col items-end">
                  <FormItemSelect
                    id="userRoleId"
                    label="Role*"
                    onChange={e => handleStaff(e.target.id, e.target.value)}
                    // isDisabled={true}
                  >
                    <option defaultValue="">Select Role</option>
                    {/** TPPM */}
                    {user && user.userRoleId === 0 && usersRole && (
                      <option
                        selected={staff['userRoleId'] === '1'}
                        id="userRoleId"
                        value={'1'}
                      >
                        {usersRole['1']}
                      </option>
                    )}{' '}
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
        title={'JCB User Staff'}
        text={'Are you completely sure to perform this action?'}
        onSubmit={() => handleConfirm()}
        onCancel={() => setShowModal(false)}
        isOpen={showModal}
      />
    </main>
  );
}
