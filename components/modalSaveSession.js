import { useState } from 'react'
import ModalMain from '@/components/modalMain'
import ModalPopupMd from '@/components/modalPopupMd'
import Btn from '@/components/btn'

import Divider from '@/components/divider'

import FormItemTextarea from '@/components/formItemTextarea'

export default function ModalSaveSession({ isOpen, closeModal, onClick, onChange, ref }) {
  const [info, setInfo] = useState(0);

  const handleChangeLengthText = e => {
    const result = onChange(e);
    setInfo(result);
  };

  return (
    <ModalMain isOpen={isOpen}>

      <ModalPopupMd title="Save your test session?" text="By saving your current session, your selected test cases can
be resumed another time.">

          <FormItemTextarea
            rows="2"
            maxlength="30"
            placeholder="Optional comments for this session, limited to 30 characters."
            info={`${info}/30`}
            ref={ref}
            onChange={handleChangeLengthText}
          />

          <Divider />

          <div className="grid grid-cols-2 gap-3">
            <Btn
              label="Cancel"
              xtra="w-full"
              secondary
              onClick={closeModal}
            />
            <Btn
              label="Save"
              xtra="w-full"
              onClick={onClick}
            />
          </div>

      </ModalPopupMd>

    </ModalMain>
  )
}
