import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';

export default function UploadDocumentionFile({
  number,
  file,
  uploadFile,
  uploadingFiles,
  fetching,
  canEdit,
  setOpenModal,
  setFileDeleted,
  isConfirm,
}) {
  const inputFile = useRef(null);

  const uploadFileClick = () => {
    inputFile.current.click();
  };

  useEffect(() => {
    if (!uploadingFiles && inputFile.current) {
      inputFile.current.value = null;
    }
  }, [uploadingFiles]);

  const handleOpenModal = useCallback(() => {
    setFileDeleted({ id: file?.id, order: number, name: file?.name });
    setOpenModal(true);
  }, [file]);

  return (
    <div
      key={`order-${number}`}
      className={`w-full flex ${
        canEdit ? 'mb-7' : 'mb-3'
      } flex-col xl:flex-row gap-2`}
    >
      <div className="xl:w-2/12">
        <p>File {number}</p>
      </div>
      {canEdit ? (
        <div className="xl:w-8/12">
          {!!file?.url ? (
            <Link href={file.url}>
              <a target="_blank" className="w-max text-blue-500 break-words">
                {' '}
                {(file || {}).name}
              </a>
            </Link>
          ) : (
            <p className="break-words">{(file || {}).name}</p>
          )}

          <p>
            {!!(file || {}).modifyDate ? `Update at ${file.modifyDate}` : null}
          </p>
        </div>
      ) : (
        <div className="xl:w-8/12">
          <p className="break-words">{(file || {}).name}</p>
          <p>
            {!!(file || {}).modifyDate ? `Update at ${file.modifyDate}` : null}
          </p>
        </div>
      )}
      <div className="xl:w-2/12 flex justify-end">
        {canEdit && (
          <>
            <button
              onClick={uploadFileClick}
              className={`${
                uploadingFiles || fetching ? 'bg-blue-600' : 'bg-gray-400 '
              } px-8 py-1 my-1 rounded-lg mr-4 text-white font-medium`}
              disabled={!uploadingFiles || fetching}
            >
              Upload
            </button>
            <input
              key={number}
              type="file"
              className="hidden"
              onChange={e => uploadFile(e, number)}
              ref={inputFile}
            />
          </>
        )}
        {file && file?.id && !isConfirm && (
          <button
            onClick={handleOpenModal}
            className="
              bg-blue-600 px-8 py-1 my-1 rounded-lg mr-4 text-white font-medium"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
