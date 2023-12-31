import React from 'react';
import ModalMain from '@/components/modalMain';
import ModalContainer from '@/components/modalContainer';
import BtnPopClose from '@/components/btnPopClose';

export default function ModalConfimationTestReport({
  isOpenModal,
  closeModal,
  submitReport,
}) {
  return (
    <ModalMain isOpen={isOpenModal}>
      <ModalContainer w="w-3/12" h="h-2/6">
        <BtnPopClose onClick={closeModal} />
        <div>
          <div className="flex flex-col">
            <p className="flex justify-center font-bold text-2xl pb-5">
              Submission Confirmation
            </p>
            <div className="m-auto font-medium px-6 pb-9">
              <p>
                By submitting your test result you confirm all test records are
                open for JCB review and all information provided is correct as
                intended.
              </p>
            </div>
            <div className="flex justify-around">
              <button
                onClick={submitReport}
                className="bg-blue-600 py-2 px-6 text-white rounded-xl"
              >
                I confirm
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-400 py-2 px-6 text-white rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </ModalContainer>
    </ModalMain>
  );
}
