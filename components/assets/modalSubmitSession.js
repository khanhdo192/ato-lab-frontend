import ModalMain from '../components/modalMain'
import ModalPopupMd from '../components/modalPopupMd'

import FeedbackMsg from '../components/feedbackMsg'

import TextH5 from '../components/textH5'
import Divider from '../components/divider'

import Btn from '../components/btn'
import FormItemCheckbox from '../components/formItemCheckbox'

export default function ModalSubmitSession() {

  return (
    <ModalMain>
    
      <ModalPopupMd title="Reporting an Known Issue?" text="Please enter the EMVCo assigned Ticket ID and your comments.">

          <div className="grid grid-cols-2 -mb-5">
            <TextH5 text="Total Test Cases: " highliteText="1173" />
            <TextH5 text="Total Passed: " highliteText="1170" />
            <TextH5 text="Total Failed: "  highliteText="3" />
            <TextH5 text="Total N/A:"  highliteText="0" />
          </div>
          
          <Divider />
          
          <p className="p">
            All your test results will be open to review and the selected session will be validated by JCB. You will not be able to perform any more tests during the validation period or revert this action.
          </p>
          
          {/*  ERROR FEDBACK  */}   
          <div className="mt-6">
            <FeedbackMsg type="error" text="You must Agree" important />
          </div> 
          
          <div className="origin-top-left transform scale-110 mt-6">
            <FormItemCheckbox id="c0" label="I Agree" />
          </div>
          
           <Divider />
          
          <div className="grid grid-cols-2 gap-3">
            <Btn label="Cancel" xtra="w-full" secondary />
            <Btn label="Submit" xtra="w-full" />
          </div>

      </ModalPopupMd>
      
    </ModalMain>
  )
}