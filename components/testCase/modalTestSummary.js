import React, { useState } from 'react';
import ModalMain from '@/components/modalMain';
import ModalContainer from '@/components/modalContainer';
import BtnPopClose from '@/components/btnPopClose';
import TestResultModalTable from '../testResultModalTable.js';

const getTheInitialStep = statusId => {
  if (statusId == 2 || statusId == 5) {
    return 1;
  }
  if (statusId >= 3 && statusId <= 5) {
    return 3;
  }
  if (statusId >= 6) {
    return 4;
  }
  return 1;
};

export default function ModalTestSummary({
  isOpen,
  closeModal,
  product,
  statusId,
  setStatusId,
  info,
}) {
  const [currentStep, setCurrentStep] = useState(getTheInitialStep(statusId));

  return (
    <ModalMain isOpen={isOpen}>
      <ModalContainer>
        <BtnPopClose onClick={closeModal} />
        <div className="p-10 h-full overflow-y-auto">
          <div className="flex flex-col">
            <p className="flex justify-center font-bold text-3xl">
              Test Result Submission
            </p>
            <p className="flex justify-center font-semibold text-2xl">
              Instructions
            </p>
            <div className="m-auto text-xl text-center w-5/6">
              <p>
                Please generate your Test Report and add any Waiver comments if
                neccesary. Click Generate Report button to view the initial
                report then click Add to enter your waiver comments for each
                applicable test case.
              </p>
            </div>
            <div className="mt-8 w-9/12 mx-auto">
              <ul className="form-stepper form-stepper-horizontal text-center mx-auto pl-0">
                <li
                  className={`text-center form-stepper-list ${
                    currentStep >= 1 ? 'form-stepper-active' : ''
                  }`}
                  step="1"
                >
                  <a className="mx-2">
                    <span className="form-stepper-circle">
                      <span className="font-bold text-2xl">1</span>
                    </span>
                    <div className="label w-8/12 mx-auto">
                      Generate Test Report
                    </div>
                  </a>
                </li>
                <li
                  className={`text-center form-stepper-list ${
                    currentStep >= 2 ? 'form-stepper-active' : ''
                  }`}
                  step="2"
                >
                  <a className="mx-2">
                    <span className="form-stepper-circle text-muted">
                      <span className="font-bold text-2xl">2</span>
                    </span>
                    <div className="label w-9/12 mx-auto text-muted">
                      Enter Waiver comments (optional)
                    </div>
                  </a>
                </li>
                <li
                  className={`text-center form-stepper-list ${
                    currentStep >= 3 ? 'form-stepper-active' : ''
                  }`}
                  step="3"
                >
                  <a className="mx-2">
                    <span className="form-stepper-circle text-muted">
                      <span className="font-bold text-2xl">3</span>
                    </span>
                    <div className="label w-full mx-auto text-muted">
                      Submit Report
                    </div>
                  </a>
                </li>
                <li
                  className={`text-center form-stepper-list ${
                    currentStep >= 4 ? 'form-stepper-active' : ''
                  }`}
                  step="4"
                >
                  <a className="mx-2">
                    <span className="form-stepper-circle text-muted">
                      <span className="font-bold text-2xl">4</span>
                    </span>
                    <div className="label w-full mx-auto text-muted">
                      JCB Approval
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div style={{ height: '50vh' }}>
              <TestResultModalTable
                product={product}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                closeModal={closeModal}
                setStatusId={setStatusId}
                info={info}
              />
            </div>
          </div>
        </div>
      </ModalContainer>
    </ModalMain>
  );
}
