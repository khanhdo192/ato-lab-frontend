import React from 'react';

import NavItem from '@/navItem'
import { IcoDash } from '@/icons'

import TextH1 from '@/textH1'
import TextH2 from '@/textH2'
import TextH3 from '@/textH3'
import TextH4 from '@/textH4'
import TextH5 from '@/textH5'

import Divider from '@divider'

import InputSelect from '@/inputSelect'

import HomeTableStatus from '@/homeTableStatus'
import HomeTableStages from '@/homeTableStages'

import HomeHighlite from '@/homeHighlite'
import HomeHighliteItem from '@/homeHighliteItem'

import BtnTable from '@/btnTable'
import BtnAction from '@/btnAction'
import BtnStep from '@/btnStep'
import BtnPage from '@/btnPage'
import BtnUp from '@/btnUp'
import Btn from '@/btn'

import BtnTableTitle from '@/btnTableTitle'
import TableRowProjectLog from '@/tableRowProjectLog'
import TableRowSwitchs4 from '@/tableRowSwitchs4'
import TableRowSwitchs3 from '@/tableRowSwitchs3'

import FormItemInput from '@/formItemInput'
import FormItemSelect from '@/formItemSelect'
import FormItemUpload from '@/formItemUpload'
import FormItemCheckbox from '@/formItemCheckbox'
import FormItemRadio from '@/formItemRadio'
import FormItemTextarea from '@/formItemTextarea'

import Switch from '@/switch'
import SwitchGroup from '@/switchGroup'

import Container from '@/container'
import ContainerCol_3 from '@/containerCol_3'
import ContainerCol_2 from '@/containerCol_2'
import ContainerCol_1_2 from '@/containerCol_1_2'
import ContainerCol_2_1 from '@/containerCol_2_1'

import FeedbackMsg from '@/feedbackMsg'
import Spinner from '@/spinner'


import Instructions from '@/instructions'
import InstructionsItem from '@/instructionsItem'
import InstructionsSubitem from '@/instructionsSubitem'

