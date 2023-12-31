import { postFetcher, postMultipartFetcher } from '@/lib/fetcher';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import Spinner from './spinner';

export default function ComplianceLetterManagement({ id, locInfo }) {
  const router = useRouter();
  const [srcComplianceLetter, setSrcComplianceLetter] = useState('');
  const [date, setDate] = useState(null);
  const [canReplaceTemplate, setCanReplaceUpdate] = useState(false);
  const [fechingURL, setFechingURL] = useState(false);
  const [canUpdateTemplate, setCanUpdateTemplate] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [iframeKey, setIframeKey] = useState(1);

  const generatePreview = async () => {
    try {
      setFechingURL(true);
      const res = await postFetcher({ id })('/jcb/previewReplace');
      if ((res.rtnCode = '1')) {
        if (!!res.result.fail) {
          setErrorMsg(res.result.fail);
          setTimeout(() => {
            setErrorMsg('');
          }, 5000);
        }
      }
      setSrcComplianceLetter(res.result.template);
      setIframeKey(iframeKey + 1);
      setFechingURL(false);
      setCanReplaceUpdate(true);
      // setCanUpdateTemplate(true);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      setErrorMsg(
        'Something went wrong while trying to get the preview template'
      );
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }
  };

  const replacePreview = async () => {
    try {
      setFechingURL(true);
      if (!!date) {
        const res = await postFetcher({
          productId: id,
          date: `${date}T${moment().format('HH:mm')}`,
        })('/jcb/replace');
        if ((res.rtnCode = '1')) {
          if (!!res.result.fail) {
            setErrorMsg(res.result.fail);
            setTimeout(() => {
              setErrorMsg('');
            }, 5000);
          }
        }
        setSrcComplianceLetter(res.result.template);
        setIframeKey(iframeKey + 1);
        // setCanUpdateTemplate(true);
      } else {
        setErrorMsg('You must selected a date');
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      setErrorMsg(
        'Something went wrong while trying to replace the preview template'
      );
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }
    setFechingURL(false);
  };

  const updateTemplate = async e => {
    setFechingURL(true);
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', '1');
    formData.append('productId', id);

    try {
      const res = await postMultipartFetcher(formData)('/jcb/reupload');
      if (res.rtnCode == 1) {
        if (!!res.result && !!res.result.template) {
          setSrcComplianceLetter(res.result.template);
          setIframeKey(iframeKey + 1);
        }
      }
      setFechingURL(false);
    } catch (error) {
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      console.log(error);
      setErrorMsg('Something went wrong while trying to upload the templates.');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
      setFechingURL(false);
    }
  };

  const uploadTemplateFunction = () => {
    inputFile.current.click();
  };
  const inputFile = useRef(null);

  const renderPreviewFile = useMemo(() => {
    return !fechingURL ? (
      <div className="bg-gray-100 border border-black">
        <iframe
          className={`${
            !!srcComplianceLetter ? 'w-full' : 'w-11/12 mx-auto mt-10 bg-white'
          }`}
          height="500px"
          src={
            !!srcComplianceLetter
              ? `https://docs.google.com/gview?url=${srcComplianceLetter}&embedded=true`
              : null
          }
        ></iframe>
      </div>
    ) : (
      <div>
        <Spinner isLoading={fechingURL} />
      </div>
    );
  }, [srcComplianceLetter, fechingURL]);

  return (
    <div>
      <h1 className="font-semibold text-xl mb-4">
        Compliance Letter Management
      </h1>
      <div className="flex flex-col md:flex-row justify-between mb-10 gap-4 sm:gap-8">
        <div className="flex flex-col md:w-1/2 gap-2">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <p className="sm:w-1/5 font-semibold sm:font-normal">File Name</p>
            <p className="break-all sm:w-4/5">
              {locInfo?.complianceFileName
                ? locInfo?.complianceFileName
                : 'N/A'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <p className="sm:w-1/5 font-semibold sm:font-normal">Version</p>
            <p className="break-all sm:w-4/5">
              {locInfo?.complianceVersion ? locInfo?.complianceVersion : 'N/A'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <p className="sm:w-1/5 font-semibold sm:font-normal">Uploaded</p>
            <p className="break-all sm:w-4/5">
              {locInfo?.complianceUploadTime
                ? locInfo?.complianceUploadTime
                : 'N/A'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <p className="sm:w-1/5 font-semibold sm:font-normal">
              Date of Issue
            </p>
            <input
              type="date"
              onChange={e => setDate(e.target.value)}
              disabled={!canReplaceTemplate}
              className="bg-gray-100 pl-5 py-1 pr-10 border border-black rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:w-1/3 justify-end">
          {canReplaceTemplate ? (
            <button
              onClick={() => replacePreview()}
              disabled={fechingURL}
              className="py-2 px-5 font-medium bg-red-500 text-white rounded-lg"
            >
              {fechingURL ? (
                <Spinner isLoading={fechingURL} />
              ) : (
                <p>Regenerate</p>
              )}
            </button>
          ) : (
            <button
              onClick={() => generatePreview()}
              disabled={fechingURL}
              className="py-2 px-5 font-medium bg-blue-600 text-white rounded-lg flex items-center justify-center"
            >
              {fechingURL ? <Spinner isLoading={fechingURL} /> : <p>Start</p>}
            </button>
          )}

          <button
            disabled={fechingURL}
            className={`${
              srcComplianceLetter
                ? 'bg-blue-600 cursor-pointer'
                : 'bg-gray-300 pointer-events-none'
            } py-2 px-5 font-medium text-white rounded-lg mb-4`}
          >
            <a href={`${srcComplianceLetter}`}>Download Compliance Letter</a>
          </button>
          {canUpdateTemplate ? (
            <button
              onClick={() => uploadTemplateFunction()}
              disabled={fechingURL}
              className={`${
                fechingURL
                  ? 'bg-gray-300 cursor-default'
                  : 'bg-blue-600 cursor-pointer'
              } py-2 px-5 font-medium text-white rounded-lg`}
            >
              Update Template
            </button>
          ) : (
            ''
          )}
        </div>
        <input
          type="file"
          className="hidden"
          onChange={e => updateTemplate(e)}
          ref={inputFile}
        />
      </div>

      {!!errorMsg && (
        <div className="bg-red-400 text-center p-3 mb-5 rounded-lg text-white font-medium border border-red-600">
          <p>{errorMsg}</p>
        </div>
      )}

      {renderPreviewFile}
    </div>
  );
}
