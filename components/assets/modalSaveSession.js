import ModalMain from '../components/modalMain'
import ModalPopupMd from '../components/modalPopupMd'
import Btn from '../components/btn'

import Divider from '../components/divider'

import FormItemTextarea from '../components/formItemTextarea'

export default function ModalSaveSession() {

  return (
    <ModalMain>
    
      <ModalPopupMd title="Save your test session?" text="By saving your current session, your selected test cases can 
be resumed another time.">

          <FormItemTextarea rows="2" maxlength="30" placeholder="Optional comments for this session, limited to 30 characters." info="0/30" />
          
          <Divider />
          
          <div className="grid grid-cols-2 gap-3">
            <Btn label="Cancel" xtra="w-full" secondary />
            <Btn label="Save" xtra="w-full" />
          </div>

      </ModalPopupMd>
      
    </ModalMain>
  )
}
