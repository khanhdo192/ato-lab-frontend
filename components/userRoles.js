import BtnTableTitle from '@/components/btnTableTitle';
import Divider from '@/components/divider';
import FeedbackMsg from '@/components/feedbackMsg';
import Spinner from '@/components/spinner';
import TableRowUserRoles from '@/components/tableRowUserRoles';
import TextH1 from '@/components/textH1';
import TextH2 from '@/components/textH2';
import { postFetcher } from '@/lib/fetcher';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

export default function UserRoles({ user }) {
  const defaultFeedback = { isFeedback: false, message: '', type: '' };
  const [feedback, setFeedback] = useState(defaultFeedback);

  const handleFeedBack = feedBack =>
    window.scrollTo(0, 0) & setFeedback(feedBack);

  const rolesLoadRes = useSWR('/jcb/getUsersRole', postFetcher({}));

  const usersRole = useMemo(() => {
    if (rolesLoadRes?.data) return rolesLoadRes?.data?.result?.usersRole;

    if (rolesLoadRes?.error && !feedback.isFeedback)
      handleFeedBack({
        isFeedback: true,
        message: 'Ops! error loading roles.',
        type: 'error',
      });

    return null;
  }, [rolesLoadRes?.data?.result?.usersRole, rolesLoadRes?.error]);

  return (
    <>
      <div className="w-full">
        {feedback.isFeedback && (
          <Container>
            <FeedbackMsg type={feedback.type} text={feedback.message} />
          </Container>
        )}
      </div>
      <TextH1 text="JCB" highliteText="User Roles" />
      <TextH2
        text="Define your own role by customizing the access permission to each portal function."
        isInfo
      />
      <Divider style="hidden lg:block" />
      {rolesLoadRes?.data ? (
        <div className="mt-8 lg:mt-0 mb-8">
          <div className="grid grid-cols-user-roles lg:grid-cols-user-roles-lg pb-2.5 border-b border-gr-400">
            <BtnTableTitle label="Role" noOrder />
            <BtnTableTitle
              label="Create JCB Accounts"
              justify="center"
              noOrder
            />
            <BtnTableTitle
              label="Create Tester account"
              justify="center"
              noOrder
            />
          </div>
          <TableRowUserRoles
            key={0}
            data={[usersRole['0'] ? usersRole['0'] : 'None', true, false]}
          />
          <TableRowUserRoles
            key={1}
            data={[usersRole['1'] ? usersRole['1'] : 'None', false, true]}
          />
          {user?.userRoleId !== 0 && user?.userRoleId !== 1 && (
            <>
              <TableRowUserRoles
                key={2}
                data={[usersRole['2'] ? usersRole['2'] : 'None', false, true]}
              />
              <TableRowUserRoles
                key={3}
                data={[usersRole['3'] ? usersRole['3'] : 'None', false, false]}
              />
              <TableRowUserRoles
                key={4}
                data={[usersRole['4'] ? usersRole['4'] : 'None', false, false]}
              />
            </>
          )}
        </div>
      ) : (
        <div className="justify-center">
          <Spinner isLoading />
        </div>
      )}
    </>
  );
}
