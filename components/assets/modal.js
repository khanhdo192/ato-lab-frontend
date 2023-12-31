import ModalMain from '../components/modalMain'
import ModalPopup from '../components/modalPopup'
import Btn from '../components/btn'
import BtnPopClose from '../components/btnPopClose'

export default function Modal() {

  return (
    <ModalMain>
    
      <ModalPopup 
        title = "Profile Submission"
        text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a tempor est. Nulla imperdiet luctus mi at suscipit. Aenean in odio tincidunt, mattis purus sed"
      >
      
        <Btn label="I Confirm" xtra="mt-4 w-full" />
        <Btn label="Cancel" xtra="mt-4 w-full" secondary />
        
      </ModalPopup>
      
    </ModalMain>
  )
}
