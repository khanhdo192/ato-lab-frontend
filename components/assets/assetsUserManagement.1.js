import React from 'react';

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
            
            <div className="mt-8 lg:mt-0 mb-8">
              {/* table titles row */ }
              <div className="grid grid-cols-user-roles lg:grid-cols-user-roles-lg pb-2.5 border-b border-gr-400">
                  <div className="hidden lg:block">
                   <BtnTableTitle label="Role" noOrder />
                  </div>
                  <BtnTableTitle label="Companies" noOrder justify="center" />
                  <BtnTableTitle label="SLA Management" noOrder justify="center" />
                  <BtnTableTitle label="User Management" noOrder justify="center" />
                  <div className="hidden lg:flex justify-end">
                    <BtnTableTitle label="Edit" noOrder justify="right" />
                  </div>
              </div>
               {/* table rows */ }
              <TableRowUserRoles data={["administrator", true, true, true]} />
              <TableRowUserRoles data={["Limited actions example", true, false, false]} />
            </div>
            
            
            <Btn label="Define new role" ico="user-manage" xtra="mb-16 lg:mb-12 w-full md:w-auto" />
            
            <Divider />
            
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
              <TableRowCompAccount data={["JCB 1", "Takeshi Kaneshiro", "Manager", "R&D", "ha@jcb.com", "hiroshiabe", "********", "ACS", "ABCD.A 12 1234"]} />
             <TableRowCompAccount data={["JCB 2", "Takeshi Kaneshiro", "Manager", "R&D", "ha@jcb.com", "hiroshiabe", "********", "ACS", "ABCD.A 12 1234"]} />
            </div>
            
            <Btn label="add tester" ico="add-user" xtra="mb-4 w-full md:w-auto" secondary />

          </Container>
            
  
        </section>
        
        <BtnUp />
        
      </div>
    </main>
  )
}