export default function IndexPage() {

  return (
    <main className="flex w-full min-h-screen 2xl:min-h-main m-auto max-w-screen-2xl 2xl:my-8">
    
      
      {/*  Content  */}
      <div className="w-full p-2 lg:py:0 lg:px-8">

        
        {/*  Content per PAGE  */}
        <section>
          {/* 3 cols template  */}
          <ContainerCol_3>
          
            {/* Home Server highlite  */}
            <HomeHighlite title="3Ds Servers" />
            
            <Container>
            
            {/* Section Titles  */}
             <TextH1 text="Total Active Services" />
             
             <div className="pt-2 space-y-3">
                <HomeHighliteItem val="2" label="Profiles Submitted" variation="1" />
                <HomeHighliteItem val="1" label="Profiles Under Review" />
                <HomeHighliteItem val="0" label="Results Submitted" />
                <HomeHighliteItem val="3" label="Results Under Review" variation="2" />
                <HomeHighliteItem val="1" label="Products Under Approval" variation="-1" />
             </div>
            </Container>
            
            <Container xtra="bg-b-800">
              <NavItem label="Add Product" ico="add-product" />
              <NavItem label="Subscriptions" ico="subscriptions" />
              <NavItem label="SLA Management" ico="sla-manage" />
            </Container>
            
          </ContainerCol_3>
          
          <ContainerCol_2>
            <Container>
              {/* Title + subtitles */}
              <TextH1 text="Product Validation" highliteText="BPC AG" />
              <TextH2 text="Copy or Export data to CSV, PDF & Print" isInfo/>
              <br/>
              <TextH3 text="info for UI forms"/>
              
              <div className="my-3">
                <FormItemCheckbox id="c1" name="c" value="1" label="check 1" isChequed isDisabled />
                <FormItemCheckbox id="c2" name="c" value="2" label="check 2" />
                <FormItemCheckbox id="c3" name="c" value="3" label="check 3"  />
                <FormItemCheckbox id="c4" name="c" value="4" label="check 4" />
              </div>
              <Divider/>
              <div className="my-3">
                <FormItemRadio id="r1" name="r" value="1" label="Radio 1" />
                <FormItemRadio id="r2" name="r" value="2" label="Radio 2" />
                <FormItemRadio id="r3" name="r" value="3" label="Radio 3" />
              </div>
            </Container>
            
            <Container>
              <ContainerCol_2>
              
                <div>
                <TextH1 text="Status - " highliteText="ALL" />
              
                   <div className="mb-6 space-y-3">
                   
                        { /* Status all */ }
  
                        <HomeTableStatus statusId="0" />
                        
                        <HomeTableStatus statusId="1" />
                        
                        <HomeTableStatus statusId="2" />
                        
                        <HomeTableStatus statusId="3" />
                        
                        <HomeTableStatus statusId="4" />
                        
                        <HomeTableStatus statusId="5" />
                  </div>
                  
                  <TextH1 text="Stages - " highliteText="ALL" />
                  
                  <div className="mb-6 space-y-3">
                   
                        { /* Stages all */ }
  
                        <HomeTableStages stageId="0" />
                        
                        <HomeTableStages stageId="1" />
                        
                        <HomeTableStages stageId="2" />

                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 md:gap-2">
                  <Spinner isLoading />
                  <Spinner isLoading color="text-b-200" />
                  <Spinner isLoading color="text-gr-300" />
                  <Spinner isLoading color="text-b-320" />
                </div>
                
              </ContainerCol_2>
            </Container>
          </ContainerCol_2>
          
          { /* STEP 1  */}
          
          <Container>
          
           {/* Title + subtitles */}
              
          <TextH1 text="Product Validation" highliteText="BPC AG" />

          <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-3">
            <TextH2 text="Session: 01" />
            <TextH2 text="|" style="hidden md:block" />
            <TextH2 text="EMVCo Registration Number: BPBT.V 18 0061" />
            <TextH2 text="|" style="hidden md:block" />
            <TextH2 text="TPP" />
          </div>
          
          <Divider />
          
          {/*
            <div className="flex flex-col lg:flex-row justify-between">
              <TextH1 text="Session" highliteText="1000" />
              <TextH1 text="EMVCo Registration Number" highliteText="77" />
            </div>
          */}
            
            <div className="flex space-x-2 lg:space-x-4 mb-4">
            
              <BtnStep label="Review Product information" step="1" status="green" isActive />
              
              <BtnStep label="Confidence Test Review" step="2" status="red" />
              
              <BtnStep label="Confidence Test Review" step="3" isDisable />
           </div>
           
           
           <ContainerCol_1_2>
            <Container hasBorder>
            
            <TextH4 text="Iterations: 5" />
            <TextH4 text="Status:" />
            
            {/*  select  */}
            <FormItemSelect id="sel1" name="selEngineer" label="Assign Enginner">
              	<option defaultValue="">John Smith</option>
              	<option defaultValue="">Robe Keene</option>
            </FormItemSelect>
            
            {/*  select  */}
            <FormItemSelect id="sel2" name="selStatus" label="Update Status" isDisabled>
              	<option defaultValue="">Reviweing Profile</option>
              	<option defaultValue="">Self-test</option>
            </FormItemSelect>
            
            <FormItemInput id="fi0" label="Tracking Number" value="0123456789" />
                  
            <Btn label="Edit" ico="edit" />
            
            
            </Container>
            
            <Container hasBorder>
              <TextH4 text="Operator information" />
              
              <ContainerCol_2>
                <FormItemInput id="fi1" label="3DS Server Operator ID" value="333333" error errorMsg="Wrong Operator ID" />
                <FormItemInput id="fi2" label="Acquierer Merchant ID" placeholder="0123456789" />
              </ContainerCol_2>
              
              <ContainerCol_2>
                <FormItemInput id="fi3" label="Merchant Category Code" value="0123456789" isDisabled />
                <FormItemInput id="fi4" label="Merchant Country Code" />
              </ContainerCol_2>
              
              <div className="flex justify-between mt-6 lg:mt-0">
                <TextH4 text="Project Log" />
                
                {/*  Sort BY  */}
                <div className="lg:hidden -mt-1">
                  <InputSelect id="sel2" name="selSort">
                    	<option defaultValue="">Sort By</option>
                    	<option defaultValue="">Product Name</option>
                    	<option defaultValue="">Company</option>
                    	<option defaultValue="">Product</option>
                    	<option defaultValue="">Tracking#</option>
                    	<option defaultValue="">Status</option>
                    	<option defaultValue="">SLA</option>
                    	<option defaultValue="">Time</option>
                    	<option defaultValue="">Owner</option>
                    	<option defaultValue="">Action</option>
                  </InputSelect>
                </div>
              </div>
              
              
              {/*  Grid Table 7 cols  */}
              <div className="mb-6">
                {/* table titles row */ }
                <div className="hidden lg:grid grid-cols-log-table pb-2.5 border-b border-gr-400">
                    <BtnTableTitle label="Role" active />
                    <BtnTableTitle label="Name"  />
                    <BtnTableTitle label="Date"  />
                    <BtnTableTitle label="Time"  />
                    <BtnTableTitle label="Staff" />
                    <BtnTableTitle label="Status" />
                    <BtnTableTitle label="Tracking#" />
                    <BtnTableTitle label="Uploaded" justify="center"/>
                </div>
                 {/* table rows */ }
                 <TableRowProjectLog data={["User Role","User Name", "2020/12/20", "16:43:22", "John Smith", "0123456789"]} statusId={1} />
                 <TableRowProjectLog data={["User Role","User Name", "2020/12/20", "16:43:22", "John Smith", "0123456789"]} statusId={0} uploaded />
                 <TableRowProjectLog data={["User Role","User Name", "2020/12/20", "16:43:22", "John Smith", "0123456789"]} statusId={2} />
              </div>
            </Container>
           </ContainerCol_1_2>
          
          </Container>
          
          { /*  END STEP 01  */}
          
          { /* STEP 2  */}
          
          <Container>
          
           {/* Title + subtitles */}
              
          <TextH1 text="Product Validation" highliteText="BPC AG" />
          
          <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-3">
            <TextH2 text="Session: 01" />
            <TextH2 text="|" style="hidden md:block" />
            <TextH2 text="EMVCo Registration Number: BPBT.V 18 0061" />
            <TextH2 text="|" style="hidden md:block" />
            <TextH2 text="TPP" />
          </div>
          
          <Divider />

            <div className="flex space-x-2 lg:space-x-4 mb-4">
            
              <BtnStep label="Review Product information" step="1" status="green"  />
              
              <BtnStep label="Confidence Test Review" step="2" status="green" isActive />
              
              <BtnStep label="Approval" step="3" status="red"  />
           </div>
           
           
           <ContainerCol_1_2>
            <div>
              <Container hasBorder>
              
              <TextH4 text="Iterations: 2" />
              <TextH4 text="Status: ICS Approved" />
              
              <FormItemInput id="s2_1" label="Status*" value="ICS Approved" isDisabled />
              
              <FormItemInput id="s2_2" label="ICS Reference Number**" value="Reviweing Profile" isDisabled />
              
              <FormItemUpload id="fileInput1" label="Upload your Test Report" filename="e.g. test_file.ext" btnLabel="browse" />
              
              <Btn ico="edit" label="Update" />
            
              </Container>
              <div className="flex space-x-3 mt-5">
                <BtnAction label="review package" ico="download" color="bg-g-400"/>
                <BtnAction label="TEST PANEL" ico="view" color="bg-p-500"/>
              </div>
            </div>
            
            <Container hasBorder>
                <TextH4 text="Operator information" />
                <TextH2 text="Click on the data tabs to expand to expand and view instructions. For complete requirements consult latest EMVCo Admin Process documentation." isInfo style="-mt-1"/>
                
                <Divider />
                
                { /* set order-last lg:order-none  to ACTIVE  */ }
                <div className="flex flex-col lg:flex-row lg:space-x-2 mb-8">
                  <BtnTable label="OPERATIONS" secondary isActive xtra="w-full lg:w-auto mb-3 lg:mb-0 order-last lg:order-none" />
                  <BtnTable label="INITIAL SUBMISSION" secondary xtra="w-full lg:w-auto mb-3 lg:mb-0" />
                  <BtnTable label="REPLACEMENT SUBMISSION" secondary xtra="w-full lg:w-auto mb-3 lg:mb-0" />
                  <BtnTable label="NOTICES" secondary xtra="w-full lg:w-auto mb-3 lg:mb-0" />
                </div>
                
                <Instructions title="Laboratory Operations">
                
                  <InstructionsItem text="The Product Provider completes an Implementation Conformance Statement (ICS) with the chosen laboratory for each Product that it submits. The ICS format and content requirements are determined by EMVCo.">
                  </InstructionsItem>
                  
                  <InstructionsItem text="The Testing Laboratory supplies a copy of the Product Provider-supplied ICS to EMVCo for review prior to the start of the Compliance testing process, digitally signed by the Laboratory:">
                    <InstructionsSubitem text="As a result, EMVCo 3DS Approval Secretariat reviews and approves the form and provides back a unique ICS Reference Number" />
                    <InstructionsSubitem text="As a result, EMVCo 3DS Approval Secretariat reviews and approves the form and provides back a unique ICS Reference Number" />
                  </InstructionsItem>
                  
                </Instructions>

            </Container>
           </ContainerCol_1_2>
            
            
          </Container>
          
          { /*  END STEP 02  */}
          
          <Container>
            <TextH1 text="Issuer Test Card Declaration" />
            <Divider />
            
            <div className="columns-2 p mb-12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a tempor est. Nulla imperdiet luctus mi at suscipit. Aenean in odio tincidunt, mattis purus sed, facilisis sem. Maecenas ut vulputate diam, non volutpat dui. Curabitur vitae justo eget turpis porttitor consequat ut ac mauris. Quisque dignissim accumsan mi. Quisque aliquet, erat non sodales tristique, eros enim molestie Mauris imperdiet quam id tortor laoreet, a consequat felis elementum. Etiam posuere ex venenatis, ultricies est dictum, ullamcorper enim. Ut dapibus auctor erat, ac pharetra metus tempus et. Nulla vitae cursus ante, a vulputate lacus. Sed nibh justo, congue non mattis dapibus, hendrerit sed nibh. Praesent accumsan magna sit amet turpis scelerisque
            </div>
            
            <ContainerCol_3 xtra="mb-12">
              <FormItemInput id="CardA" label="Card A" value="765430270066942" />
              <FormItemInput id="CardB" label="Card B" value="765430270066942" />
              <FormItemInput id="CardC" label="Card C" value="765430270066942" />
              <FormItemInput id="CardD" label="Card D" value="765430270066942" />
              <FormItemInput id="CardE" label="Card E" value="765430270066942" />
              <FormItemInput id="CardF" label="Card F" value="765430270066942" />
            </ContainerCol_3>
            
            <TextH1 text="Operator Information for Acquier" />
            <Divider />
            
            <ContainerCol_2_1 xtra="mb-12">
              <ContainerCol_2>
                <FormItemInput id="A" label="3DS Server Operator ID" value="0123456789" />
                <FormItemInput id="B" label="Acquier Merchant ID" value="0123456789" />
                <FormItemInput id="C" label="Merchant Category Code" value="1234" />
                <FormItemInput id="D" label="Merchant Country Code" value="392" />
              </ContainerCol_2>
            </ContainerCol_2_1>
            
            <TextH1 text="Issuer Test Card Declaration" />
            <Divider />
            
            <ContainerCol_3 xtra=" mb-12">
              <Switch label="Decouple Authentification support" isActive />
              
              <Switch label="Issuer provide ACS Attemp" isDisable />

               { /* Switch Group  */  }
               <SwitchGroup title="Message Category wich issuer support" xtra="mt-4 lg:mt-0">
                  <Switch label="01-PA" isActive />
                  <Switch label="02-NPA" isActive  />
               </SwitchGroup>

            </ContainerCol_3>
            
            { /*  Switchs table    */}
            
            <TextH1 text="Supportes Transaction Types" />
            
            <Divider />
            
            {/* 4 Switchs table titles */ }
            <div className="grid grid-cols-4 lg:grid-cols-switchs-4 gap-0 border-b border-gr-400 mt-12 text-center">
                <div className="hidden lg:block" />
                <TextH5 text="01-APP (Native)" />
                <TextH5 text="01-APP (HTML)" />
                <TextH5 text="02-BRW" />
                <TextH5 text="03-3RI" />
            </div>
            {/* 4 Switchs ROWS  */}
            <TableRowSwitchs4 title="Device channel wich issuer support">
              <Switch isActive  xtra="m-n justify-center" />
              <Switch isActive  xtra="m-n justify-center" />
              <Switch isActive  xtra="m-n justify-center" />
              <Switch  xtra="m-n justify-center" />
            </TableRowSwitchs4>
            
             <TableRowSwitchs4 title="Supports Approval according to the Merchants decision">
              <Switch isActive  xtra="m-n justify-center" />
              <Switch isActive  xtra="m-n justify-center" />
              <Switch isActive  xtra="m-n justify-center" />
              <Switch isActive  xtra="m-n justify-center" />
            </TableRowSwitchs4>
            
            <TableRowSwitchs4 title="Supports accquier TRA">
              <Switch isActive  xtra="m-n justify-center" />
              <Switch isActive  xtra="m-n justify-center" />
              <Switch isActive  xtra="m-n justify-center" />
            </TableRowSwitchs4>
            
            
            {/* 3 Switchs table titles */ }
            <div className="grid grid-cols-3 lg:grid-cols-switchs-3 gap-0 border-b border-gr-400 mt-12 text-center">
                <div className="hidden lg:block" />
                <TextH5 text="01-APP (Native)" />
                <TextH5 text="01-APP (HTML)" />
                <TextH5 text="02-BRW" />
            </div>
            {/* 3 Switchs ROWS  */}
            <TableRowSwitchs3 title="Device channel wich issuer support">
              <Switch isActive  xtra="m-n justify-center" />
              <Switch isActive  xtra="m-n justify-center" />
              <Switch isActive  xtra="m-n justify-center" />
            </TableRowSwitchs3>
            
             <TableRowSwitchs3 title="Supports Approval according to the Merchants decision">
              <Switch isActive  xtra="m-n justify-center" />
              <Switch isActive  xtra="m-n justify-center" />
              <Switch isActive  xtra="m-n justify-center" />
            </TableRowSwitchs3>
            
            <TableRowSwitchs3 title="Supports accquier TRA">
              <Switch isActive  xtra="m-n justify-center" />
              <Switch isActive  xtra="m-n justify-center" />
              <Switch isActive  xtra="m-n justify-center" />
            </TableRowSwitchs3>
            
          </Container>
          
          <ContainerCol_3>
            <Container>
            
              <Switch label="Issuer provide RBA for all card members" isActive />
              
              <Switch label="Issuer provide ACS Attemp"  />
              
              <Switch label="Issuer provide ACS Attemp" isActive isDisable />
              
              <Switch label="Whitelisting support" isDisable />

            </Container>
            
            <Container>
            
              { /* Switch Group  */  }
              <SwitchGroup title="ACS UI Type wich issuer support">
                <Switch label="01 = Text" isActive />
                <Switch label="02 = Single Select" isActive  />
                <Switch label="03 = Multi Select"  />
              </SwitchGroup>
              
            </Container>
              
            <Container>
            
            { /* upload FILE  */}
            
            <FormItemUpload id="fileInput1" label="Upload your Test Report" filename="e.g. test_file.ext" btnLabel="browse" />
            
            <FormItemUpload id="fileInput2" label="Upload your Test Report" filename="e.g. test_file.ext" btnLabel="browse" error errorMsg="Wrong format" />

             <FormItemTextarea label="Textarea form" rows="4" maxlength="150" placeholder="Enter your comments for this ticket, limited to 150 characters (optional)" info="0/150" />
             
            </Container>
            
          </ContainerCol_3>
          
          <ContainerCol_3>
            <Container>
              <div className="flex flex-wrap gap-4">
                {/* Buttons on tables  */}
    
                <BtnTable label="Manage" />
                
                <BtnTable label="Manage" isDisable />
    
                {/* 100% on mobile */}
                <BtnTable label="Manage" xtra="w-full lg:w-auto" secondary />
    
                {/* 100% */}
                <BtnTable label="Manage" xtra="w-full" isActive />
    
                {/*  Paginado   */}
                <div className="flex justify-center lg:justify-end space-x-2">
                  <BtnPage label="left" />
                  <BtnPage label="1" isActive />
                  <BtnPage label="2" />
                  <BtnPage label="right" />
                </div>
              </div>
            </Container>
            
            <Container>
              <div className="space-y-4">
                <Btn label="Review Product Profile" ico="review" secondary />
                
                <Btn label="Review Product Profile" ico="review" secondary isDisable />
                
                <div className="flex space-x-4">
                  <Btn label="Cancel" secondary />
                  <Btn label="Submit" ico="submit" />
                </div>
              </div>
            </Container>
            
            <Container>
              <div className="space-y-4">
                {/* 100% */}
                <Btn label="I CONFIRM" xtra="w-full" />
                {/* 100% solo en mobile */}
                <Btn label="Profile Submitted" ico="submitted" secondary xtra="w-full lg:w-auto" />
                <Btn label="Test panel" ico="test" secondary />
                <Btn label="PROCEDURES" isActive xtra="w-full" />
                <Btn label="Review Package" ico="review" xtra="w-full lg:w-auto" secondary />
              </div>

            </Container>
          </ContainerCol_3>
          
          
          <ContainerCol_3>
            <Container>
              <TextH1 text="BtnAction all icos" />
              <div className="flex flex-wrap gap-4">

                <BtnAction label="copy" ico="copy" color="bg-y-400" />
                
                <BtnAction label="download" ico="download" color="bg-g-400" />
                <BtnAction label="complete" ico="complete" color="bg-g-400" />
                 <BtnAction label="play" ico="play" color="bg-g-400" />
                
                <BtnAction label="delete" ico="delete" color="bg-r-400" />
                <BtnAction label="stop" ico="stop" color="bg-r-400" />
                
                <BtnAction ico="delete" color="bg-r-400" />
                <BtnAction ico="stop" color="bg-r-400" />
               
                <BtnAction label="test" ico="test" color="bg-b-500" />
                <BtnAction label="review" ico="review" color="bg-b-500" />
                <BtnAction label="print" ico="print" color="bg-b-500" />
                
                <BtnAction label="restore" ico="restore" color="bg-p-500" />
                <BtnAction label="save" ico="save" color="bg-p-500" />
                <BtnAction label="manage" ico="manage" color="bg-p-500" isDisable />
                <BtnAction label="edit" ico="edit" color="bg-p-500" />
                <BtnAction  ico="edit" color="bg-p-500" />
                <BtnAction  ico="manage" color="bg-p-500" />
                <BtnAction label="view" ico="view" color="bg-p-500" />
                
              </div>
            </Container>
            
           <Container>
              <TextH1 text="Btn all icos" />
              <div className="flex flex-wrap gap-3">

                <Btn label="edit" ico="edit" />
                <Btn label="review" ico="review" />
                <Btn label="submit" ico="submit" />
                <Btn label="submitted" ico="submitted" />
                <Btn label="test" ico="test" />
                <Btn label="view" ico="view" />
                <Btn label="add-user" ico="add-user" />
                <Btn label="user-manage" ico="user-manage" />
                <Btn label="download" ico="download" />
                <Btn label="save" ico="save" />
                
              </div>
            </Container>
            
            <Container>
            </Container>
          </ContainerCol_3>
          
          
          <ContainerCol_2>
          
            <Container>
              <FeedbackMsg type="error" text="This is a message Error, please read it or I'll be sad" linkText="Click Here" link />
              
              <FeedbackMsg type="warn" text="This is a message Warnning, please read it or I'll be sad" />
              
              <FeedbackMsg type="success" text="This is a Success message, please read it or I'll be sad" />
              
              <FeedbackMsg type="info" text="This is an Information message, please read it or I'll be sad" />
            </Container>
            
            
            <Container>
            
              <FeedbackMsg type="error" important text="This is a message Error, please read it or I'll be sad" linkText="Click Here" link />
              
              <FeedbackMsg type="warn" text="This is a message Warnning, please read it or I'll be sad" important/>
              
              <FeedbackMsg type="success" text="This is a Success message, please read it or I'll be sad" important/>
              
              <FeedbackMsg type="info" text="This is an Information message, please read it or I'll be sad" important/>
              
            </Container>

            
          </ContainerCol_2>
          
        </section>
        
        <BtnUp />
        
      </div>
    </main>
  )
}