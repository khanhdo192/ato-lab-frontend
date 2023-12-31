import React, { useState } from 'react';
import Nav from '@/components/nav';
import Header from '@/components/header';
import UserThumb from '@/components/userThumb';
import Footer from '@/components/footer';
import BtnUp from '@/components/btnUp';
import Breadcrumb from '@/components/breadcrumb';
import BreadcrumbItem from '@/components/breadcrumbItem';
import Container from '@/components/container';
import StaffAccounts from '@/components/staffAccounts';
import TesterAccounts from '@/components/testerAccounts';
import UserRoles from '@/components/userRoles';

export default function UserManagementPage({ user }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

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
            <BreadcrumbItem label="user management" fontSize="text-base" />
          </Breadcrumb>
          <UserThumb alt={!!user ? user.fullName : ''} />
        </Header>
        <section>
          <Container>
            <UserRoles user={user} />
          </Container>
          {user && user.userRoleId === 0 && (
            <div>
              <Container>
                <StaffAccounts user={user} />
              </Container>
            </div>
          )}
          {user &&
            (user.userRoleId === 0 ||
              user.userRoleId === 1 ||
              user.userRoleId === 2) && (
              <Container>
                <TesterAccounts user={user} />
              </Container>
            )}
        </section>
        <Footer />
        <BtnUp />
      </div>
    </main>
  );
}
