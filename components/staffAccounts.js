import Btn from '@/components/btn';
import BtnTableTitle from '@/components/btnTableTitle';
import FeedbackMsg from '@/components/feedbackMsg';
import { IcoArwPull } from '@/components/icons';
import InputSearch from '@/components/inputSearch';
import InputSelect from '@/components/inputSelect';
import Spinner from '@/components/spinner';
import TableRowUserStaff from '@/components/tableRowUserStaff';
import TextH1 from '@/components/textH1';
import TextH3 from '@/components/textH3';
import { fetcher, postFetcher } from '@/lib/fetcher';
import Router, { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import TablePaginate from './tablePaginate';

export default function Staffaccounts({ user }) {
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
      setList(list?.reverse());
    } else {
      setList(
        list?.sort((a, b) =>
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
        user =>
          (user?.fullName &&
            user.fullName.toLowerCase().includes(value.toLowerCase())) ||
          (user?.email &&
            user.email.toLowerCase().includes(value.toLowerCase())) ||
          (user?.title &&
            user.title.toLowerCase().includes(value.toLowerCase())) ||
          (user?.dept && user.dept.toLowerCase().includes(value.toLowerCase()))
      ),
    ]);
  };

  useEffect(() => setSort({ ...sort, isSorted: false }), [sort?.isSorted]);

  const jcbUsersRoleRes = useSWR('/jcb/getUsersRole', postFetcher());

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
      if (jcbUsersRoleRes?.error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      localStorage.setItem('isIdle', false);
    }

    return null;
  }, [jcbUsersRoleRes?.data?.result?.usersRole, jcbUsersRoleRes?.error]);

  const {
    data: dataJCBUsers,
    error: errorJCBUsers,
    mutate: mutateJCBUsers,
  } = useSWR('/jcb/getJCBUsers', fetcher, {
    revalidateOnFocus: true,
  });

  useMemo(() => {
    setLoading(true);
    if (!!dataJCBUsers?.result) {
      setList(dataJCBUsers.result.users);
    }
    if (errorJCBUsers) {
      setList([]);
      if (errorJCBUsers?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      localStorage.setItem('isIdle', false);
    }
    setLoading(false);
  }, [dataJCBUsers, errorJCBUsers]);

  return (
    <>
      {feedback.isFeedback ? (
        <FeedbackMsg type={feedback.type} text={feedback.message} />
      ) : null}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4">
        <TextH1 text="JCB" highliteText="Staff Accounts" />
        <InputSearch
          onChange={e => filterData(e.target.value)}
          placeholder="Search Staff Accounts"
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
            <option selected={sort.by.match('fullName')} value="fullName">
              Full Name
            </option>
            <option selected={sort.by.match('email')} value="email">
              Email
            </option>
            <option selected={sort.by.match('userRoleId')} value="userRoleId">
              Role
            </option>
          </InputSelect>
        </div>
      </div>
      <div className="overflow-auto mb-4">
        <div className="mb-2" style={{ minWidth: '1200px' }}>
          <div className="grid grid-cols-user-staff pb-2.5 border-b border-gr-400">
            <BtnTableTitle
              onClick={() => sortBy('fullName')}
              label="Full Name"
              active={sort.by.match('fullName')}
            />
            <BtnTableTitle
              onClick={() => sortBy('email')}
              label="Email"
              active={sort.by.match('email')}
            />
            {user && user.userRoleId === 0 ? (
              <BtnTableTitle
                onClick={() => sortBy('userRoleId')}
                label="Role"
                active={sort.by.match('userRoleId')}
              />
            ) : (
              <BtnTableTitle
                onClick={() => sortBy('userRoleId')}
                label="Role"
                active={sort.by.match('userRoleId')}
                justify="right"
              />
            )}
            {user && user.userRoleId === 0 && (
              <BtnTableTitle label="Edit" justify="right" noOrder />
            )}
          </div>
          {filter !== '' ? (
            filteredList
              .map(staff => (
                <TableRowUserStaff
                  data={[
                    `${staff.fullName}`,
                    `${staff.companyName}`,
                    `${staff.title}`,
                    `${staff.dept}`,
                    `${staff.email}`,
                    `${usersRole[`${staff.userRoleId}`]}`,
                  ]}
                  onEdit={
                    user && user.userRoleId === 0
                      ? () =>
                          router.push(
                            `/user-management/staff/edit/${staff.id}`
                          ) & setTableCurrentItem(staff.id)
                      : null
                  }
                  isLoading={staff.id === tableCurrentItem}
                />
              ))
              .slice(start, start + itemPerPage)
          ) : list && usersRole ? (
            list
              .map(staff => (
                <TableRowUserStaff
                  data={[
                    `${staff.fullName}`,
                    `${staff.companyName}`,
                    `${staff.title}`,
                    `${staff.dept}`,
                    `${staff.email}`,
                    `${usersRole[`${staff.userRoleId}`]}`,
                  ]}
                  onEdit={
                    user && user.userRoleId === 0
                      ? () =>
                          router.push(
                            `/user-management/staff/edit/${staff.id}`
                          ) & setTableCurrentItem(staff.id)
                      : null
                  }
                  isLoading={staff.id === tableCurrentItem}
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
      {user?.userRoleId === 0 && (
        <Btn
          onClick={() =>
            setLoading(true) & Router.push('/user-management/staff/add')
          }
          label="add Staff"
          ico={loading ? 'spinner' : 'add-user'}
          xtra="mb-4 w-full md:w-auto"
          secondary
        />
      )}
    </>
  );
}
