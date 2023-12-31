import React from 'react'

import Nav from '../../components/nav'
import Header from '../../components/header'
import UserThumb from '../../components/userThumb'

import Footer from '../../components/footer'
import BtnUp from '../../components/btnUp'

import Breadcrumb from '../../components/breadcrumb'
import BreadcrumbItem from '../../components/breadcrumbItem'

export default function ProductProvidersPage({props}) {

  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  return (
    <main className="relative flex w-full min-h-screen 2xl:min-h-main m-auto max-w-1688 2xl:my-8 2xl:pl-8">
      
      {/*  Sidebar  */}
      <Nav status={isSideBarOpen} setStatus={setIsSideBarOpen} activeSection={'product-providers'} />
      
      {/*  Content  */}
      <div className="relative z-0 w-full p-2 pt-20 lg:pt-2 lg:ml-menu-lg 2xl:ml-menu 2xl:ml-0 py:0 lg:px-8">

        <Header setStatus={setIsSideBarOpen}>
        
          {/*  Breadcrumbs  */}
          
          <Breadcrumb>
            <BreadcrumbItem isFirst label="dashboard" />
            <BreadcrumbItem label="product providers" />
          </Breadcrumb>
          
          {/*  User info  */}
          
          <div>
            {/* User UI  */}
            <UserThumb img="/images/user-fake.jpg" alt="Eddie Huang" />
          </div>
        </Header>

        <Footer />
        
        <BtnUp />
        
      </div>
    </main>
  )
}
