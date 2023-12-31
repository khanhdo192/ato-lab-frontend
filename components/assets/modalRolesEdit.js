
import ModalMain from '../components/modalMain'
import ModalContainer from '../components/modalContainer'

import Container from '../components/container'
import ContainerCol_2 from '../components/containerCol_2'
import Divider from '../components/divider'

import BtnPopClose from '../components/btnPopClose'
import Btn from '../components/btn'
import BtnAction from '../components/btnAction'

import TextH1 from '../components/textH1'
import TextH2 from '../components/textH2'
import TitleIcon from '../components/titleIcon'

import FormAssetLabel from '../components/formAssetLabel'
import FormItemCheckbox from '../components/formItemCheckbox'
import FormItemInput from '../components/formItemInput'

import FeedbackMsg from '../components/feedbackMsg'

export default function ModalRoleEdit() {

  return (
    <ModalMain>
       <ModalContainer>
       
          <BtnPopClose />
          
          <div className="mb-3 flex items-center">
          
            <TitleIcon ico="edit" />
          
            <TextH1 text="Edit" highliteText="Users Roles" />
          </div>
          
          <Container className="-mt-6 md:mt-3" hasBorder >
            <div className="w-full flex justify-between">
              <TextH1 text="Role Name and Permissions" />
              <BtnAction label="REMOVE ROLE" ico="delete" color="bg-r-400" xtra="-mt-1" />
            </div>
            
            <TextH2 isInfo text="Enter a new Role name, then check the portal functions you want this role to Access. Click on SUBMIT to complete" />
            
            <Divider />
            
            <ContainerCol_2>
              <div>
                <FormItemInput label="Role Name*" id="f0" value="Administrator" isRequired />
                
                <FormAssetLabel label="Portal Functions" />
                <div className="border border-b-250 px-3 py-4 bg-white rounded-xl mb-4 lg:mb-0">
                  <FormItemCheckbox id="c1" name="c" value="1" label="Dashboards" isChequed  />
                  <FormItemCheckbox id="c2" name="c" value="2" label="User Management" isChequed />
                  <FormItemCheckbox id="c3" name="c" value="3" label="Product Providers" xtra="m-n" isChequed />
                </div>
              </div>
             
              <div className="w-full flex flex-col justify-between items-end">
                <div className="w-full lg:mt-1.5 mb-2 lg:mb-0">
                  {/*  ERROR  */}
                    {/*<FeedbackMsg type="error" text="You most check the confirm Action" />*/}
                    
                  {/*  SUCCESSS  */}
                    {/*<FeedbackMsg type="success" text="The Action was saved Successfully" />*/}
                </div>
              
                <div className="flex flex-col items-end">
                  <FormItemCheckbox id="confirm" name="confirm" value="confirm" label="Please Confirm this Action!"  />
                  
                  <Btn ico="submit" label="Save" />
                </div>
              </div>
            </ContainerCol_2>
            
          </Container>

      </ModalContainer>

    </ModalMain>
  )
}
