import ModalMain from '../components/modalMain';
import ModalPopupMd from '../components/modalPopupMd';
import Btn from '../components/btn';

export default function ModalMedium({
  isOpen,
  title,
  text,
  onSubmit,
  onCancel,
}) {
  return (
    <ModalMain isOpen={isOpen}>
      <ModalPopupMd
        title={title ? title : 'Modal Medium Title'}
        text={
          text ? text : 'Subtitle reference text for madal medium popup window'
        }
      >
        {/*  CONTENT  */}

        <div className="grid grid-cols-2 gap-3">
          <Btn
            onClick={onCancel ? onCancel : null}
            label="Cancel"
            xtra="w-full"
            secondary
          />
          <Btn
            onClick={onSubmit ? onSubmit : null}
            label="Submit"
            xtra="w-full"
          />
        </div>
      </ModalPopupMd>
    </ModalMain>
  );
}
