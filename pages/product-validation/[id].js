import React, { useState, useEffect, useMemo } from 'react';
import useSWR, { cache } from 'swr';
import { useRouter } from 'next/router';
import { postFetcher, fetcher } from '@/lib/fetcher';
import upperFirst from 'lodash/upperFirst';
import get from 'lodash/get';
import toPairs from 'lodash/toPairs';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import Switch from '@/components/switch';
import Nav from '@/components/nav';
import UserThumb from '@/components/userThumb';
import Divider from '@/components/divider';
import BtnStep from '@/components/btnStep';
import BtnUp from '@/components/btnUp';
import FormAssetLabel from '@/components/formAssetLabel';
import FormItemInput from '@/components/formItemInput';
import FormItemSelect from '@/components/formItemSelect';
import FormItemTextarea from '@/components/formItemTextarea';
import Footer from '@/components/footer';
import ProjectLogTable from '@/components/projectLogTable';
import TestResultTable from '@/components/testResultTable';
import Container from '@/components/container';
import FeedbackMsg from '@/components/feedbackMsg';
import ComplianceLetterManagement from '@/components/complianceLetterManagement';
import Link from 'next/link';
import Spinner from '@/components/spinner';
import { UpdateStatusObject } from '@/constants/index';
import moment from 'moment';
import Header from '@/components/header';
import { nullDataTestResult as nullData } from '@/utils/nullData';

