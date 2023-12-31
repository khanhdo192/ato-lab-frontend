import ModalMain from '../components/modalMain'
import ModalPopupMd from '../components/modalPopupMd'
import Btn from '../components/btn'

export default function ModalMedium() {

  return (
    <ModalMain>
    
      <ModalPopupMd title="Modal Medium Title" text="Subtitle reference text for madal medium popup window">

          {/*  CONTENT  */}
          
          <div className="grid grid-cols-2 gap-3">
            <Btn label="Cancel" xtra="w-full" secondary />
            <Btn label="Submit" xtra="w-full" />
          </div>

      </ModalPopupMd>
      
    </ModalMain>
  )
}
