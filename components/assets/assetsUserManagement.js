import React from 'react';

import Spinner from '../components/spinner'

import { IcoDash } from '../components/icons'

import TextH1 from '../components/textH1'
import TextH2 from '../components/textH2'

import Divider from '../components/divider'

import Btn from '../components/btn'
import BtnUp from '../components/btnUp'
import BtnTableTitle from '../components/btnTableTitle'

import TableRowUserRoles from '../components/tableRowUserRoles'
import TableRowUserStaff from '../components/tableRowUserStaff'
import TableRowCompAccount from '../components/tableRowCompAccount'

import InputSearch from '../components/inputSearch'
import InputSelect from '../components/inputSelect'

import Container from '../components/container'
import ContainerCol_2_1 from '../components/containerCol_2_1'

export default function AssetsUserManagement() {

  return (
    <main className="flex w-full min-h-screen 2xl:min-h-main m-auto max-w-screen-2xl 2xl:my-8">
    
      
      {/*  Content  */}
      <div className="w-full p-2 lg:py:0 lg:px-8">

        
        {/*  Content per PAGE  */}
        <section>

          <Container>
            {/* Title + subtitles */}
            <TextH1 text="JCB" highliteText="User Roles" />
            <TextH2 text="Define your own role by customizing the access permission to each portal function." isInfo/>
            
            <Divider style="hidden lg:block" />
            
            
            {/*  TABLE ROLES  */}
            
            <div className="mt-8 lg:mt-0 mb-16">
              {/* table titles row */ }
              <div className="grid grid-cols-2 lg:grid-cols-user-roles pb-2.5 border-b border-gr-400">
                  <div className="hidden lg:block">
                   <BtnTableTitle label="Role" noOrder />
                  </div>
                  <BtnTableTitle label="Create JCB Accounts" noOrder justify="center" />
                  <BtnTableTitle label="Create Tester account" noOrder justify="center" />
              </div>
               {/* table rows */ }
              <TableRowUserRoles data={["administrator", true, false]} />
              <TableRowUserRoles data={["TPP Manager",false, true]} />
              <TableRowUserRoles data={["Implementation Manager", false, true]} />
            </div>
            
            {/*  STAFF */}
            
            <div className="flex flex-col lg:flex-row justify-between">
              <TextH1 text="JCB" highliteText="Staff Accounts" />
              
              <InputSearch placeholder="Search Staff Accounts" />
            </div>
            
            <div className="mt-4 -mb-2">
                {/*  Sort BY  */}
                <div className="lg:hidden">
                  <InputSelect id="sel1" name="selSort">
                    	<option defaultValue="">Sort By</option>
                    	<option defaultValue="">Full Name</option>
                    	<option defaultValue="">Title</option>
                    	<option defaultValue="">Dept.</option>
                    	<option defaultValue="">Email</option>
                    	<option defaultValue="">User Name</option>
                    	<option defaultValue="">Role</option>
                  </InputSelect>
                </div>
            </div>
            
            {/*  TABLE STAFFS  */}
            
            <div className="mt-8 mb-8">
              {/* table titles row */ }
              <div className="hidden lg:grid grid-cols-user-staff pb-2.5 border-b border-gr-400">
                  <BtnTableTitle label="Full Name" active />
                  <BtnTableTitle label="Title" />
                  <BtnTableTitle label="Dept." />
                  <BtnTableTitle label="Email" />
                  <BtnTableTitle label="User Name" />
                  <BtnTableTitle label="Password" />
                  <BtnTableTitle label="Role" />
                  <BtnTableTitle label="Edit" justify="right" />
              </div>
               {/* table rows */ }
              <TableRowUserStaff data={["Hiroshi Abe", "Vice President", "R&D", "ha@jcb.com", "hiroshiabe", "********", "Administrator"]} />
              <TableRowUserStaff data={["Hiroshi Aka Abe", "CEO", "R&D", "hakaabe@jcb.com", "hiroshiakaabe", "********", "Limited actions example"]} />
            </div>
            
            <Btn label="add Staff" ico="add-user" xtra="mb-4 w-full md:w-auto" secondary />

          </Container>
          
          <Container>
          
             {/*  COMPANY */}
            
            <div className="flex flex-col lg:flex-row justify-between">
              <TextH1 text="Company Accounts" />
              
              <InputSearch placeholder="Company Accounts" />
            </div>
            
            <div className="mt-4 -mb-2">
                {/*  Sort BY  */}
                <div className="lg:hidden">
                  <InputSelect id="sel1" name="selSort">
                    	<option defaultValue="">Sort By</option>
                    	<option defaultValue="">Company</option>
                    	<option defaultValue="">Full Name</option>
                    	<option defaultValue="">Title</option>
                    	<option defaultValue="">Dept.</option>
                    	<option defaultValue="">Email</option>
                    	<option defaultValue="">User Name</option>
                    	<option defaultValue="">Component</option>
                    	<option defaultValue="">EMVCo Registration #</option>
                  </InputSelect>
                </div>
            </div>

            
            {/*  TABLE COMPANY ACCOUNTS  */}
            
            <div className="mt-8 mb-8">
              {/* table titles row */ }
              <div className="hidden lg:grid grid-cols-comp-account pb-2.5 border-b border-gr-400">

                  <BtnTableTitle label="Company" active />
                  <BtnTableTitle label="Customer Type" />
                  <BtnTableTitle label="Full Name" />
                  <BtnTableTitle label="Title" />
                  <BtnTableTitle label="Dept." />
                  <BtnTableTitle label="Email" />
                  <BtnTableTitle label="User Name" />
                  <BtnTableTitle label="Password" />
                  <BtnTableTitle label="Component" />
                  <BtnTableTitle label="EMVCo Registration #" />
                  <BtnTableTitle label="Edit" justify="right" />
                  
                  
              </div>
               {/* table rows */ }
               
               {/* When loaded  */}
                <TableRowCompAccount data={["Takeshi inc.", "implementation", "Takeshi Kaneshiro", "Manager", "R&D", "ha@jcb.com", "hiroshiabe", "********", "ACS", "ABCD.A 12 1234"]} />
                <TableRowCompAccount data={["Michael Bank inc.", "TPP",  "Takeshi Kaneshiro", "Manager", "R&D", "ha@jcb.com", "hiroshiabe", "********", "ACS", "ABCD.A 12 1234"]} /> 
             
              {/* if loading rows data
               <div className="my-6">
                  <Spinner />
               </div> */}
            </div>
            
            <Btn label="add tester" ico="add-user" xtra="mb-4 w-full md:w-auto" secondary />

          </Container>
            
  
        </section>
        
        <BtnUp />
        
      </div>
    </main>
  )
}
