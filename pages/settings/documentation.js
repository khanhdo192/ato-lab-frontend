import Breadcrumb from '@/components/breadcrumb';
import BreadcrumbItem from '@/components/breadcrumbItem';
import BtnUp from '@/components/btnUp';
import Container from '@/components/container';
import ModalDelete from '@/components/documentation/modalDelete';
import Footer from '@/components/footer';
import Header from '@/components/header';
import ModalConfirmDocumentation from '@/components/modalConfirmDocumentation';
import Nav from '@/components/nav';
import UploadDocumentionFile from '@/components/uploadDocumentionFile';
import UserThumb from '@/components/userThumb';
import { fetcher, postMultipartFetcher } from '@/lib/fetcher';
import useUser from '@/lib/useUser';
import 'jspdf-autotable';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

export default function DocumentationPage() {
  const router = useRouter();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [files, setFiles] = useState([]);
  const [reqFiles, setReqFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [fetching, setFetching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [fileDeleted, setFileDeleted] = useState({
    id: undefined,
    order: 0,
    name: '',
  });

  const { user } = useUser();

  const {
    data: dataDocumentation,
    error: errorDocumentation,
    mutate: mutateDocumentation,
  } = useSWR('/jcb/get-files-admin', fetcher, {
    revalidateOnFocus: true,
  });

  useMemo(() => {
    if (!!dataDocumentation) {
      const newFiles = dataDocumentation.map(file => {
        return { ...file, modifyDate: file.modifyDate?.replace('T', ' ') };
      });
      setFiles(newFiles);
      setErrorMsg('');
    }
    if (errorDocumentation) {
      setFiles([]);
      setErrorMsg(
        'Something went wrong while trying to get the files documentation.'
      );
      if (errorDocumentation?.response?.data?.rtnCode === '9897') {
        router.reload();
      }
      localStorage.setItem('isIdle', false);
    }
  }, [dataDocumentation, errorDocumentation]);

  const defaultDocumentation = () => {
    mutateDocumentation();
    setReqFiles([]);
    if (!!dataDocumentation) {
      const newFiles = dataDocumentation.map(file => {
        return { ...file, modifyDate: file.modifyDate?.replace('T', ' ') };
      });
      setFiles(newFiles);
    }
  };

  const uploadFile = (e, order) => {
    const file = e.target.files[0];
    if (!file) return;
    // To update the files to request
    const newFilesReq = [...reqFiles];
    newFilesReq[order - 1] = {
      id: (files.find(file => file.order == order) || {}).id,
      order,
      action: !!files.find(file => file.order == order) ? 'UPDATE' : 'CREATE',
      file,
      name: file.name,
    };

    setReqFiles(newFilesReq);

    // To update the files to show
    let isNewFile = true;
    const newFiles = files.map(oldFile => {
      if (oldFile.order == order) {
        isNewFile = false;
        return { id: null, name: file.name, order };
      } else {
        return oldFile;
      }
    });
    if (isNewFile) {
      newFiles.push({ id: null, name: file.name, order });
    }
    setFiles(newFiles);
  };

  const uploadFileFetch = async () => {
    setFetching(true);
    let reqFilesFiltered = reqFiles.filter(reqFile => !!reqFile);
    reqFilesFiltered = reqFilesFiltered.map(
      ({ name, ...keepAttrs }) => keepAttrs
    );

    const formData = new FormData();

    reqFilesFiltered.forEach((reqFile, index) => {
      formData.append(`uploadFileDTOList[${index}].id`, reqFile.id);
      formData.append(`uploadFileDTOList[${index}].order`, reqFile.order);
      formData.append(`uploadFileDTOList[${index}].action`, reqFile.action);
      formData.append(`uploadFileDTOList[${index}].file`, reqFile.file);
    });

    try {
      const res = await postMultipartFetcher(formData)(
        '/jcb/upload-delete-multi-file'
      );
    } catch (error) {
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      console.log(error);
      setErrorMsg(error?.response?.data?.message || '');
      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
    }
    setShowModal(false);
    setFetching(false);
    setUploadingFiles(false);
    defaultDocumentation();
  };

  const deleteFile = async () => {
    setFetching(true);
    const formData = new FormData();
    const emptyFile = new File([''], 'filename');

    formData.append(`uploadFileDTOList[0].id`, fileDeleted?.id || undefined);
    formData.append(`uploadFileDTOList[0].order`, fileDeleted?.order || 0);
    formData.append(`uploadFileDTOList[0].action`, 'DELETE');
    formData.append(`uploadFileDTOList[0].file`, emptyFile);

    try {
      const res = await postMultipartFetcher(formData)(
        '/jcb/upload-delete-multi-file'
      );
    } catch (error) {
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      console.log(error);
      setErrorMsg(
        error?.response?.data?.message ||
          'Something went wrong while trying to upload the documentation'
      );
      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
    }
    setShowModalDelete(false);
    setFetching(false);
    defaultDocumentation();
  };

  const handleCancelUpload = () => {
    setUploadingFiles(false);
    defaultDocumentation();
  };

  return (
    <main
      className={`relative flex w-full min-h-screen 2xl:min-h-main m-auto max-w-1688 2xl:my-8 2xl:pl-8`}
    >
      <Nav
        status={isSideBarOpen}
        setStatus={setIsSideBarOpen}
        activeSection={'settings/documentation'}
      />
      <div className="relative z-0 w-full p-2 lg:pt-2 lg:ml-menu-lg 2xl:ml-menu py:0 lg:px-8">
        <Header setStatus={setIsSideBarOpen}>
          <Breadcrumb>
            <BreadcrumbItem
              isFirst
              label="Settings"
              link="/dashboard"
              fontSize="text-base"
            />
            <BreadcrumbItem label="User Documentation" fontSize="text-base" />
          </Breadcrumb>
          <UserThumb alt={!!user ? user?.fullName : ''} />
        </Header>
        <section>
          <Container>
            <p className="md:w-1/2 mb-5">
              To upload new documentation, click on the UPDATE FILES button and
              then select the new file(s) from your local computer. Click on
              SUBMIT button to perform a final review of your new file(s). To
              complete the submission process, click on "I CONFIRM".
            </p>
            <div>
              {Array.from({ length: 20 }).map((_, index) => (
                <UploadDocumentionFile
                  key={index}
                  number={index + 1}
                  file={files.find(file => !!file && file.order == index + 1)}
                  uploadFile={uploadFile}
                  uploadingFiles={uploadingFiles}
                  canEdit={true}
                  fetching={fetching}
                  setOpenModal={setShowModalDelete}
                  setFileDeleted={setFileDeleted}
                />
              ))}
            </div>
            {errorMsg && (
              <div className="w-full bg-red-400 rounded-lg border border-red-500 text-center py-4 mb-5">
                <p className="text-white font-medium">{errorMsg}</p>
              </div>
            )}
            <div className="flex mb-6">
              <div className="flex justify-between">
                {uploadingFiles ? (
                  <div>
                    <button
                      onClick={handleCancelUpload}
                      className="px-8 py-2 text-white rounded-lg font-medium bg-gray-500 mr-5"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowModal(true)}
                      disabled={fetching}
                      className={`${
                        fetching ? 'bg-gray-500' : 'bg-blue-600'
                      } px-8 py-2 text-white rounded-lg font-medium`}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setUploadingFiles(true)}
                    className="px-8 py-2 text-white rounded-lg font-medium bg-blue-600"
                  >
                    Upload Files
                  </button>
                )}
              </div>
            </div>
          </Container>
        </section>
        <Footer />
        <BtnUp />
      </div>
      <ModalConfirmDocumentation
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        files={reqFiles.filter(reqFile => !!reqFile)}
        uploadFileFetch={uploadFileFetch}
        fetching={fetching}
      />
      <ModalDelete
        isOpen={showModalDelete}
        closeModal={() => setShowModalDelete(false)}
        fetching={fetching}
        handleDelete={deleteFile}
        fileDeleted={fileDeleted}
      />
    </main>
  );
}
