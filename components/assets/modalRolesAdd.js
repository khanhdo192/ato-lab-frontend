
import ModalMain from '../components/modalMain'
import ModalContainer from '../components/modalContainer'

import Container from '../components/container'
import ContainerCol_2 from '../components/containerCol_2'
import Divider from '../components/divider'

import BtnPopClose from '../components/btnPopClose'
import Btn from '../components/btn'

import TextH1 from '../components/textH1'
import TextH2 from '../components/textH2'
import TitleIcon from '../components/titleIcon'

import FormAssetLabel from '../components/formAssetLabel'
import FormItemCheckbox from '../components/formItemCheckbox'
import FormItemInput from '../components/formItemInput'

import FeedbackMsg from '../components/feedbackMsg'

export default function ModalRoleAdd() {

  return (
    <ModalMain>
       <ModalContainer>
       
          <BtnPopClose />
          
          <div className="mb-3 flex items-center">
          
            <TitleIcon ico="manage" />
          
            <TextH1 text="Define" highliteText="New Roles" />
          </div>
          
          <Container className="-mt-6 md:mt-3" hasBorder >
          
            <TextH1 text="Role Name and Permissions" />
            
            <TextH2 isInfo text="Enter a new Role name, then check the portal functions you want this role to Access. Click on SUBMIT to complete" />
            
            <Divider />
            
            <ContainerCol_2>
              <div>
                <FormItemInput label="Role Name*" id="f0" placeholder="e.g. Manager" isRequired />
                
                <FormAssetLabel label="Portal Functions" />
                <div className="border border-b-250 px-3 py-4 bg-white rounded-xl mb-4 lg:mb-0">
                  <FormItemCheckbox id="c1" name="c" value="1" label="Dashboards"  />
                  <FormItemCheckbox id="c2" name="c" value="2" label="User Management" />
                  <FormItemCheckbox id="c3" name="c" value="3" label="Product Providers" xtra="m-n" />
                </div>
              </div>
             
              <div className="w-full flex flex-col justify-between items-end">
                <div className="w-full lg:mt-1.5 mb-2 lg:mb-0">
                  {/*  ERROR  */}
                    {/*<FeedbackMsg type="error" text="You most enter a Role Name" />*/}
                    
                  {/*  SUCCESSS  */}
                    {/*<FeedbackMsg type="success" text="The Role was Created Successfully" />*/}
                </div>
                
                <Btn ico="submit" label="Add Role" />
              </div>
            </ContainerCol_2>
            
          </Container>

      </ModalContainer>

    </ModalMain>
  )
}