const switchTabs = {
  0: () => <div className="hidden lg:block" style={{ marginTop: '25rem' }} />,
  1: ({
    info,
    editing,
    setEditing,
    option,
    setUpdateStatus,
    engineer,
    setEngineer,
    trackingNo,
    setTrackingNo,
    commentsToOperatorStep1,
    setCommentsToOperatorStep1,
    internalCommentsStep1,
    setInternalCommentsStep1,
    scenario,
    sendEmailJCB,
    sendEmailOperator,
    handlerSendEmail,
    referenceNumber,
    setReferenceNumber,
    operatorId1,
    setOperatorId1,
    operatorId2,
    setOperatorId2,
    operatorId3,
    setOperatorId3,
    operatorId4,
    setOperatorId4,
    tittle,
    handlerSubmitStepOne,
    submitted,
    feedback,
    projectsLogs,
    accountStatusNames,
    loaStatusNames,
    productStatusNames,
    applicacionTypesNames,
    emailOperatorDisabled,
    emailJcbDisabled,
    handlerChangeScenario,
    defaultOptionStep1,
    scenarioDisabled,
    productFromDashboard,
  }) => (
    <div>
      <Container styles={{ padding: '0' }}>
        <div className="flex flex-col md:flex-row mt-7">
          <div className="md:w-1/2">
            <h1 className="text-xl ml-2 mb-2 font-semibold tracking-wide">
              Project Status
            </h1>
            <div className="flex flex-col lg:flex-row justify-between">
              <FormItemSelect
                id="sel1"
                name="selEngineer"
                label="JCB Staff*"
                isDisabled={!editing}
                value={engineer}
                onChange={e => setEngineer(e.target.value)}
                error={get(feedback, 'type') === 'error' && isEmpty(engineer)}
                errorMsg={
                  get(feedback, 'type') === 'error' && isEmpty(engineer)
                    ? 'Select an Engineer'
                    : ''
                }
              >
                <option selected={engineer === ''} value="">
                  Select Engineer
                </option>
                {!isEmpty(info.engineers)
                  ? info.engineers.map((engineer, index) => (
                      <option
                        key={index}
                        value={engineer.name}
                        selected={option === engineer.name}
                      >
                        {engineer.name}
                      </option>
                    ))
                  : null}
              </FormItemSelect>
              <FormItemSelect
                id="sel2"
                name="selStatus"
                label="Update Status*"
                isDisabled={!editing}
                value={option}
                onChange={e => setUpdateStatus(e.target.value)}
                error={get(feedback, 'type') === 'error' && isEmpty(option)}
                errorMsg={
                  get(feedback, 'type') === 'error' && isEmpty(option)
                    ? 'Select a Diffent Status'
                    : ''
                }
                updateDate={
                  info.profileReviewStage?.profileReviewStage?.modifyDate
                    ? `Updated at ${moment(
                        info.profileReviewStage?.profileReviewStage?.modifyDate
                      ).format('YYYY-MM-DD HH:mm:ss')}`
                    : null
                }
              >
                <option value={''} selected={isEmpty(option)}>
                  {defaultOptionStep1}
                </option>
                {!isEmpty(info?.profileReviewStage?.options)
                  ? Object.keys(info.profileReviewStage.options).map(
                      (key, index) => {
                        const element = info.profileReviewStage.options[key];
                        return (
                          <option
                            key={`optionStep1-${index}`}
                            value={key}
                            disabled={element.disabled ? true : null}
                            selected={
                              info.profileReviewStage.profileReviewStage
                                .verdictCode == key.toString()
                            }
                          >
                            {upperFirst(element.name)}
                          </option>
                        );
                      }
                    )
                  : null}
              </FormItemSelect>
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/2">
                <FormItemInput
                  id="fi0"
                  label="Tracking NO."
                  placeholder="-"
                  value={trackingNo}
                  isDisabled={!editing}
                  onChange={e => setTrackingNo(e.target.value)}
                />
              </div>
              <div className="sm:w-1/2 mt-auto">
                <Switch
                  label="Email Operator"
                  xtra="m-n"
                  isDisable={!editing || !emailOperatorDisabled}
                  isActive={sendEmailOperator}
                  onClick={() => handlerSendEmail('Operator')}
                />
                <Switch
                  label="Email JCB"
                  xtra="mt-2"
                  isDisable={!editing || !emailJcbDisabled}
                  isActive={sendEmailJCB}
                  onClick={() => handlerSendEmail('JCB')}
                />
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h1 className="text-xl ml-2 mb-2 font-semibold tracking-wide">
              Operator Summary
            </h1>
            <div className="flex flex-col lg:flex-row justify-between">
              <FormItemSelect
                id="sel3"
                name="Scenario"
                label="Scenario*"
                isDisabled={
                  !editing ||
                  scenarioDisabled ||
                  accountStatusNames?.includes('Access Approved')
                }
                value={scenario}
                onChange={e => handlerChangeScenario(e.target.value)}
                error={get(feedback, 'type') === 'error' && isEmpty(scenario)}
                errorMsg={
                  get(feedback, 'type') === 'error' && isEmpty(scenario)
                    ? 'Select a Scenario'
                    : ''
                }
              >
                <option value={''} selected={isEmpty(scenario)}>
                  Select Scenario
                </option>
                {!isEmpty(info.profileReviewStage.scenarios)
                  ? Object.keys(info.profileReviewStage.scenarios).map(
                      (key, index) => {
                        const option = info.profileReviewStage.scenarios[key];
                        return (
                          <option
                            key={`optionSceStep1-${index}`}
                            value={key}
                            selected={
                              key ==
                              info.profileReviewStage.profileReviewStage
                                .scenario
                            }
                          >
                            {upperFirst(option.name)}
                          </option>
                        );
                      }
                    )
                  : null}
              </FormItemSelect>
              <FormItemInput
                id="fi1"
                label={tittle.tittleServerReferenceNumber}
                value={referenceNumber}
                placeholder="EMVCo Reference Number"
                isDisabled={
                  !editing || accountStatusNames?.includes('Access Approved')
                }
                onChange={e => setReferenceNumber(e.target.value)}
                error={
                  get(feedback, 'type') === 'error' && isEmpty(referenceNumber)
                }
                errorMsg={
                  get(feedback, 'type') === 'error' && isEmpty(referenceNumber)
                    ? 'Empty Field'
                    : ''
                }
              />
            </div>
            <div className="ml-2">
              <FormAssetLabel
                className="ml-9"
                label={tittle.tittleServerOperatorId}
              />
            </div>
            <div className="flex flex-row justify-between">
              <FormItemInput
                id="fi7"
                styles="text-center"
                value={operatorId1}
                isDisabled={true}
                onChange={e => setOperatorId1(e.target.value)}
              />
              <FormItemInput
                id="fi8"
                value={operatorId2}
                styles="text-center"
                isDisabled={true}
                onChange={e => setOperatorId2(e.target.value)}
              />
              <FormItemInput
                id="fi9"
                value={operatorId3}
                styles="text-center"
                isDisabled={true}
                onChange={e => setOperatorId3(e.target.value)}
              />
              <FormItemInput
                id="fi10"
                value={operatorId4}
                max={6}
                styles="text-center"
                isDisabled={true}
                onChange={e => setOperatorId4(e.target.value)}
                error={
                  get(feedback, 'type') === 'error' &&
                  (isEmpty(operatorId4) || operatorId4.length !== 6)
                }
                errorMsg={
                  get(feedback, 'type') === 'error' &&
                  (isEmpty(operatorId4) || operatorId4.length !== 6)
                    ? 'Must be 6 digits'
                    : ''
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row -mb-5">
          <div className="md:w-1/2">
            <FormItemTextarea
              id="fi10"
              label="Comments to Operator"
              placeholder="Comments will be included in the status emails sent to the product operator's admin's email."
              rows="4"
              value={commentsToOperatorStep1 || ''}
              isDisabled={!editing}
              onChange={e => setCommentsToOperatorStep1(e.target.value)}
              maxlength={1000}
            />
          </div>
          <div className="md:w-1/2">
            <FormItemTextarea
              id="fi18"
              label="JCB Internal Comments"
              value={internalCommentsStep1 || ''}
              placeholder="JCB internal comments only. Operatons will not see this comments."
              rows="4"
              isDisabled={!editing}
              onChange={e => setInternalCommentsStep1(e.target.value)}
              maxlength={1000}
            />
          </div>
        </div>
        {!!feedback && (
          <FeedbackMsg type={feedback.type} text={feedback.text} />
        )}
        <div className="mt-4 ml-2">
          {editing ? (
            <div className="flex flex-wrap gap-4">
              <button
                className="bg-gray-400 py-2 px-9 rounded-lg text-white mr-6"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button
                className={`${
                  scenarioDisabled ? 'bg-gray-400' : 'bg-blue-600'
                } py-2 px-9 rounded-lg text-white`}
                onClick={() => handlerSubmitStepOne()}
                disabled={submitted || scenarioDisabled}
              >
                {submitted ? <Spinner isLoading={submitted} /> : 'Submit'}
              </button>
            </div>
          ) : (
            <button
              className={`${
                ![
                  'New Operator',
                  'Re Certify',
                  'New Protocol',
                  'Information Update',
                  'Renew Access Requested',
                ].includes(accountStatusNames?.[0])
                  ? 'bg-gray-400'
                  : 'bg-blue-600'
              } py-2 px-9 rounded-lg text-white`}
              onClick={() => setEditing(true)}
              disabled={
                ![
                  'New Operator',
                  'Re Certify',
                  'New Protocol',
                  'Information Update',
                  'Renew Access Requested',
                ].includes(accountStatusNames?.[0])
              }
            >
              Edit
            </button>
          )}
        </div>

        <Divider />
        <h1 className="text-xl ml-2 mb-8 font-semibold tracking-wide">
          Project Log
        </h1>
        <ProjectLogTable
          projectsLogs={projectsLogs}
          accountStatusNames={accountStatusNames}
          loaStatusNames={loaStatusNames}
          productStatusNames={productStatusNames}
          applicacionTypesNames={applicacionTypesNames}
        />
      </Container>
    </div>
  ),
  2: ({
    info,
    editing,
    setEditing,
    submitted,
    feedback,
    option,
    engineer,
    setEngineer,
    scenario,
    setScenario,
    handlerSubmitStepTwo,
    trackingNo,
    setTrackingNo,
    commentsToOperatorStep2,
    setCommentsToOperatorStep2,
    internalCommentsStep2,
    setInternalCommentsStep2,
    sendEmailJCB,
    sendEmailOperator,
    handlerSendEmail,
    referenceNumber,
    setReferenceNumber,
    operatorId1,
    setOperatorId1,
    operatorId2,
    setOperatorId2,
    operatorId3,
    setOperatorId3,
    operatorId4,
    setOperatorId4,
    tittle,
    user,
    emailOperatorDisabled,
    emailJcbDisabled,
    setUpdateStatus,
    defaultOptionStep2,
    testResults,
    testReportId,
    testsPassed,
    testsFailed,
    testsExecuted,
    testsApplicable,
    id,
    nullData,
    productFromDashboard,
    accountStatusNames,
  }) => (
    <Container styles={{ padding: '0' }}>
      <div className="flex flex-col md:flex-row mt-7">
        <div className="md:w-1/2">
          <h1 className="text-xl ml-2 mb-2 font-semibold tracking-wide">
            Project Status
          </h1>
          <div className="flex flex-col lg:flex-row justify-between">
            <FormItemSelect
              id="sel1"
              name="selEngineer"
              label="JCB Staff*"
              isDisabled={!editing}
              value={engineer}
              onChange={e => setEngineer(e.target.value)}
              error={get(feedback, 'type') === 'error' && isEmpty(engineer)}
              errorMsg={
                get(feedback, 'type') === 'error' && isEmpty(engineer)
                  ? 'Select an Engineer'
                  : ''
              }
            >
              <option selected={engineer === ''} value="">
                Select Engineer
              </option>
              {!isEmpty(info.engineers)
                ? info.engineers.map((engineer, index) => (
                    <option
                      key={index}
                      value={engineer.name}
                      selected={option === engineer.name}
                    >
                      {engineer.name}
                    </option>
                  ))
                : null}
            </FormItemSelect>
            <FormItemSelect
              id="sel2"
              name="selStatus"
              label="Update Status*"
              isDisabled={!editing}
              value={option}
              onChange={e => setUpdateStatus(e.target.value)}
              error={get(feedback, 'type') === 'error' && isEmpty(option)}
              errorMsg={
                get(feedback, 'type') === 'error' && isEmpty(option)
                  ? 'Select a Diffent Status'
                  : ''
              }
              updateDate={
                info.resultsReviewStage?.resultsReviewStage?.modifyDate
                  ? `Updated at ${moment(
                      info.resultsReviewStage?.resultsReviewStage?.modifyDate
                    ).format('YYYY-MM-DD HH:mm:ss')}`
                  : null
              }
            >
              <option value={''} selected={isEmpty(option)}>
                {defaultOptionStep2}
              </option>
              {!isEmpty(info?.resultsReviewStage?.options)
                ? Object.keys(info.resultsReviewStage.options).map(
                    (key, index) => {
                      const element = info.resultsReviewStage.options[key];
                      return (
                        <option
                          key={`reviewStep2-${index}`}
                          value={key}
                          // disabled={element.disabled ? true : null}
                          selected={
                            info.resultsReviewStage.resultsReviewStage
                              .verdictCode == key.toString()
                          }
                        >
                          {upperFirst(element.name)}
                        </option>
                      );
                    }
                  )
                : null}
            </FormItemSelect>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/2">
              <FormItemInput
                id="fi0"
                label="Tracking NO."
                placeholder="-"
                value={trackingNo}
                isDisabled={!editing}
                onChange={e => setTrackingNo(e.target.value)}
              />
            </div>
            <div className="sm:w-1/2 mt-auto">
              <Switch
                label="Email Operator"
                xtra="m-n"
                isDisable={!editing || !emailOperatorDisabled}
                isActive={sendEmailOperator}
                onClick={() => handlerSendEmail('Operator')}
              />
              <Switch
                label="Email JCB"
                xtra="mt-2"
                isDisable={!editing || !emailJcbDisabled}
                isActive={sendEmailJCB}
                onClick={() => handlerSendEmail('JCB')}
              />
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-xl ml-2 mb-2 font-semibold tracking-wide">
            Operator Summary
          </h1>
          <div className="flex flex-col lg:flex-row justify-between">
            <FormItemSelect
              id="sel3"
              name="Scenario"
              label="Scenario*"
              isDisabled={true}
              value={scenario}
              onChange={e => setScenario(e.target.value)}
              error={get(feedback, 'type') === 'error' && isEmpty(scenario)}
              errorMsg={
                get(feedback, 'type') === 'error' && isEmpty(scenario)
                  ? 'Select a Scenario'
                  : ''
              }
            >
              <option value={''} selected={isEmpty(scenario)}>
                Select Scenario
              </option>
              {!isEmpty(info.profileReviewStage.scenarios)
                ? Object.keys(info.profileReviewStage.scenarios).map(
                    (key, index) => {
                      const option = info.profileReviewStage.scenarios[key];
                      return (
                        <option
                          key={`scenarioStep2-${index}`}
                          value={key}
                          selected={
                            key ==
                            info.profileReviewStage.profileReviewStage.scenario
                          }
                        >
                          {upperFirst(option.name)}
                        </option>
                      );
                    }
                  )
                : null}
            </FormItemSelect>
            <FormItemInput
              id="fi1"
              label={tittle.tittleServerReferenceNumber}
              value={referenceNumber}
              placeholder="EMVCo Reference Number"
              isDisabled={
                !editing || accountStatusNames?.includes('Access Approved')
              }
              onChange={e => setReferenceNumber(e.target.value)}
              error={
                get(feedback, 'type') === 'error' && isEmpty(referenceNumber)
              }
              errorMsg={
                get(feedback, 'type') === 'error' && isEmpty(referenceNumber)
                  ? 'Empty Field'
                  : ''
              }
            />
          </div>
          <div className="ml-2">
            <FormAssetLabel
              className="ml-9"
              label={tittle.tittleServerOperatorId}
            />
          </div>

          <div className="flex flex-row justify-between">
            <FormItemInput
              id="fi7"
              styles="text-center"
              value={operatorId1}
              isDisabled={true}
              onChange={e => setOperatorId1(e.target.value)}
            />
            <FormItemInput
              id="fi8"
              value={operatorId2}
              styles="text-center"
              isDisabled={true}
              onChange={e => setOperatorId2(e.target.value)}
            />
            <FormItemInput
              id="fi9"
              value={operatorId3}
              styles="text-center"
              isDisabled={true}
              onChange={e => setOperatorId3(e.target.value)}
            />
            <FormItemInput
              id="fi10"
              value={operatorId4}
              max={6}
              styles="text-center"
              isDisabled={true}
              onChange={e => setOperatorId4(e.target.value)}
              error={
                get(feedback, 'type') === 'error' &&
                (isEmpty(operatorId4) || operatorId4.length !== 6)
              }
              errorMsg={
                get(feedback, 'type') === 'error' &&
                (isEmpty(operatorId4) || operatorId4.length !== 6)
                  ? 'Must be 6 digits'
                  : ''
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row -mb-5">
        <div className="md:w-1/2">
          <FormItemTextarea
            id="fi10"
            label="Comments to Operator"
            placeholder="Comments will be included in the status emails sent to the product operator's admin's email."
            rows="4"
            value={commentsToOperatorStep2 || ''}
            isDisabled={!editing}
            onChange={e => setCommentsToOperatorStep2(e.target.value)}
            maxlength={1000}
          />
        </div>
        <div className="md:w-1/2">
          <FormItemTextarea
            id="fi18"
            label="JCB Internal Comments"
            value={internalCommentsStep2 || ''}
            placeholder="JCB internal comments only. Operatons will not see this comments."
            rows="4"
            isDisabled={!editing}
            onChange={e => setInternalCommentsStep2(e.target.value)}
            maxlength={1000}
          />
        </div>
      </div>
      {!!feedback && <FeedbackMsg type={feedback.type} text={feedback.text} />}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mt-4">
        <div className="ml-2">
          {editing ? (
            <div className="flex flex-wrap gap-4">
              <button
                className="bg-gray-400 py-2 px-9 rounded-lg text-white mr-6"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 py-2 px-9 rounded-lg text-white"
                onClick={() => handlerSubmitStepTwo()}
                disabled={submitted}
              >
                {submitted ? <Spinner isLoading={submitted} /> : 'Submit'}
              </button>
            </div>
          ) : (
            <button
              className={`${
                !(info?.product?.status == 102 || info?.product?.status == 203)
                  ? 'cursor-default bg-gray-400'
                  : ' bg-blue-600'
              }  py-2 px-9 rounded-lg text-white`}
              onClick={() => setEditing(true)}
              disabled={
                !(info?.product?.status == 102 || info?.product?.status == 203)
              }
            >
              Edit
            </button>
          )}
        </div>
        <div className="mx-2">
          <button className="bg-blue-600 py-2 px-9 rounded-lg text-white">
            <Link href={`/test-case/${id}`}>View Test Panel</Link>
          </button>
        </div>
      </div>

      <Divider />
      <TestResultTable
        user={user}
        testResults={testResults}
        nullData={nullData}
        testReportId={testReportId}
        testsPassed={testsPassed}
        testsFailed={testsFailed}
        testsExecuted={testsExecuted}
        testsApplicable={testsApplicable}
        canEdit={info?.product?.status > 101}
        id={id}
        info={info}
      />
    </Container>
  ),
  3: ({
    info,
    editing,
    setEditing,
    submitted,
    feedback,
    option,
    engineer,
    setEngineer,
    handlerSubmitStepThree,
    trackingNo,
    scenario,
    setScenario,
    setTrackingNo,
    handlerSendEmail,
    referenceNumber,
    setReferenceNumber,
    operatorId1,
    setOperatorId1,
    operatorId2,
    setOperatorId2,
    operatorId3,
    setOperatorId3,
    operatorId4,
    setOperatorId4,
    tittle,
    user,
    setUpdateStatus,
    editNowStepTwo,
    id,
  }) => (
    <Container styles={{ padding: '0' }}>
      <div className="flex flex-col md:flex-row mt-7">
        <div className="md:w-1/2">
          <h1 className="text-xl ml-2 mb-2 font-semibold tracking-wide">
            Project Status
          </h1>
          <div className="flex flex-col lg:flex-row justify-between">
            <FormItemSelect
              id="sel1"
              name="selEngineer"
              label="JCB Staff*"
              isDisabled={true}
              value={engineer}
              onChange={e => setEngineer(e.target.value)}
              error={get(feedback, 'type') === 'error' && isEmpty(engineer)}
              errorMsg={
                get(feedback, 'type') === 'error' && isEmpty(engineer)
                  ? 'Select an Engineer'
                  : ''
              }
            >
              <option selected={engineer === ''} value="">
                Select Engineer
              </option>
              {!isEmpty(info.engineers)
                ? info.engineers.map((engineer, index) => (
                    <option
                      key={index}
                      value={engineer.name}
                      selected={option === engineer.name}
                    >
                      {engineer.name}
                    </option>
                  ))
                : null}
            </FormItemSelect>
            <FormItemSelect
              id="sel2"
              name="selStatus"
              label="Update Status*"
              isDisabled={!editing}
              value={option}
              onChange={e => setUpdateStatus(e.target.value)}
              error={get(feedback, 'type') === 'error' && isEmpty(option)}
              errorMsg={
                get(feedback, 'type') === 'error' && isEmpty(option)
                  ? 'Select a Diffent Status'
                  : ''
              }
              updateDate={
                info.approvalStage?.approvalStage?.modifyDate
                  ? `Updated at ${moment(
                      info.approvalStage?.approvalStage?.modifyDate
                    ).format('YYYY-MM-DD HH:mm:ss')}`
                  : null
              }
            >
              {!isEmpty(info?.approvalStage?.options)
                ? Object.keys(info.approvalStage.options).map((key, index) => {
                    const element = info.approvalStage.options[key];
                    return (
                      <option
                        key={`optionStep3-${index}`}
                        value={key}
                        disabled={element.disabled ? true : null}
                        selected={
                          info.approvalStage.approvalStage.verdictCode ==
                          key.toString()
                        }
                      >
                        {upperFirst(element.name)}
                      </option>
                    );
                  })
                : null}
            </FormItemSelect>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/2">
              <FormItemInput
                id="fi0"
                label="Tracking NO."
                placeholder="-"
                value={trackingNo}
                isDisabled={true}
                onChange={e => setTrackingNo(e.target.value)}
              />
            </div>
            <div className="sm:w-1/2 mt-auto">
              <Switch
                label="Email Operator"
                xtra="m-n "
                isDisable={true}
                isActive={true}
                onClick={() => handlerSendEmail('Operator')}
              />
              <Switch
                label="Email JCB"
                xtra="mt-2"
                isDisable={true}
                isActive={true}
                onClick={() => handlerSendEmail('JCB')}
              />
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-xl ml-2 mb-2 font-semibold tracking-wide">
            Operator Summary
          </h1>
          <div className="flex flex-col lg:flex-row justify-between">
            <FormItemSelect
              id="sel3"
              name="Scenario"
              label="Scenario*"
              isDisabled={true}
              value={scenario}
              onChange={e => setScenario(e.target.value)}
              error={get(feedback, 'type') === 'error' && isEmpty(scenario)}
              errorMsg={
                get(feedback, 'type') === 'error' && isEmpty(scenario)
                  ? 'Select a Scenario'
                  : ''
              }
            >
              <option value={''} selected={isEmpty(scenario)}>
                Select Scenario
              </option>
              {!isEmpty(info.profileReviewStage.scenarios)
                ? Object.keys(info.profileReviewStage.scenarios).map(
                    (key, index) => {
                      const option = info.profileReviewStage.scenarios[key];
                      return (
                        <option
                          key={`scenarioStep3-${index}`}
                          value={key}
                          selected={
                            key ==
                            info.profileReviewStage.profileReviewStage.scenario
                          }
                        >
                          {upperFirst(option.name)}
                        </option>
                      );
                    }
                  )
                : null}
            </FormItemSelect>
            <FormItemInput
              id="fi1"
              label={tittle.tittleServerReferenceNumber}
              value={referenceNumber}
              placeholder="EMVCo Reference Number"
              isDisabled={true}
              onChange={e => setReferenceNumber(e.target.value)}
              error={
                get(feedback, 'type') === 'error' && isEmpty(referenceNumber)
              }
              errorMsg={
                get(feedback, 'type') === 'error' && isEmpty(referenceNumber)
                  ? 'Empty Field'
                  : ''
              }
            />
          </div>
          <div className="ml-2">
            <FormAssetLabel
              className="ml-9"
              label={tittle.tittleServerOperatorId}
            />
          </div>
          <div className="flex flex-row justify-between">
            <FormItemInput
              id="fi7"
              styles="text-center"
              value={operatorId1}
              isDisabled={true}
              onChange={e => setOperatorId1(e.target.value)}
            />
            <FormItemInput
              id="fi8"
              value={operatorId2}
              styles="text-center"
              isDisabled={true}
              onChange={e => setOperatorId2(e.target.value)}
            />
            <FormItemInput
              id="fi9"
              value={operatorId3}
              styles="text-center"
              isDisabled={true}
              onChange={e => setOperatorId3(e.target.value)}
            />
            <FormItemInput
              id="fi10"
              value={operatorId4}
              max={6}
              styles="text-center"
              isDisabled={true}
              onChange={e => setOperatorId4(e.target.value)}
              error={
                get(feedback, 'type') === 'error' &&
                (isEmpty(operatorId4) || operatorId4.length !== 6)
              }
              errorMsg={
                get(feedback, 'type') === 'error' &&
                (isEmpty(operatorId4) || operatorId4.length !== 6)
                  ? 'Must be 6 digits'
                  : ''
              }
            />
          </div>
        </div>
      </div>
      {!!feedback && <FeedbackMsg type={feedback.type} text={feedback.text} />}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mt-4 mb-10">
        <div className="ml-2">
          {editing ? (
            <div className="flex flex-wrap gap-4">
              <button
                className="bg-gray-400 py-2 px-9 rounded-lg text-white mr-6"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 py-2 px-9 rounded-lg text-white"
                onClick={() => handlerSubmitStepThree()}
                disabled={submitted}
              >
                {submitted ? <Spinner isLoading={submitted} /> : 'Submit'}
              </button>
            </div>
          ) : (
            <button
              className={`${
                info?.product?.status === 301
                  ? 'cursor-default bg-gray-400'
                  : ' bg-blue-600'
              }  py-2 px-9 rounded-lg text-white`}
              onClick={() => setEditing(true)}
              disabled={info?.product?.status === 301}
            >
              {info?.product?.status === 301 ? 'Completed' : 'Edit'}
            </button>
          )}
        </div>
        <div className="mx-2">
          <button className="bg-blue-600 py-2 px-9 rounded-lg text-white">
            <Link href={`/test-case/${id}`}>View Test Panel</Link>
          </button>
        </div>
      </div>
      <Divider />
      <ComplianceLetterManagement
        id={id}
        locInfo={info.approvalStage}
        // enable={info?.product?.status >= 301}
      />
    </Container>
  ),
};

const buttonLabel = ({
  label,
  step,
  status,
  tab,
  actualTab,
  changeTab,
  isDisable,
}) => (
  <BtnStep
    label={label}
    step={step}
    status={status}
    isActive={actualTab == tab}
    isDisable={isDisable}
    onClick={() => changeTab(tab)}
  />
);

export default function ProductValidationPage({ user }) {
  const router = useRouter();
  const { id } = router.query;
  const [info, setInfo] = useState(null);
  const [productFromDashboard, setProductFromDashboard] = useState(null);
  const [option, setOption] = useState('');
  const [engineer, setEngineer] = useState('');
  const [trackingNo, setTrackingNo] = useState('');
  const [scenario, setScenario] = useState('');
  const [sendEmailJCB, setSendEmailJCB] = useState(true);
  const [sendEmailOperator, setSendEmailOperator] = useState(true);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [operatorId1, setOperatorId1] = useState('');
  const [operatorId2, setOperatorId2] = useState('');
  const [operatorId3, setOperatorId3] = useState('');
  const [operatorId4, setOperatorId4] = useState('');
  const [tittle, setTittle] = useState('');
  const [acquirerOrIssuers, setAcquirerOrIssuers] = useState('');
  const [commentsToOperatorStep1, setCommentsToOperatorStep1] = useState('');
  const [internalCommentsStep1, setInternalCommentsStep1] = useState('');
  const [commentsToOperatorStep2, setCommentsToOperatorStep2] = useState('');
  const [internalCommentsStep2, setInternalCommentsStep2] = useState('');
  const [projectLogSorted, setProjectLogSorted] = useState(null);
  const [tab, setTab] = useState('0');
  const [editing, setEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [sortedBy, setSortedBy] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const [projectsLogs, setProjectsLogs] = useState([]);
  const [accountStatusNames, setAccountStatusNames] = useState([]);
  const [loaStatusNames, setLoaStatusNames] = useState([]);
  const [productStatusNames, setProductStatusNames] = useState([]);
  const [applicacionTypesNames, setApplicacionTypesNames] = useState([]);
  const [emailOperatorDisabled, setEmailOperatorDisabled] = useState(true);
  const [emailJcbDisabled, setEmailJcbDisabled] = useState(true);
  const [testResults, setTestResults] = useState(false);
  const [testReportId, setTestReportId] = useState(null);
  const [testsPassed, setTestsPassed] = useState(0);
  const [testsFailed, setTestsFailed] = useState(0);
  const [testsExecuted, setTestsExecuted] = useState(0);
  const [testsApplicable, setTestsApplicable] = useState(0);
  const [editNowStepTwo, setEditNowStepTwo] = useState(false);
  const [defaultOptionStep1, setDefaultOptionStep1] = useState('Select Status');
  const [defaultOptionStep2, setDefaultOptionStep2] = useState('Select Status');
  const [scenarioDisabled, setScenarioDisabled] = useState(false);

  const tittles3DS = {
    tittleServerOperatorId: '3DS Server Operator ID*',
    tittleServerReferenceNumber: '3DS Server Reference Number*',
    tittleAcquirerOrIssuers: 'Acquirer Bin*',
  };

  const tittlesACS = {
    tittleServerOperatorId: 'ACS Operator ID*',
    tittleServerReferenceNumber: 'ACS Reference Number*',
    tittleAcquirerOrIssuers: 'Issuer Managed ID*',
  };

  const setUpdateStatus = value => {
    if (value == 2 && operatorId4 == 'XXXXXX') {
      setOption(value);
      setEmailOperatorDisabled(false);
      setEmailJcbDisabled(false);
    } else {
      setOption(value);
      setEmailOperatorDisabled(true);
      setEmailJcbDisabled(true);
    }
  };

  const handlerSendEmail = value => {
    switch (value) {
      case 'Operator':
        setSendEmailOperator(!sendEmailOperator);
        break;
      case 'JCB':
        setSendEmailJCB(!sendEmailJCB);
        break;
    }
  };

  const handlerChangeScenario = async value => {
    setScenario(value);
    const INTERNAL_TESTING_CODE = '2';
    if (value == INTERNAL_TESTING_CODE) {
      setOperatorId3('DUMY');
      setScenarioDisabled(true);
      try {
        const res = await fetcher(
          `/jcb/productProcess/getInternalTestingOperatorId`
        );
        if (res?.result?.id != null || res?.result?.id != undefined) {
          const id = (res.result.id + 1).toString();
          setOperatorId4(id.padStart(6, '0'));
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.rtnCode === '9897') {
          router.push('/login');
        }
        setFeedback({
          text: 'Something went wrong when trying to get the four part of operator id.',
          type: 'error',
        });
      }

      setScenarioDisabled(false);
    } else {
      const operator = info.operatorId.split('_');
      setOperatorId3(operator[2]);
      setOperatorId4(operator[3]);
    }
  };

  const {
    data: dataProductInfo,
    error: errorProductInfo,
    mutate,
    isValidating,
  } = useSWR(
    '/jcb/productProcess/getProductInfo',
    postFetcher({ productId: id }),
    { revalidateOnFocus: true }
  );

  const {
    data: dataProductsDashboard,
    error: errorProductsDashboard,
    mutate: mutateDash,
  } = useSWR('/jcb/dashboard', fetcher, { revalidateOnFocus: true });

  const {
    data: dataProjectLog,
    error: errorProjectLog,
    mutate: mutateProjectLog,
  } = useSWR(
    '/jcb/productProcess/getProjectLog',
    postFetcher({ productId: id }),
    {
      revalidateOnFocus: true,
    }
  );

  const { data: dataTestResult, error: errorTestResult } = useSWR(
    `/tester/products/tc/generateTestResult/${id}`,
    postFetcher({}),
    {
      revalidateOnFocus: true,
    }
  );

  const handlerSubmitStepOne = async () => {
    try {
      setFeedback(null);
      setSubmitted(true);

      const params = {
        productId: id,
        option,
        engineer,
        scenario,
        // acquirerOrIssuers,
        serverOperatorId:
          operatorId1 +
          '_' +
          operatorId2 +
          '_' +
          operatorId3 +
          '_' +
          operatorId4,
      };

      const optionalParams = {
        trackingNumber: trackingNo ? trackingNo : '',
        sendEmailOperator,
        sendEmailJCB,
        commentsToOp: commentsToOperatorStep1,
        jcbInternalComments: internalCommentsStep1,
        serverReferenceNumber: referenceNumber,
      };

      if (
        Object.values(params).some(e => isEmpty(e)) ||
        isEmpty(operatorId4) ||
        operatorId4.length !== 6
      ) {
        return setFeedback({
          text: 'Please check highlighted inputs and submit again',
          type: 'error',
        });
      }

      const body = { ...params, ...optionalParams };

      const updateProfileReview = await postFetcher(body)(
        '/jcb/productProcess/updateProfileReview'
      );
      if (updateProfileReview.rtnCode !== '1')
        setFeedback({ text: updateProfileReview?.message, type: 'error' });
      else {
        setFeedback({ text: 'Product updated successfully', type: 'success' });
        // go to empty tab when the product profile is Rejected
        if (option === '5') handlerChangeTab('0');
      }

      setEditing(false);
    } catch (e) {
      if (e?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      setFeedback({ text: e?.message, type: 'error' });
      setEditing(false);
    } finally {
      await onFinallySubmitStep();
    }
  };

  const handlerSubmitStepTwo = async () => {
    try {
      setFeedback(null);
      setSubmitted(true);

      const params = {
        productId: id,
        option,
        engineer,
        scenario,
      };

      const optionalParams = {
        // trackingNumber: trackingNo ? trackingNo : '',
        sendEmailOperator,
        sendEmailJCB,
        commentsToOp: commentsToOperatorStep2,
        jcbInternalComments: internalCommentsStep2,
      };

      if (Object.values(params).some(e => isEmpty(e))) {
        return setFeedback({
          text: 'Please check highlighted inputs and submit again',
          type: 'error',
        });
      }

      const body = { ...params, ...optionalParams };

      const response = await postFetcher(body)(
        '/jcb/productProcess/updateResultsReviewStage'
      );
      if (response.rtnCode !== '1') {
        setFeedback({ text: response?.message, type: 'error' });
      } else {
        if (!!response?.result?.fail) {
          setFeedback({ text: response?.result.fail.errMsg, type: 'error' });
        } else {
          // go to empty tab when the product profile is Rejected
          if (option === '3') handlerChangeTab('0');
          setFeedback({
            text: 'Product updated successfully',
            type: 'success',
          });
          setEditNowStepTwo(true);
        }
      }

      setEditing(false);
    } catch (e) {
      if (e?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      setFeedback({ text: e?.message, type: 'error' });
      setEditing(false);
    } finally {
      await onFinallySubmitStep();
    }
  };

  const handlerSubmitStepThree = async () => {
    try {
      setFeedback(null);
      setSubmitted(true);

      const params = {
        productId: id,
        option: parseInt(option),
        engineer: engineer,
        scenario: scenario,
      };
      // if (Object.values(params).some(e => isEmpty(e))) {
      //   return setFeedback({
      //     text: 'Please check highlighted inputs and submit again',
      //     type: 'error',
      //   });
      // }

      const response = await postFetcher(params)(
        '/jcb/productProcess/updateApproval'
      );
      if (response.rtnCode !== '1')
        setFeedback({ text: response?.message, type: 'error' });
      else {
        if (option == 1) handlerChangeTab('0');
        setFeedback({ text: 'Product updated successfully', type: 'success' });
      }

      setEditing(false);
    } catch (e) {
      if (e?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      setFeedback({ text: e?.message, type: 'error' });
      setEditing(false);
    } finally {
      await onFinallySubmitStep();
    }
  };

  const onFinallySubmitStep = async () => {
    setIsSorted(false);
    setSubmitted(false);
    setTimeout(() => setFeedback(null), 10000);
    const updateProduct = await postFetcher({ productId: id })(
      '/jcb/productProcess/getProductInfo'
    );
    const updateDash = await fetcher('/jcb/dashboard');
    const updateProjectLog = await postFetcher({ productId: id })(
      '/jcb/productProcess/getProjectLog'
    );
    mutate(updateProduct);
    mutateDash(updateDash);
    mutateProjectLog(updateProjectLog);
  };

  const handlerSubmitRestartUser = async () => {
    try {
      setFeedback(null);
      setSubmitted(true);

      const userId = info?.product?.userId;

      const response = await postFetcher({ userId: userId })(
        '/jcb/users/restart'
      );
      if (response?.rtnCode !== '1')
        setFeedback({ text: response?.message, type: 'error' });
      else {
        handlerChangeTab('1');
        setFeedback({
          text: 'Product restarted successfully',
          type: 'success',
        });
      }

      setEditing(false);
    } catch (e) {
      if (e?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      setFeedback({ text: e?.message, type: 'error' });
      setEditing(false);
    } finally {
      setSubmitted(false);
      return setTimeout(() => setFeedback(null), 10000);
    }
  };

  const handlerChangeTab = tab => {
    setTab(tab);
    setOption('');
    setEngineer('');
    setEditing(false);
    setFeedback(null);
    updateFieldsByTab(tab, info);
  };

  const checkSameDefaultStatus = (code, defaultName) => {
    if (code && UpdateStatusObject[code] === defaultName) {
      return true;
    }
    return false;
  };

  const updateFieldsByTab = (tab, info) => {
    if (!!get(info, 'product.trackingNo'))
      setTrackingNo(info.product.trackingNo);

    if (!!get(info, 'product.component')) {
      if (info.product.component == '3DS') {
        setTittle(tittles3DS);
      } else {
        setTittle(tittlesACS);
      }
    }

    if (!!get(info, 'operatorId')) {
      const operator = info.operatorId.split('_');
      setOperatorId1(operator[0]);
      setOperatorId2(operator[1]);
      setOperatorId3(operator[2]);
      setOperatorId4(operator[3]);
    }

    const profileReviewInfo = get(info, 'profileReviewStage');
    const resultsReviewInfo = get(info, 'resultsReviewStage');
    const approvalInfo = get(info, 'approvalStage');

    const profileReviewStage = get(profileReviewInfo, 'profileReviewStage');
    const resultsReviewStage = get(resultsReviewInfo, 'resultsReviewStage');
    const approvalStage = get(approvalInfo, 'approvalStage');

    switch (tab) {
      case '1':
        if (!!profileReviewStage) {
          const checkDefault = checkSameDefaultStatus(
            profileReviewStage.verdictCode,
            info.defaultNameStep1
          );
          setEngineer(profileReviewStage.engineer);
          setScenario(profileReviewStage.scenario);
          setOption(checkDefault ? '' : profileReviewStage.verdictCode);
          setReferenceNumber(profileReviewInfo.referenceServer);
          setAcquirerOrIssuers(profileReviewInfo.acquirerOrIssuers);
          setCommentsToOperatorStep1(profileReviewStage.commentsToOp);
          setInternalCommentsStep1(profileReviewStage.jcbInternalComments);
          setSendEmailJCB(
            profileReviewStage.sendEmailJCB === null
              ? true
              : profileReviewStage.sendEmailJCB
          );
          setSendEmailOperator(
            profileReviewStage.sendEmailOperator === null
              ? true
              : profileReviewStage.sendEmailOperator
          );
          setProjectLogSorted(profileReviewInfo.profileReviewStageLogs);
        }
        break;
      case '2':
        if (!!resultsReviewStage) {
          const checkDefault = checkSameDefaultStatus(
            resultsReviewStage.verdictCode,
            info.defaultNameStep2
          );

          if (!!profileReviewStage) {
            setScenario(profileReviewStage.scenario);
            setAcquirerOrIssuers(profileReviewInfo.acquirerOrIssuers);
            setReferenceNumber(profileReviewInfo.referenceServer);
          }
          setEngineer(resultsReviewStage.engineer);
          setOption(checkDefault ? '' : resultsReviewStage.verdictCode);
          setCommentsToOperatorStep2(resultsReviewStage.commentsToOp);
          setInternalCommentsStep2(resultsReviewStage.jcbInternalComments);
          setSendEmailJCB(
            resultsReviewStage.sendEmailJCB === null
              ? true
              : resultsReviewStage.sendEmailJCB
          );
          setSendEmailOperator(
            resultsReviewStage.sendEmailOperator === null
              ? true
              : resultsReviewStage.sendEmailOperator
          );
          setProjectLogSorted(resultsReviewInfo.resultsReviewStageLogs);
        }
        break;
      case '3':
        if (!!approvalStage) {
          const checkDefault = checkSameDefaultStatus(
            approvalStage.verdictCode,
            info.defaultNameStep1
          );

          if (!!resultsReviewStage) {
            setEngineer(resultsReviewStage.engineer);
          }
          if (!!profileReviewStage) {
            setScenario(profileReviewStage.scenario);
            setAcquirerOrIssuers(profileReviewInfo.acquirerOrIssuers);
            setReferenceNumber(profileReviewInfo.referenceServer);
          }
          setOption(approvalStage.verdictCode);
          setProjectLogSorted(approvalInfo.approvalStageLogs);
        }
        break;
    }
  };

  useEffect(() => setIsSorted(false), [isSorted]);

  useEffect(() => setIsSorted(true), [isValidating]);

  useMemo(() => {
    const _info = get(dataProductInfo, 'result', null);

    const newValues = toPairs(_info);
    const oldValues = toPairs(info);
    const isTheDataUpdated = !isEqual(newValues, oldValues);

    if (isTheDataUpdated) {
      setInfo(_info);
      setIsSorted(true);
      const profileReviewInfo = get(_info, 'profileReviewStage');
      const resultsReviewInfo = get(_info, 'resultsReviewStage');
      const approvalInfo = get(_info, 'approvalStage');
      const defaultOptionStep1 = get(_info, 'defaultNameStep1');
      const defaultOptionStep2 = get(_info, 'defaultNameStep2');
      const haveTabInfo =
        !!profileReviewInfo || !!resultsReviewInfo || !!approvalInfo;

      setDefaultOptionStep1(defaultOptionStep1);
      setDefaultOptionStep2(defaultOptionStep2);

      if (!editing && !!haveTabInfo) updateFieldsByTab(tab, _info);
    }

    if (errorProductInfo) {
      setTab('0');
      setInfo(null);
      setOption('');
      setEditing(false);
    }
  }, [dataProductInfo, errorProductInfo]);

  useMemo(() => {
    if (dataProductsDashboard?.result) {
      setProductFromDashboard(
        dataProductsDashboard?.result?.data.find(
          product => product.productId == id
        )
      );
    }
    if (errorProductsDashboard) {
      setProductFromDashboard(null);
      localStorage.setItem('isIdle', false);
      if (errorProductsDashboard?.response?.data?.rtnCode === '9897') {
        router.reload();
      }
    }
  }, [dataProductsDashboard, errorProductsDashboard]);

  useMemo(() => {
    if (dataTestResult?.result) {
      const testList = dataTestResult?.result?.data?.testReportDetailList;
      const testReportId = dataTestResult?.result?.data?.testReportId;
      let testsFailed = 0;
      let testsPassed = 0;
      let testsExecuted = 0;
      let testsApplicable = 0;
      if (!!testList) {
        testList.forEach(test => {
          if (test.result == 1) {
            testsPassed += 1;
          } else {
            testsFailed += 1;
          }
        });
        testsExecuted = testList.filter(test => test?.result !== null).length;
        testsApplicable = testList.length;
      }
      setTestsExecuted(testsExecuted);
      setTestsApplicable(testsApplicable);
      setTestsPassed(testsPassed);
      setTestsFailed(testsFailed);
      setTestReportId(testReportId);
      setTestResults(
        !!testList
          ? testList.length < 15
            ? testList.concat(nullData)
            : testList
          : nullData
      );
    }
    if (errorTestResult) {
      setTestResults([]);
    }
  }, [dataTestResult, errorTestResult]);

  useMemo(() => {
    if (dataProjectLog?.result) {
      let projectsLogs = dataProjectLog?.result?.projectLogs;
      projectsLogs = projectsLogs?.map(log => {
        log.createDate = `${log.createDate.split('T')[0]} ${
          log.createDate.split('T')[1]
        } (UTC)`;
        return log;
      });
      const accountStatusNames = dataProjectLog?.result?.accountStatusNames;
      const loaStatusNames = dataProjectLog?.result?.loaStatusNames;
      const productStatusNames = dataProjectLog?.result?.productStatusNames;
      const applicacionTypesNames =
        dataProjectLog?.result?.applicacionTypesNames;

      setProjectsLogs(projectsLogs);
      setAccountStatusNames(accountStatusNames);
      setLoaStatusNames(loaStatusNames);
      setProductStatusNames(productStatusNames);
      setApplicacionTypesNames(applicacionTypesNames);
    }
    if (errorProjectLog) {
      setProjectsLogs([]);
      setAccountStatusNames([]);
      setLoaStatusNames([]);
      setProductStatusNames([]);
    }
  }, [dataProjectLog, errorProjectLog]);

  useEffect(() => {
    return function cleanup() {
      console.warn('unmounting component');
      cache.clear();
    };
  }, [id]);

  return (
    <main className="relative flex justify-center w-full min-h-screen 2xl:min-h-main m-auto max-w-1688 2xl:my-8 2xl:pl-8">
      <Nav
        status={isSideBarOpen}
        setStatus={setIsSideBarOpen}
        activeSection={'product-profile'}
      />
      <div className="relative z-0 w-full 2xl:w-10/12 lg:w-11/12 p-2 lg:pt-2 lg:ml-menu-lg 2xl:ml-menu py:0 lg:px-8">
        <Header setStatus={setIsSideBarOpen}>
          <div className="hidden lg:block">
            <h1 className="text-gr-500 text-xl font-medium tracking-wide">
              Product Management{' '}
              <span className="text-b-800 font-semibold">
                {productFromDashboard?.companyName}
              </span>
            </h1>
            <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-3">
              {!!get(info, 'product.name') && (
                <h2 className="text-gr-500 mb-4 text-base tracking-wide">
                  Product name{' '}
                  <span className="text-b-800 font-semibold">
                    {info.product.name}
                  </span>
                </h2>
              )}
              {!!get(user, 'fullName') && (
                <h2 className="text-gr-500 mb-4 text-base tracking-wide">
                  JCB Staff{' '}
                  <span className="text-b-800 font-semibold">
                    {user.fullName}
                  </span>
                </h2>
              )}
            </div>
          </div>
          <UserThumb alt={!!user ? user.fullName : ''} />
        </Header>
        <div className="pl-4 block lg:hidden">
          <h1 className="text-gr-500 text-xl font-medium tracking-wide">
            Product Management{' '}
            <span className="text-b-800 font-semibold">
              {productFromDashboard?.companyName}
            </span>
          </h1>
          <div className="flex flex-col">
            {!!get(info, 'product.name') && (
              <h2 className="text-gr-500 text-base tracking-wide">
                Product name{' '}
                <span className="text-b-800 font-semibold">
                  {info.product.name}
                </span>
              </h2>
            )}
            {!!get(user, 'fullName') && (
              <h2 className="text-gr-500 mb-4 text-base tracking-wide">
                JCB Staff{' '}
                <span className="text-b-800 font-semibold">
                  {user.fullName}
                </span>
              </h2>
            )}
          </div>
        </div>
        <section>
          <Container>
            <div className="flex space-x-2 lg:space-x-4 mb-4">
              {buttonLabel({
                label: 'Account & Product Review',
                step: '1',
                status:
                  info?.profileReviewStage && info?.product.status >= 102
                    ? info?.resultsReviewStage
                      ? 'green'
                      : 'red'
                    : 'red',
                tab: '1',
                actualTab: tab,
                changeTab: handlerChangeTab,
                isDisable: !info?.profileReviewStage,
              })}
              {buttonLabel({
                label: 'Compliance Test Review',
                step: '2',
                status: info?.resultsReviewStage
                  ? info?.approvalStage
                    ? 'green'
                    : 'red'
                  : '',
                tab: '2',
                actualTab: tab,
                changeTab: handlerChangeTab,
                isDisable: !info?.resultsReviewStage,
              })}
              {buttonLabel({
                label: 'Issue Compliance Letter',
                step: '3',
                status: '',
                tab: '3',
                actualTab: tab,
                changeTab: handlerChangeTab,
                isDisable: !info?.approvalStage,
              })}
            </div>
            {errorProductInfo && (
              <div className="">
                {' '}
                <FeedbackMsg
                  type="error"
                  text="Error at loading the product"
                />{' '}
              </div>
            )}
            {switchTabs[tab]({
              productFromDashboard,
              info,
              isValidating,
              editing,
              setEditing,
              option,
              setOption,
              setUpdateStatus,
              engineer,
              setEngineer,
              trackingNo,
              setTrackingNo,
              commentsToOperatorStep1,
              setCommentsToOperatorStep1,
              internalCommentsStep1,
              setInternalCommentsStep1,
              commentsToOperatorStep2,
              setCommentsToOperatorStep2,
              internalCommentsStep2,
              setInternalCommentsStep2,
              scenario,
              setScenario,
              sendEmailJCB,
              sendEmailOperator,
              setSendEmailJCB,
              setSendEmailOperator,
              handlerSendEmail,
              referenceNumber,
              setReferenceNumber,
              operatorId1,
              setOperatorId1,
              operatorId2,
              setOperatorId2,
              operatorId3,
              setOperatorId3,
              operatorId4,
              setOperatorId4,
              tittle,
              setTittle,
              acquirerOrIssuers,
              setAcquirerOrIssuers,
              handlerSubmitStepOne,
              handlerSubmitStepTwo,
              handlerSubmitStepThree,
              handlerSubmitRestartUser,
              submitted,
              feedback,
              user,
              router,
              projectLogSorted,
              setProjectLogSorted,
              sortedBy,
              setSortedBy,
              isSorted,
              setIsSorted,
              projectsLogs,
              accountStatusNames,
              loaStatusNames,
              productStatusNames,
              applicacionTypesNames,
              emailOperatorDisabled,
              emailJcbDisabled,
              testResults,
              testReportId,
              testsPassed,
              testsFailed,
              testsExecuted,
              testsApplicable,
              editNowStepTwo,
              id,
              defaultOptionStep1,
              defaultOptionStep2,
              handlerChangeScenario,
              nullData,
              scenarioDisabled,
            })}
          </Container>
        </section>
        <BtnUp />
        <Footer />
      </div>
    </main>
  );
}
