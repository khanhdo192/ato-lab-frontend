import ModalMain from '@/components/modalMain';
import ModalContainer from '@/components/modalContainer';
import BtnPopClose from './btnPopClose';
import { useEffect, useState } from 'react';
import { postFetcher } from '@/lib/fetcher';
import Spinner from '@/components/spinner';
import { useRouter } from 'next/router';

export default function ComplianceLetterModal({
  isOpen,
  closeModal,
  modalTypes,
  modalType,
  titleModal,
  descriptionModal,
  templateSelected,
  mutateTemplates,
  setTemplateSelected,
  setButtonsDisabled,
  fetching,
  setFetching,
  setErrorMsg,
  urlToDownload,
  setUrlToDownload,
  // File Upload Functions
  uploadTemplateFunction,
  downloadPreview,
}) {
  const router = useRouter();
  const [currentModalType, setCurrentModalType] = useState(null);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [currentDescription, setCurrentDescription] = useState(null);
  const [timeToRetry, setTimeToRetry] = useState(null);
  const [retryEnableDisabled, setRetryEnableDisabled] = useState(false);

  useEffect(() => {
    setCurrentModalType(modalType);
    setCurrentTitle(titleModal);
    setCurrentDescription(descriptionModal);
  }, [isOpen]);

  const uploadTemplate = async () => {
    uploadTemplateFunction();
  };

  const enableTemplate = async () => {
    try {
      setFetching(true);
      const res = await postFetcher({ id: templateSelected.id })(
        '/jcb/templateUpdate'
      );
      if (res.rtnCode == 1) {
        // TODO: not working for the response from the backend
        if (!!res.result && !!res.result.template) {
          setUrlToDownload(res.result.template);
        }
        setTimeToRetry(5);
        setCurrentModalType(modalTypes.ENABLE_SUCCESSFUL);
        setCurrentTitle('Enable Succesfull');
        setCurrentDescription([
          'New LoC letter template enabled succesfully. You may close this message.',
        ]);
        await mutateTemplates();
      } else {
        setErrorMsg(
          'Something went wrong while trying to enable the template.'
        );
      }
      setFetching(false);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      setTimeToRetry(5);
      setCurrentModalType(modalTypes.ENABLE_FAILED);
      setCurrentTitle('Enable Failed');
      setCurrentDescription([
        'The server is busy, please try again later. Please ensure no other accounts are modifying the LoC at the same time.',
      ]);
      setErrorMsg('Something went wrong while trying to enable the template.');
      setFetching(false);
    }
  };

  const closeModalAndInit = () => {
    setCurrentModalType(null);
    setCurrentTitle(null);
    setCurrentDescription(null);
    setTimeToRetry(null);
    setRetryEnableDisabled(false);
    setUrlToDownload(null);
    closeModal();
  };

  const confirmDelete = async () => {
    try {
      setFetching(true);
      const res = await postFetcher({ id: templateSelected.id })(
        '/jcb/deleteTemplate'
      );
      if (res.message == 'Template deleted successfully') {
        await mutateTemplates();
        setTemplateSelected(null);
        setButtonsDisabled(false);
        closeModalAndInit();
      } else {
        setErrorMsg(
          'Something went wrong while trying to delete the template.'
        );
      }
      setFetching(false);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      setErrorMsg('Something went wrong while trying to delete the template.');
      setFetching(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!retryEnableDisabled) {
        if (currentModalType == modalTypes.ENABLE_FAILED && timeToRetry > 0) {
          setTimeToRetry(timeToRetry - 1);
        }
        if (currentModalType == modalTypes.ENABLE_FAILED && timeToRetry == 0) {
          setRetryEnableDisabled(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentModalType, timeToRetry]);

  return (
    <ModalMain isOpen={isOpen} zIndex="50">
      <ModalContainer w="w-full md:w-8/12 lg:w-5/12 2xl:w-4/12">
        <BtnPopClose onClick={closeModal} />
        <h1 className="text-center font-semibold text-2xl mb-4">
          {currentTitle}
        </h1>
        {currentModalType == modalTypes.DELETED_DENIED ? (
          <div className="mx-3 font-medium mb-12">{currentDescription[0]}</div>
        ) : (
          ''
        )}
        {currentModalType == modalTypes.FILE_UPLOAD ? (
          <div>
            <div className="mx-3 font-medium mb-12">
              {currentDescription[0]}
            </div>
            {/* {fetching ? (
              <Spinner isLoading={fetching}></Spinner>
            ) : ( */}
            <div>
              <div className="mx-3 rounded-lg mb-5">
                <button
                  className={`${
                    fetching ? 'bg-gray-300' : 'bg-blue-500'
                  } py-1 w-full rounded-lg text-white font-medium`}
                  disabled={fetching}
                  onClick={uploadTemplate}
                >
                  UPLOAD
                </button>
              </div>
              <div className="mx-3 rounded-lg mb-5">
                <button
                  className={`${
                    fetching || !urlToDownload
                      ? 'bg-gray-300 cursor-default'
                      : 'bg-blue-500'
                  } py-1 w-full rounded-lg text-white font-medium`}
                  disabled={fetching || !urlToDownload}
                  onClick={downloadPreview}
                >
                  DOWNLOAD PREVIEW
                </button>
              </div>
            </div>
            {/* )} */}
          </div>
        ) : (
          ''
        )}
        {currentModalType == modalTypes.ENABLE_CONFIRMATION ? (
          <div>
            <div className="mx-3 mb-6">{currentDescription[0]}</div>
            <div className="mx-3 mb-6">{currentDescription[1]}</div>
            <div className="ml-3 font-semibold">{currentDescription[2]}</div>
            <div className="mx-3 mb-12">{currentDescription[3]}</div>
            <div className="mx-3 rounded-lg mb-5">
              <button
                className={`${
                  fetching ? 'bg-gray-300 cursor-default' : 'bg-blue-500'
                } py-1 w-full rounded-lg text-white font-medium`}
                disabled={fetching}
                onClick={enableTemplate}
              >
                CONFIRM
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
        {currentModalType == modalTypes.ENABLE_FAILED ? (
          <div>
            <div className="mx-3 mb-12">{currentDescription[0]}</div>
            <div className="mx-3 rounded-lg mb-5">
              <button
                disabled={fetching || !retryEnableDisabled}
                className={`${
                  fetching || !retryEnableDisabled
                    ? 'bg-gray-300 cursor-default'
                    : 'bg-blue-500'
                } py-1 w-full rounded-lg text-white font-medium`}
                onClick={enableTemplate}
              >
                RETRY ENABLE{' '}
                {`${
                  !retryEnableDisabled && timeToRetry != 0
                    ? '(' + timeToRetry + ')'
                    : ''
                }`}
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
        {currentModalType == modalTypes.ENABLE_SUCCESSFUL ? (
          <div>
            <div className="mx-3 mb-16">{currentDescription[0]}</div>
            <div className="mx-3 rounded-lg mb-5">
              <button
                className={`${
                  fetching || !urlToDownload
                    ? 'bg-gray-300 cursor-default'
                    : 'bg-blue-500'
                } py-1 w-full rounded-lg text-white font-medium`}
                disabled={fetching || !urlToDownload}
                onClick={downloadPreview}
              >
                DOWNLOAD PREVIEW
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
        {currentModalType == modalTypes.DELETE_CONFIRMATION && (
          <div>
            <div className="mx-3 mb-6">{currentDescription[0]}</div>
            <div className="ml-3 font-semibold">{currentDescription[1]}</div>
            <div className="mx-3 mb-16">{currentDescription[2]}</div>
            <div className="mx-3 rounded-lg mb-5">
              <button
                className={`${
                  fetching ? 'bg-gray-300 cursor-default' : 'bg-red-500'
                } py-1 w-full rounded-lg text-white font-medium`}
                disabled={fetching}
                onClick={confirmDelete}
              >
                CONFIRM DELETE
              </button>
            </div>
          </div>
        )}
        <div className="mx-3 rounded-lg">
          <button
            className={`${
              fetching ? 'bg-gray-300 cursor-default' : 'bg-gray-400'
            } py-1 w-full rounded-lg text-white font-medium`}
            disabled={fetching}
            onClick={closeModalAndInit}
          >
            CLOSE
          </button>
        </div>
      </ModalContainer>
    </ModalMain>
  );
}
