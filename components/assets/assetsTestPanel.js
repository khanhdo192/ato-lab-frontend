import React from 'react';

import ProceduresItem from '../components/proceduresItem'
import ResultsItem from '../components/resultsItem'

import InputSelect from '../components/inputSelect'

import TextH1 from '../components/textH1'
import TextH2 from '../components/textH2'

import Divider from '../components/divider'

import BtnUp from '../components/btnUp'
import BtnAction from '../components/btnAction'
import Btn from '../components/btn'
import BtnTable from '../components/btnTable'
import BtnNextCase from '../components/btnNextCase'
import BtnTableTitle from '../components/btnTableTitle'

import InputSearch from '../components/inputSearch'

import Container from '../components/container'
import ContainerCol_3 from '../components/containerCol_3'
import ContainerCol_2 from '../components/containerCol_2'

import TableRowHistory from '../components/tableRowHistory'

export default function AssetsTestPane() {

  return (
    <main className="flex w-full min-h-screen 2xl:min-h-main m-auto max-w-screen-2xl 2xl:my-8">
    
      
      {/*  Content  */}
      <div className="w-full p-2 lg:py:0 lg:px-8">

        
        {/*  Content per PAGE  */}
        <section>
          <Container>
            {/*  Menu top - right  */}
            <div className="flex justify-end flex-wrap lg:space-x-2 mb-3">
              <BtnAction ico="review" color="bg-b-500" label="TEST LIBRARY 0 / 2071" xtra="w-full md:w-auto mb-2 lg:mt-0 md:mr-2 lg:mr-0" />
              <BtnAction ico="review" color="bg-b-500" label="TEST SUMMARY" xtra="w-full md:w-auto mb-2 lg:mt-0 md:mr-2 lg:mr-0" />
              <BtnAction ico="complete" color="bg-g-400" label="COMPLETE REVIEW" xtra="w-full md:w-auto" />
            </div>
            
            {/*  Body  */}
            <ContainerCol_2>
              {/*  Content LEFT   */}
              <div>
                <ContainerCol_3 xtra="mb-5">
                  {/* al Activo agregarle  order-last lg:order-none  */}
                  <Btn label="Procedures" xtra="my-2 lg:my-0 order-last lg:order-none" isActive/>
                  <Btn label="Results" xtra="my-2 lg:my-0"  secondary />
                  <Btn label="History" xtra="my-2 lg:my-0" secondary />
                </ContainerCol_3>
                
                <div className="border border-b-250 mb-3 lg:mb-6 p-4 pr-2 lg:p-5 lg:pr-3 bg-white rounded-xl">
                    <div className="h-test scroll overflow-y-scroll overflow-x-hidden  box-border pr-4">
                    
                      {/*  [ Active section content ]  */}
                      
                      
                      
                      {/*  PROOCEDURES  */}
                      
                      <ContainerCol_3>
                        <ProceduresItem title="TC ID" text="Lorem ipsum dolor" />
                        <ProceduresItem title="Message Category" text="Sit amet" />
                        <ProceduresItem title="Channel" text="Consequat ut ac ma" />
                      </ContainerCol_3>
                      
                      <Divider />
                      
                      <ProceduresItem title="TC ID" text="Donec aliquam lacus vel tempus sollicitudin. Fusce quis nulla consectetur nisl suscipit tincidunt at at eros. Curabitur fringilla aliquam suscipit. Praesent eu arcu eget orci mollis facilisis nec non ex. Nunc vitae facilisis tellus, vitae congue dolor. Mauris laoreet mi eu dolor ultrices, vel faucibus risus congue. Suspendisse feugiat, ante vitae ornare dictum, libero quam dapibus lectus, et porta sapien nunc non mauris. Sed accumsan mauris risus, at consectetur massa malesuada tempus. Donec quis sem a erat feugiat lobortis. Donec iaculis vestibulum nisi, id interdum metus fringilla in. Ut tortor ipsum, mollis at pretium id, pulvinar ac mauris. Mauris ac lacus suscipit odio laoreet fermentum. Praesent porta vehicula sapien, sed pulvinar purus ultricies sit amet. Cras porta at urna ac luctus."
                      />
                      
                      <Divider />
                      
                      <ProceduresItem title="Test for scroll" text="Donec aliquam lacus vel tempus sollicitudin. Fusce quis nulla consectetur nisl suscipit tincidunt at at eros. Curabitur fringilla aliquam suscipit. Praesent eu arcu eget orci mollis facilisis nec non ex. Nunc vitae facilisis tellus, vitae congue dolor. Mauris laoreet mi eu dolor ultrices, vel faucibus risus congue. Suspendisse feugiat, ante vitae ornare dictum, libero quam dapibus lectus, et porta sapien nunc non mauris. Sed accumsan mauris risus, at consectetur massa malesuada tempus. Donec quis sem a erat feugiat lobortis. Donec iaculis vestibulum nisi, id interdum metus fringilla in. Ut tortor ipsum, mollis at pretium id, pulvinar ac mauris. Mauris ac lacus suscipit odio laoreet fermentum. Praesent porta vehicula sapien, sed pulvinar purus ultricies sit amet. Cras porta at urna ac luctus."
                      />
                      
                      <Divider />
                      
                    </div>
                </div>
                
                {  /* Menu bottom  */  }
                <div className="flex flex-wrap items-center justify-center md:justify-between">
                
                  <div className="flex space-x-2 mt-2 md:mt-0">
                    <BtnNextCase ico="prev" isDisable />
                    <BtnNextCase ico="start" isDisable />
                    <BtnNextCase ico="end" />
                    <BtnNextCase ico="next" />
                  </div>
                  
                   <InputSearch placeholder="Search Test Case#" xtra="w-full md:w-44 mt-8 mb-4 md:my-0"/>
                   
                </div>
              </div>
              
              <Divider style="lg:hidden" />
            
              {/*  Content RIGHT   */}
              <div className="relative flex flex-col border border-b-250 mb-3 lg:mb-4 p-3 lg:py-5 lg:px-4 mt-14 md:mt-0 bg-white rounded-xl">
                {/* menu del response */}
                <div className="flex flex-wrap md:flex-row-reverse justify-end md:justify-between">
                
                  <BtnAction ico="copy" color="bg-y-400" label="Copy" xtra="absolute -top-14 md:top-0 md:relative mb-3 lg:mb-c" />
                  
                  <div className="w-full md:w-auto justify-center flex space-x-1 md:space-x-2">
                    <BtnAction label="3DSR TO 3DSS" />
                    <BtnAction label="3DSS TO ACS" />
                    <BtnAction label="DS TO 3DSS" />
                  </div>

                </div>
                
                {/* Response Output window  */}
                <div className="flex flex-grow  h-test-output scroll overflow-y-scroll overflow-x-hidden p-3 lg:p-4 mt-3 md:mt-1 bg-b-100 rounded-xl">
                  <p className="max-w-full break-all whitespace-pre-wrap text-b-600 text-sm tracking-wide">
                    Response: No Result Found!
                  </p>
                </div>
              </div>
            </ContainerCol_2>
          </Container>

          {/*     */}
          
          <Container>
            <ContainerCol_2>
                <div className="border border-b-250 mb-3 lg:mb-6 p-4 pr-2 lg:p-5 lg:pr-3 bg-white rounded-xl">
                    <div className="h-test scroll overflow-y-scroll overflow-x-hidden  box-border pr-4">
                    
                      {/*  [ Active section content ]  */}
                      

                      
                      {/*     RESULTS       */}
                      
                      <div className="mt-1 mb-8">
                        <TextH1 text="JCT_3DS_001"/>
                        <TextH2 text="The following pass criteria shall be fulfilled" style="mt-1" isInfo/>
                      </div>
                      
                      
                      <Divider />
                      
                      
                      <ResultsItem title=" Mess_ARes_from_ACS_to_DS_Resp1: The field 'messageType' shall be equal to ARes." />
                      
                      
                      <ResultsItem title=" Mess_ARes_from_ACS_to_DS_Resp1: The field 'messageType' shall be equal to ARes."
                        errorDescription=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a tempor est. Nulla imperdiet luctus mi at suscipit. Aenean in odio tincidunt, mattis purus sed, facilisis sem. Maecenas ut vulputate diam, non volutpat dui. Curabitur vitae justo eget turpis porttitor consequat ut ac mauris. Quisque dignissim accumsan mi. Quisque aliquet, erat non sodales tristique, eros enim molestie"
                      />
                      
                      <ResultsItem title=" Mess_ARes_from_ACS_to_DS_Resp1: The field 'messageType' shall be equal to ARes."
                        errorDescription=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a tempor est. Nulla imperdiet luctus mi at suscipit. Aenean in odio tincidunt, mattis purus sed, facilisis sem. Maecenas ut vulputate diam, non volutpat dui. Curabitur vitae justo eget turpis porttitor consequat ut ac mauris. Quisque dignissim accumsan mi. Quisque aliquet, erat non sodales tristique, eros enim molestie"
                        showError
                      />

                      
                    </div>
                </div>
                
                
                <div className="border border-b-250 mb-3 lg:mb-6 p-4 pr-2 lg:p-5 lg:pr-3 bg-white rounded-xl">
                    <div className="h-test scroll overflow-y-scroll overflow-x-hidden  box-border pr-4">
                    
                      {/*  [ Active section content ]  */}

                      
                      {/*   HISTORY    */}
                      
                      <div className="mt-1 mb-8">
                        <TextH1 text="History Results"/>
                        <TextH2 text="The most recent 30 results are loaded by default. Click Load More to load more previous results, or input a specific date" style="mt-1" />
                      </div>
                      
                      <Divider />
                      
                      <div className="relative md:flex items-center justify-between -mt-8 md:mt-0">
                          <BtnTable label="load more" xtra="absolute md:relative top-30 md:top-0 lg:ml-1" />
                          
                          {/* Search  */}
                         <InputSearch placeholder="YYY-MM-DD" xtra="w-full md:w-32"/>
                      </div>
                      
                      <Divider />
                      
                      {/*  Sort BY  */}
                      <div className="md:hidden flex w-full justify-end mt-7 mb-6">
                        <InputSelect id="sel2" name="selSort" xtra="w-full">
                            <option defaultValue="">Sort by</option>
                          	<option defaultValue="">Date</option>
                          	<option defaultValue="">Result</option>
                        </InputSelect>
                      </div>
                      
                      {/*  Grid Table 7 cols  */}
                      <div className="mb-6">
                        {/* table titles row */ }
                        <div className="hidden md:grid grid-cols-hist-table-md pb-2.5 border-b border-gr-400">
                            <BtnTableTitle label="Date" active />
                            <BtnTableTitle label="Time"  />
                            <BtnTableTitle label="Results" justify="center"  />
                        </div>
                         {/*   table rows   */ }
                         <TableRowHistory data={["2020/12/20", "13:45:25 (GMT)"]} success/>
                         <TableRowHistory data={["2020/12/20", "13:45:25 (GMT)"]} />
                      </div>
                    </div>
                </div>
            
            </ContainerCol_2>
          </Container>
        </section>
        
        <BtnUp />
        
      </div>
    </main>
  )
}
