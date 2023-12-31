import Breadcrumb from '@/components/breadcrumb';
import BreadcrumbItem from '@/components/breadcrumbItem';
import BtnUp from '@/components/btnUp';
import ComplianceLetterModal from '@/components/complianceLetterModal';
import Container from '@/components/container';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Nav from '@/components/nav';
import UserThumb from '@/components/userThumb';
import { fetcher, postFetcher, postMultipartFetcher } from '@/lib/fetcher';
import useUser from '@/lib/useUser';
import 'jspdf-autotable';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import useSWR from 'swr';

const modalTypes = {
  DELETED_DENIED: 'DELETED_DENIED',
  FILE_UPLOAD: 'FILE_UPLOAD',
  ENABLE_CONFIRMATION: 'ENABLE_CONFIRMATION',
  ENABLE_FAILED: 'ENABLE_FAILED',
  ENABLE_SUCCESSFUL: 'ENABLE_SUCCESSFUL',
  DELETE_CONFIRMATION: 'DELETE_CONFIRMATION',
};

export default function ComplianceLetterPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [defaultLocValidity, setDefaultLocValidity] = useState(0);
  const [canEditLocValidity, setCanEditLocValidity] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [templateSelected, setTemplateSelected] = useState(null);
  const [templateEnable, setTemplateEnable] = useState(false);
  const [urlToDownload, setUrlToDownload] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // MODALS
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [titleModal, setTitleModal] = useState('');
  const [descriptionModal, setDescriptionModal] = useState([]);
  const [fetching, setFetching] = useState(false);

  const inputFile = useRef(null);

  const { data: dataComplianceLetter, error: errorComplianceLetter } = useSWR(
    '/jcb/complianceLetter',
    fetcher
  );

  const {
    data: dataTemplates,
    error: errorTemplates,
    mutate: mutateTemplates,
  } = useSWR('/jcb/template', fetcher, {
    revalidateOnFocus: true,
  });

  useMemo(() => {
    if (dataComplianceLetter?.result) {
      const days = dataComplianceLetter?.result?.days;
      setDefaultLocValidity(days || 0);
    }
    if (errorComplianceLetter) {
      setErrorMsg(
        'Something went wrong while trying to get the default loc validity.'
      );
      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
      if (errorComplianceLetter?.response?.data?.rtnCode === '9897') {
        router.reload();
      }
      localStorage.setItem('isIdle', false);
    }
  }, [dataComplianceLetter, errorComplianceLetter]);

  useMemo(() => {
    if (dataTemplates?.result) {
      const allTemplates = dataTemplates.result?.list;
      if (!!allTemplates) {
        const allTemplatesWithStatusNames = allTemplates.map(template => {
          if (template.status == 0) template.status = 'Disabled';
          if (template.status == 1) template.status = 'Uploaded';
          if (template.status == 2) template.status = 'Enabled';
          return template;
        });
        setTemplates(allTemplatesWithStatusNames);
      } else {
        setErrorMsg('Something went wrong while trying to get the templates.');
        setTimeout(() => {
          setErrorMsg('');
        }, 3000);
      }
    }
    if (errorTemplates) {
      setTemplates([]);
      if (errorTemplates?.response?.data?.rtnCode === '9897') {
        router.reload();
      }
      localStorage.setItem('isIdle', false);
    }
  }, [dataTemplates, errorTemplates]);

  const editLocValidyty = () => {
    setCanEditLocValidity(true);
  };

  const saveLocValidity = async () => {
    try {
      const res = await postFetcher({ days: defaultLocValidity })(
        '/jcb/compliance/setting'
      );
      if (!!res && !!res.result && !!res.result.fail) {
        setErrorMsg(
          'Something went wrong while trying to update the default loc validity.'
        );
        setTimeout(() => {
          setErrorMsg('');
        }, 3000);
      }
    } catch (error) {
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      setErrorMsg(
        'Something went wrong while trying to update the default loc validity.'
      );
      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
      console.log(error);
    }
    setCanEditLocValidity(false);
  };

  const enableButtoms = temp => {
    setButtonsDisabled(true);
    setTemplateSelected(temp);
    if (temp.status == 'Enabled') {
      setTemplateEnable(true);
    } else {
      setTemplateEnable(false);
    }
  };

  const deleteTemplate = () => {
    if (templateSelected.status == 'Enabled') {
      setTitleModal('Denied');
      setDescriptionModal([
        'This template is currently Enabled. To avoid service disruption, please upload a new template and Enable it first.',
      ]);
      setModalType(modalTypes.DELETED_DENIED);
      setShowModal(true);
    } else {
      setTitleModal('Delete Confirmation');
      setDescriptionModal([
        'To delete tihs LoC template from the server click the Confirm Delete button.',
        'Important Notice',
        'Please note you cannot undo this action.',
      ]);
      setModalType(modalTypes.DELETE_CONFIRMATION);
      setShowModal(true);
    }
  };

  const uploadTemplate = () => {
    setTitleModal('File Upload');
    setDescriptionModal([
      'Please select and upload from your local computer a JCB designated Compliance Letter template. If the upload is rejected, please check your format or contact Atomworks representative for support.',
    ]);
    setModalType(modalTypes.FILE_UPLOAD);
    setShowModal(true);
  };

  const uploadTemplateFetch = async e => {
    setFetching(true);
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', user?.id);

    try {
      const res = await postMultipartFetcher(formData)('/jcb/template');
      if (res.rtnCode == 1) {
        if (!!res.result && !!res.result.template) {
          setUrlToDownload(res.result.template);
        }
        await mutateTemplates();
      }
      setFetching(false);
    } catch (error) {
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      console.log(error);
      setErrorMsg(
        error?.response?.data?.message ||
          'Something went wrong while trying to upload the templates.'
      );
      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
      setFetching(false);
    }
  };

  const uploadTemplateFunction = () => {
    inputFile.current.click();
  };

  const downloadPreview = () => {
    window.open(urlToDownload);
  };

  const enableTemplateModal = () => {
    setTitleModal('Enable Confirmation');
    setDescriptionModal([
      'To review this Compliance Letter please click on Download Preview button to download a sample for your review.',
      "To enable this report please click on Confirm. All LoC's issued after activation will use this letter template.",
      'Important Notice',
      'All previously enabled LoC templates will be automatically disabled.',
    ]);
    setModalType(modalTypes.ENABLE_CONFIRMATION);
    setShowModal(true);
  };

  return (
    <main
      className={`relative flex w-full min-h-screen 2xl:min-h-main m-auto max-w-1688 2xl:my-8 2xl:pl-8`}
    >
      <Nav
        status={isSideBarOpen}
        setStatus={setIsSideBarOpen}
        activeSection={'settings/compliance-letter'}
        showModal={showModal}
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
            <BreadcrumbItem label="Compliance Letter" fontSize="text-base" />
          </Breadcrumb>
          <UserThumb alt={!!user ? user?.fullName : ''} />
        </Header>
        <section>
          <Container>
            <h1 className="font-medium text-lg lg:text-2xl mb-6">
              Letter of Compliance Valid Period
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <p className="text-xl font-normal mr-6">Default Loc Validity:</p>
              <input
                type="number"
                disabled={!canEditLocValidity}
                value={defaultLocValidity}
                className="sm:w-1/12 px-4 py-1 bg-gray-100 border border-gray-400 rounded-lg"
                onChange={e => setDefaultLocValidity(e.target.value)}
              />
            </div>
            <p className="md:w-1/2 text-sm mb-5">
              Sets the default number of days a JCB LoC is valied after a
              product is approved. Admins can also customize this for each
              individual company during the Product Approval Proccess.
            </p>
            {canEditLocValidity ? (
              <button
                onClick={() => saveLocValidity()}
                className="px-10 py-1 bg-blue-600 text-white rounded-lg mb-8"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => editLocValidyty()}
                className="px-10 py-1 bg-blue-600 text-white rounded-lg mb-8"
              >
                Edit
              </button>
            )}
            {errorMsg && (
              <div className="w-full flex justify-center items-center h-12 bg-red-400 border border-red-600 rounded-xl">
                <p className=" text-white font-medium text-xl ">{errorMsg}</p>
              </div>
            )}
            <h1 className="font-bold text-xl mb-3">Record of changes</h1>
            <div className="overflow-scroll mb-8">
              <table className="table-auto w-full">
                <thead className="w-full bg-blue-900 text-white">
                  <tr>
                    <th className="font-medium border-r border-white px-1.5 py-1.5">
                      Seq
                    </th>
                    <th className="font-medium px-1.5 py-1.5 border-r border-white">
                      File Name(.doc)
                    </th>
                    <th className="font-medium px-1.5 py-1.5 border-r border-white">
                      Last Modified
                    </th>
                    <th className="font-medium px-1.5 py-1.5 border-r border-white">
                      Version
                    </th>
                    <th className="font-medium px-1.5 py-1.5 border-r border-white">
                      By
                    </th>
                    <th className="font-medium px-1.5 py-1.5 border-r border-white">
                      Email
                    </th>
                    <th className="font-medium px-1.5 py-1.5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {templates?.map((change, index) => (
                    <tr
                      key={`template-${index}`}
                      className={`${
                        !!templateSelected && change.id == templateSelected.id
                          ? 'bg-blue-300'
                          : index % 2 == 0
                          ? 'bg-gray-50'
                          : 'bg-gray-100'
                      } text-center`}
                    >
                      <td className="border-r border-gray-500 px-1.5 py-1.5">
                        {change.id}
                      </td>
                      <td className="border-r border-gray-500">
                        <button
                          onClick={() => enableButtoms(change)}
                          className="w-full px-1.5 py-1.5"
                        >
                          {change.template}
                        </button>
                      </td>
                      <td className="border-r border-gray-500 px-1.5 py-1.5">
                        {change.lastModify}
                      </td>
                      <td className="border-r border-gray-500 px-1.5 py-1.5">
                        {change.version}
                      </td>
                      <td className="border-r border-gray-500 px-1.5 py-1.5">
                        {change.userName}
                      </td>
                      <td className="border-r border-gray-500 px-1.5 py-1.5">
                        {change.email}
                      </td>
                      <td>{change.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center flex-wrap gap-4 mb-6">
              <button
                onClick={() => uploadTemplate()}
                className="px-5 py-1 text-white rounded-lg font-medium bg-blue-600"
              >
                Upload Template{' '}
              </button>
              <button
                onClick={() => deleteTemplate(true)}
                disabled={!buttonsDisabled}
                className={`${
                  !buttonsDisabled ? 'bg-gray-400' : 'bg-blue-600'
                } px-5 py-1 text-white rounded-lg font-medium`}
              >
                Delete
              </button>
              <button
                onClick={() => enableTemplateModal()}
                disabled={!buttonsDisabled || templateEnable}
                className={`${
                  !buttonsDisabled || templateEnable
                    ? 'bg-gray-400'
                    : 'bg-green-400'
                } px-5 py-1 text-white rounded-lg font-medium`}
              >
                Enable
              </button>
              <input
                type="file"
                className="hidden"
                onChange={e => uploadTemplateFetch(e)}
                ref={inputFile}
              />
            </div>
          </Container>
        </section>
        <Footer />
        <BtnUp />
        <ComplianceLetterModal
          isOpen={showModal}
          closeModal={() => setShowModal(false)}
          modalTypes={modalTypes}
          modalType={modalType}
          titleModal={titleModal}
          descriptionModal={descriptionModal}
          templateSelected={templateSelected}
          mutateTemplates={mutateTemplates}
          setTemplateSelected={setTemplateSelected}
          setButtonsDisabled={setButtonsDisabled}
          fetching={fetching}
          setFetching={setFetching}
          setErrorMsg={setErrorMsg}
          urlToDownload={urlToDownload}
          setUrlToDownload={setUrlToDownload}
          // File Upload functions
          uploadTemplateFunction={uploadTemplateFunction}
          downloadPreview={downloadPreview}
        />
      </div>
    </main>
  );
}
