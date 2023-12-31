import BtnTableTitle from '@/components/btnTableTitle';
import FeedbackMsg from '@/components/feedbackMsg';
import { IcoArwPull } from '@/components/icons';
import InputSearch from '@/components/inputSearch';
import InputSelect from '@/components/inputSelect';
import Spinner from '@/components/spinner';
import TableRowTesterAccount from '@/components/tableRowTesterAccount';
import TextH1 from '@/components/textH1';
import TextH3 from '@/components/textH3';
import { fetcher, postFetcher } from '@/lib/fetcher';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import TablePaginate from './tablePaginate';

export default function TesterAccounts({ user }) {
  const defaultFeedback = { isFeedback: false, message: '', type: '' };
  const router = useRouter();
  const [feedback, setFeedback] = useState(defaultFeedback);
  const [sort, setSort] = useState({ isSorted: false, by: '' });
  const [list, setList] = useState(null);
  const [filteredList, setFilteredList] = useState(null);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [start, setStart] = useState(0);
  const [tableCurrentItem, setTableCurrentItem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFeedBack = feedBack =>
    window.scrollTo(0, 0) & setFeedback(feedBack);

  const handleOnPageChange = ({ selected }) => {
    setPage(selected);
    setStart(selected * itemPerPage);
  };

  const handleItemPerPage = value => {
    setItemPerPage(parseInt(!value.match('all') ? value : list.length), 10);
    setPage(0);
    setStart(0);
  };

  const sortBy = value => {
    if (sort?.by === value) {
      setList(list.reverse());
    } else {
      setList(
        list.sort((a, b) =>
          a[value] >= b[value] ? 1 : a[value] <= b[value] ? -1 : 0
        )
      );
    }
    return setSort({ isSorted: true, by: value });
  };

  const filterData = value => {
    setFilter(value);
    setFilteredList([
      ...list.filter(
        companyUser =>
          (companyUser?.fullName &&
            companyUser.fullName.toLowerCase().includes(value.toLowerCase())) ||
          (companyUser?.companyName &&
            companyUser.companyName
              .toLowerCase()
              .includes(value.toLowerCase())) ||
          (companyUser?.operatorId &&
            companyUser.operatorId
              .toLowerCase()
              .includes(value.toLowerCase())) ||
          (companyUser?.userId &&
            companyUser.userId.toLowerCase().includes(value.toLowerCase())) ||
          (companyUser?.email &&
            companyUser.email.toLowerCase().includes(value.toLowerCase()))
      ),
    ]);
  };

  useEffect(() => setSort({ ...sort, isSorted: false }), [sort?.isSorted]);

  const jcbUsersRes = useSWR('/jcb/getAllUsers', postFetcher());
  const jcbUsersRoleRes = useSWR('/jcb/getUsersRole', postFetcher());

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

  // const users = useMemo(() => {
  //   if (jcbUsersRes?.data) {
  //     setList(
  //       jcbUsersRes?.data?.result?.users.filter(
  //         user => [3, 4].includes(user.userRoleId) && user
  //       )
  //     );
  //     return jcbUsersRes?.data?.result?.users.filter(
  //       user => [3, 4].includes(user.userRoleId) && user
  //     );
  //   }

  //   if (jcbUsersRes?.error) {
  //     handleFeedBack({
  //       isFeedback: true,
  //       message: 'Ops! error loading user roles.',
  //       type: 'error',
  //     });
  //   }

  //   return null;
  // }, [jcbUsersRes?.data?.result?.users, jcbUsersRes?.error]);

  const {
    data: dataOpUsers,
    error: errorOpUsers,
    mutate: mutateJCBUsers,
  } = useSWR('/jcb/getOpUsers', fetcher, {
    revalidateOnFocus: true,
  });

  useMemo(() => {
    setLoading(true);
    if (!!dataOpUsers?.result) {
      setList(dataOpUsers.result.users);
    }
    if (errorOpUsers) {
      setList([]);
      if (errorOpUsers?.response?.data?.rtnCode === '9897') {
        router.reload();
      }
      localStorage.setItem('isIdle', false);
    }
    setLoading(false);
  }, [dataOpUsers, errorOpUsers]);

  return (
    <>
      {feedback.isFeedback ? (
        <FeedbackMsg type={feedback.type} text={feedback.message} />
      ) : null}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4">
        <TextH1 text="Operator Accounts" />
        <InputSearch
          onChange={e => filterData(e.target.value)}
          placeholder="Operator Accounts"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mb-6 lg:mb-4">
        <div className="flex items-center gap-2">
          <div className="relative text-b-600">
            <IcoArwPull className="absolute top-2.5 right-2.5 w-3 h-3 fill-current" />
            <InputSelect onChange={e => handleItemPerPage(e.target.value)}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value="all">All</option>
            </InputSelect>
          </div>
          <TextH3 text="Entries / page" style="text-sm" />
        </div>
        <div className="lg:hidden">
          <InputSelect
            onChange={e => sortBy(e.target.value)}
            id="sel1"
            name="selSort"
          >
            <option selected={sort.by.match('')} value="">
              Sort By
            </option>
            <option selected={sort.by.match('companyName')} value="companyName">
              Company
            </option>
            <option selected={sort.by.match('operatorId')} value="operatorId">
              Operator ID
            </option>
            <option selected={sort.by.match('userId')} value="userId">
              User ID
            </option>
            <option selected={sort.by.match('fullName')} value="fullName">
              Full Name
            </option>
            <option selected={sort.by.match('email')} value="email">
              Email
            </option>
            <option selected={sort.by.match('component')} value="component">
              Component
            </option>
            <option
              selected={sort.by.match('protocolVersion')}
              value="protocolVersion"
            >
              Protocol Version #
            </option>
          </InputSelect>
        </div>
      </div>
      <div className="overflow-auto mb-4">
        <div className="mb-2" style={{ minWidth: '1200px' }}>
          <div className="grid grid-cols-user-tester-account pb-2.5 border-b border-gr-400">
            <BtnTableTitle
              onClick={() => sortBy('companyName')}
              active={sort.by.match('companyName')}
              label="Company"
            />
            <BtnTableTitle
              onClick={() => sortBy('operatorId')}
              active={sort.by.match('operatorId')}
              label="Operator ID"
            />
            <BtnTableTitle
              onClick={() => sortBy('userId')}
              active={sort.by.match('userId')}
              label="User ID"
            />
            <BtnTableTitle
              onClick={() => sortBy('fullName')}
              active={sort.by.match('fullName')}
              label="Full Name"
            />
            <BtnTableTitle
              onClick={() => sortBy('email')}
              active={sort.by.match('email')}
              label="Email"
            />
            <BtnTableTitle
              onClick={() => sortBy('component')}
              active={sort.by.match('component')}
              label="Component"
            />
            {user && user.userRoleId !== 0 ? (
              <BtnTableTitle
                onClick={() => sortBy('protocolVersion')}
                active={sort.by.match('protocolVersion')}
                label="Protocol Version #"
              />
            ) : (
              <BtnTableTitle
                onClick={() => sortBy('protocolVersion')}
                active={sort.by.match('protocolVersion')}
                label="Protocol Version #"
                justify="center"
              />
            )}
            {user && user.userRoleId !== 0 && (
              <BtnTableTitle label="Edit" justify="right" noOrder />
            )}
          </div>
          {filter !== '' ? (
            filteredList
              .map((tester, index) => (
                <TableRowTesterAccount
                  key={`testerRow-${index}`}
                  data={[
                    `${tester.companyName}`,
                    `${tester.operatorId}`,
                    `${tester.userId}`,
                    `${tester.fullName}`,
                    `${tester.email}`,
                    tester.component ? `${tester.component}` : `??????????`,
                    tester.protocolVersion
                      ? `${tester.protocolVersion}`
                      : `??????????`,
                  ]}
                  onEdit={
                    user && user.userRoleId !== 0
                      ? () =>
                          router.push(
                            `/user-management/tester/edit/${tester.id}`
                          ) & setTableCurrentItem(tester.id)
                      : null
                  }
                  isLoading={tester.id === tableCurrentItem}
                />
              ))
              .slice(start, start + itemPerPage)
          ) : list ? (
            list
              .map((tester, index) => (
                <TableRowTesterAccount
                  key={`testerRow-${index}`}
                  data={[
                    `${tester.companyName}`,
                    `${tester.operatorId}`,
                    `${tester.userId}`,
                    `${tester.fullName}`,
                    `${tester.email}`,
                    tester.component ? `${tester.component}` : `??????????`,
                    tester.protocolVersion
                      ? `${tester.protocolVersion}`
                      : `??????????`,
                  ]}
                  onEdit={
                    user && user.userRoleId !== 0
                      ? () =>
                          router.push(
                            `/user-management/tester/edit/${tester.id}`
                          ) & setTableCurrentItem(tester.id)
                      : null
                  }
                  isLoading={tester.id === tableCurrentItem}
                />
              ))
              .slice(start, start + itemPerPage)
          ) : (
            <div className="animate-pulse mt-10 text-center">
              <Spinner isLoading />
            </div>
          )}
        </div>
      </div>
      {list ? (
        <TablePaginate
          initialPage={page}
          pageCount={
            filter === '' && list
              ? list.length / itemPerPage
              : filteredList.length / itemPerPage
          }
          onPageChange={handleOnPageChange}
        />
      ) : null}
      {/* {user?.userRoleId !== 0 && (
        <Btn
          onClick={() =>
            setLoading(true) & Router.push('/user-management/tester/add')
          }
          label="add tester"
          ico={loading ? 'spinner' : 'add-user'}
          xtra="mb-4 w-full md:w-auto"
          secondary
        />
      )} */}
    </>
  );
}
