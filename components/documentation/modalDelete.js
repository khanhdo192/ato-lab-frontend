import BtnPopClose from '../btnPopClose';
import ModalContainer from '../modalContainer';
import ModalMain from '../modalMain';
import Spinner from '../spinner';

export default function ModalDelete({
  isOpen,
  closeModal,
  fetching,
  handleDelete,
  fileDeleted,
}) {
  return (
    <ModalMain isOpen={isOpen} zIndex="50">
      <ModalContainer w="w-full md:w-7/12 lg:w-5/12">
        <BtnPopClose onClick={closeModal} disabled={fetching} />
        <div className="pt-5 px-5">
          <h1 className="text-center font-semibold text-2xl mb-4">
            Are you sure you want to delete this file ? <br />
            {fileDeleted ? fileDeleted?.name : ''}
          </h1>
          <div className="py-6">
            {fetching && <Spinner isLoading={fetching} />}
          </div>
          <div className="flex justify-around gap-2">
            <button
              className={`${
                fetching ? 'bg-gray-300 cursor-default' : 'bg-gray-400'
              } py-1 px-10 rounded-lg text-white font-medium`}
              disabled={fetching}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className={`${
                fetching ? 'bg-gray-300 cursor-default' : 'bg-blue-600'
              } py-1 px-10 rounded-lg text-white font-medium`}
              disabled={fetching}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </ModalContainer>
    </ModalMain>
  );
}
