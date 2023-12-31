import React, { useEffect, useState } from 'react';
import Btn from './btn';
import ProjectLogTableTr from './projectLogTableTr';
import { postFetcher } from '@/lib/fetcher';
import { useRouter } from 'next/router';

export default function ProjectLogTable({
  projectsLogs,
  accountStatusNames,
  loaStatusNames,
  productStatusNames,
  applicacionTypesNames,
}) {
  const router = useRouter();
  const [logs, setLog] = useState(projectsLogs);
  const [editing, setEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const editProjectsLog = async e => {
    e.preventDefault();
    try {
      setEditing(false);
      setSubmitted(true);
      let sendLogs = logs?.map(
        ({
          productId,
          productTypeId,
          accountStatus,
          emvcoLoaStatus,
          productStatus,
          companyId,
          applicantEmail,
          applicationType,
          component,
          operatorId,
          emv3dSecureProtocolVersion,
          createDate,
          modifyDate,
          ...keepAttrs
        }) => keepAttrs
      );
      sendLogs = [sendLogs[0]];
      await postFetcher({ ProjectLogs: sendLogs })(
        '/jcb/productProcess/updateProjectLog'
      );
      setSubmitted(false);
    } catch (e) {
      console.log(e);
      if (e?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      setErrorMsg('Error trying to edit the Project Log Table.');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
      setSubmitted(false);
    }
  };

  const editAttribute = (name, value, id) => {
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    const newLogs = logs.map(log => {
      if (log.id == id) {
        log[name] = value;
      }
      return log;
    });
    setLog(newLogs);
  };

  useEffect(() => {
    setLog(projectsLogs);
  }, [projectsLogs]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto rounded-xl overflow-hidden w-full mb-4">
          <tbody>
            <ProjectLogTableTr
              title="Date"
              background="bg-blue-900"
              textStyle="font-bold text-white"
              borderStyle="border-l border-white"
              logs={logs}
              attribute="createDate"
            />
            <ProjectLogTableTr
              title="Account Status"
              background="bg-gray-50"
              textStyle="text-blue-400"
              borderStyle="border-l border-gray-200"
              logs={accountStatusNames}
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="LoA Status"
              background="bg-gray-100"
              textStyle="text-blue-400"
              borderStyle="border-l border-gray-200"
              logs={loaStatusNames}
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Product Status"
              background="bg-gray-50"
              textStyle="text-blue-400"
              borderStyle="border-l border-gray-200"
              logs={productStatusNames}
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Public IP"
              background="bg-gray-50"
              textStyle="text-blue-400"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="clientIp"
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Operator information to be shown in LOC"
              background="bg-blue-900"
              textStyle="font-bold text-white"
              borderStyle="border-l border-white"
              logs={logs}
              attribute="null"
            />
            <ProjectLogTableTr
              title="Company Name*"
              background="bg-gray-100"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="companyName"
              editing={editing}
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Country"
              background="bg-gray-100"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="country"
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Company Address"
              background="bg-gray-50"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="companyAddress"
              editing={editing}
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Representative*"
              background="bg-gray-100"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="representativeName"
              editing={editing}
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Company ID*"
              background="bg-gray-50"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="companyId"
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Applicant Information"
              background="bg-blue-900"
              textStyle="font-bold text-white"
              borderStyle="border-l border-white"
              logs={logs}
              attribute="null"
            />
            <ProjectLogTableTr
              title="Full Name*"
              background="bg-gray-50"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="applicantName"
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Email*"
              background="bg-gray-100"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="applicantEmail"
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Phone"
              background="bg-gray-50"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="applicantPhone"
              editing={editing}
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Product Information"
              background="bg-blue-900"
              textStyle="font-bold text-white"
              borderStyle="border-l border-white"
              logs={logs}
              attribute="null"
            />
            <ProjectLogTableTr
              title="Application Type*"
              background="bg-gray-50"
              borderStyle="border-l border-gray-200"
              logs={applicacionTypesNames}
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Component*"
              background="bg-gray-100"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="component"
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Operator ID (OP ID)*"
              background="bg-gray-50"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="operatorId"
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Product Provider Name*"
              background="bg-gray-100"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="productProviderName"
              editing={editing}
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="Product Name*"
              background="bg-gray-50"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="serverName"
              editing={editing}
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="EMVCo Reference Number"
              background="bg-gray-100"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="emvcoReferenceNumber"
              editing={editing}
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="EMVCo Approval Expiration Date*"
              background="bg-gray-50"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="emvcoApprovalExpirationDate"
              editing={editing}
              edit={editAttribute}
            />
            <ProjectLogTableTr
              title="EMV 3-D Secure Protocol Version*"
              background="bg-gray-100"
              borderStyle="border-l border-gray-200"
              logs={logs}
              attribute="emv3dSecureProtocolVersion"
              edit={editAttribute}
            />
            {!!projectsLogs &&
            projectsLogs.length > 0 &&
            !!projectsLogs[0].component ? (
              projectsLogs[0].component == 'ACS' ? (
                <>
                  <ProjectLogTableTr
                    title="ACS UI Options Native"
                    background="bg-blue-900"
                    textStyle="font-bold text-white"
                    borderStyle="border-l border-white"
                    logs={logs}
                    attribute="null"
                  />
                  <ProjectLogTableTr
                    title="Protocol 2.1.0"
                    background="bg-blue-400"
                    textStyle="font-bold text-white"
                    borderStyle="border-l border-white"
                    logs={logs}
                    attribute="null"
                  />
                  <ProjectLogTableTr
                    title="Text Ui (01)"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="textUiAcsNative21"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Single Select UI (02)"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="singleSelectUiAcsNative21"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Multi Select (03)"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="multiSelectUiAcsNative21"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="OOB UI (04)"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="oobUiAcsNative21"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Protocol 2.2.0"
                    background="bg-blue-400"
                    textStyle="font-bold text-white"
                    borderStyle="border-l border-white"
                    logs={logs}
                    attribute="null"
                  />
                  <ProjectLogTableTr
                    title="Text Ui (01)"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="textUiAcsNative22"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Single Select UI (02)"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="singleSelectUiAcsNative22"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Multi Select (03)"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="multiSelectUiAcsNative22"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="OOB UI (04)"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="oobUiAcsNative22"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="ACS UI Options HTML"
                    background="bg-blue-900"
                    textStyle="font-bold text-white"
                    borderStyle="border-l border-white"
                    logs={logs}
                    attribute="null"
                  />
                  <ProjectLogTableTr
                    title="Protocol 2.1.0"
                    background="bg-blue-400"
                    textStyle="font-bold text-white"
                    borderStyle="border-l border-white"
                    logs={logs}
                    attribute="null"
                  />
                  <ProjectLogTableTr
                    title="Text Ui (01)"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="textUiAcsHtml21"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Single Select UI (02)"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="singleSelectUiAcsHtml21"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Multi Select (03)"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="multiSelectUiAcsHtml21"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="OOB UI (04)"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="oobUiAcsHtml21"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="HTML Other UI"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="htmlOtherUiAcsHtml21"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Protocol 2.2.0"
                    background="bg-blue-400"
                    textStyle="font-bold text-white"
                    borderStyle="border-l border-white"
                    logs={logs}
                    attribute="null"
                  />
                  <ProjectLogTableTr
                    title="Text Ui (01)"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="textUiAcsHtml22"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Single Select UI (02)"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="singleSelectUiAcsHtml22"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Multi Select (03)"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="multiSelectUiAcsHtml22"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="OOB UI (04)"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="oobUiAcsHtml22"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="HTML Other UI"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="htmlOtherUiAcsHtml22"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Implementation Plan with Issuer"
                    background="bg-blue-900"
                    textStyle="font-bold text-white"
                    borderStyle="border-l border-white"
                    logs={logs}
                    attribute="null"
                  />
                  <ProjectLogTableTr
                    title="No Planned Schedule"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="noPlanScheduleIssuer"
                    // editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Preferred Test Schedule from"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="preferredTestScheduleIssuersFrom"
                    // editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Preferred Test Schedule to"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="preferredTestScheduleIssuersTo"
                    // editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Acquirer/Issuer Name"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="acquirerNameIssuers"
                    // editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Launch date"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="launchDateIssuers"
                    // editing={editing}
                    edit={editAttribute}
                  />
                </>
              ) : (
                <>
                  <ProjectLogTableTr
                    title="3DS SDK Information 1"
                    background="bg-blue-900"
                    textStyle="font-bold text-white"
                    borderStyle="border-l border-white"
                    logs={logs}
                    attribute="null"
                  />
                  <ProjectLogTableTr
                    title="Product Provider Name"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="productProviderNameSdk1"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="SDK Name"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="nameSdk1"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="EMVCo SDK Reference Number"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="referenceNumberSdk1"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="SDK Protocol Version"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="protocolVersionSdk1"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Approval Expiration Date"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="approvalExpirationDateSdk1"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="3DS SDK Information 2"
                    background="bg-blue-900"
                    textStyle="font-bold text-white"
                    borderStyle="border-l border-white"
                    logs={logs}
                    attribute="null"
                  />
                  <ProjectLogTableTr
                    title="Product Provider Name"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="productProviderNameSdk2"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="SDK Name"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="nameSdk2"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="EMVCo SDK Reference Number"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="referenceNumberSdk2"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="SDK Protocol Version"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="protocolVersionSdk2"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Approval Expiration Date"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="approvalExpirationDateSdk2"
                    editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Implementation Plan with Acquirer"
                    background="bg-blue-900"
                    textStyle="font-bold text-white"
                    borderStyle="border-l border-white"
                    logs={logs}
                    attribute="null"
                  />
                  <ProjectLogTableTr
                    title="No Planned Schedule"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="noPlanAcquiererMerchantPsp"
                    // editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Preferred Test Schedule from"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="testScheduleAcquiererMerchantPspFrom"
                    // editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Preferred Test Schedule to"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="testScheduleAcquiererMerchantPspTo"
                    // editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Acquirer/Issuer Name"
                    background="bg-gray-100"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="nameAcquiererMerchantPsp"
                    // editing={editing}
                    edit={editAttribute}
                  />
                  <ProjectLogTableTr
                    title="Launch date"
                    background="bg-gray-50"
                    borderStyle="border-l border-gray-200"
                    logs={logs}
                    attribute="launchDateAcquiererMerchantPsp"
                    // editing={editing}
                    edit={editAttribute}
                  />
                </>
              )
            ) : (
              ''
            )}
          </tbody>
        </table>
      </div>
      {errorMsg && (
        <div className="text-center p-3 bg-red-400 rounded-lg">
          <p className="text-xl font-medium text-white">{errorMsg}</p>
        </div>
      )}

      <div className="mt-6 ml-2">
        <div className="w-full lg:w-auto flex">
          {editing ? (
            <>
              <Btn
                label="cancel"
                xtra="w-full md:w-auto mr-4"
                secondary
                isDisable={submitted}
                onClick={() => setEditing(false)}
              />
              <Btn
                label="submit"
                xtra="w-full md:w-auto"
                onClick={e => editProjectsLog(e)}
                isDisable={submitted}
              />
            </>
          ) : (
            <Btn label="edit" ico="edit" onClick={() => setEditing(true)} />
          )}
        </div>
      </div>
    </>
  );
}
