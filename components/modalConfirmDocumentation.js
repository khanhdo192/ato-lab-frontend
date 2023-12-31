import ModalMain from '@/components/modalMain';
import ModalContainer from '@/components/modalContainer';
import BtnPopClose from './btnPopClose';
import UploadDocumentionFile from '@/components/uploadDocumentionFile';
import Spinner from './spinner';

export default function ModalConfirmDocumentation({
  isOpen,
  closeModal,
  files,
  uploadFileFetch,
  fetching,
}) {
  return (
    <ModalMain isOpen={isOpen} zIndex="50">
      <ModalContainer w="w-full md:w-8/12 lg:w-6/12">
        <BtnPopClose onClick={closeModal} disabled={fetching} />
        <div className="pt-5 px-5">
          <h1 className="text-center font-semibold text-2xl mb-4">
            Confirm and Send Notificacions
          </h1>
          <div className="font-medium mb-12 mx-auto">
            Below is a list of new files uploaded, please review to ensure they
            are the correct files you wish to upload. Both JCB and Active Tester
            accounts will recieve an email notificacion after you confirm. To
            confirm you wish to complete this action please click on "I
            Confirm".
          </div>
          <div className="mb-10">
            {Array.from({ length: 20 }).map((_, index) => (
              <UploadDocumentionFile
                key={index}
                number={index + 1}
                file={files.find(file => !!file && file.order == index + 1)}
                canEdit={false}
                isConfirm
              />
            ))}
          </div>
          <div className="flex justify-between">
            <button
              className={`${
                fetching ? 'bg-gray-300 cursor-default' : 'bg-gray-400'
              } py-1 px-10 rounded-lg text-white font-medium`}
              disabled={fetching}
              onClick={closeModal}
            >
              Cancel
            </button>
            {fetching && <Spinner isLoading={fetching} />}
            <button
              className={`${
                fetching || files?.length <= 0
                  ? 'bg-gray-300 cursor-default'
                  : 'bg-blue-600'
              } py-1 px-10 rounded-lg text-white font-medium`}
              disabled={fetching || files?.length <= 0}
              onClick={uploadFileFetch}
            >
              I Confirm
            </button>
          </div>
          {files?.length <= 0 && (
            <div className="text-center mt-3">
              <p className="font-medium text-lg">No files to send</p>
            </div>
          )}
        </div>
      </ModalContainer>
    </ModalMain>
  );
}
