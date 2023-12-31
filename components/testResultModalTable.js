import React, { useEffect, useState } from 'react';
import TestResultModalTableTr from './testResultModalTableTr';
import { IcoArwSort } from '@/components/icons';
import { postFetcher } from '@/lib/fetcher';
import ModalConfimationTestReport from './modalConfimationTestReport';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import { useRouter } from 'next/router';
import { nullDataTestResult as nullData } from '@/utils/nullData';
import { getDate } from '@/utils/calculate';

export default function TestResultModalTable({
  currentStep,
  setCurrentStep,
  product,
  closeModal,
  setStatusId,
  info,
}) {
  const router = useRouter();
  const [tests, setTests] = useState(nullData);
  const [editing, setEditing] = useState(false);
  const [sortedBy, setSortedBy] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [testReportId, setTestReportId] = useState(null);
  const [testsPassed, setTestsPassed] = useState(0);
  const [testsFailed, setTestsFailed] = useState(0);
  const [testsExecuted, setTestsExecuted] = useState(0);
  const [testsApplicable, setTestsApplicable] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const operatorId = info?.operatorId || '';
  const protocolVersion = info?.product?.protocolVersion || '';
  const approvalDate =
    info?.resultsReviewStage?.resultsReviewStage?.verdictCode === 3
      ? info?.resultsReviewStage?.resultsReviewStage?.modifyDate
      : '';

  useEffect(() => {
    setIsSorted(false);
  }, [isSorted]);

  useEffect(() => {
    // The admin can't generate report. So, in all steps the reports were generated automatically.
    // if (currentStep == 3 || currentStep == 4) {
    async function generateReports() {
      try {
        const res = await postFetcher({})(
          `/tester/products/tc/generateTestResult/${product}`
        );
        const testList = res?.result?.data?.testReportDetailList;
        const testReportId = res?.result?.data?.testReportId;
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
          testsExecuted = testList.filter(test => !!test.result).length;
          testsApplicable = testList.length;
        }
        setTestsExecuted(testsExecuted);
        setTestsApplicable(testsApplicable);
        setTestsPassed(testsPassed);
        setTestsFailed(testsFailed);
        setTestReportId(testReportId);
        setTests(
          !!testList
            ? testList.length < 15
              ? testList.concat(nullData)
              : testList
            : nullData
        );
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.rtnCode === '9897') {
          router.push('/login');
        }
        setTests([]);
      }
    }
    generateReports();
    // }
  }, [currentStep]);

  const sortTest = value => {
    let testsSorted = [];
    if (sortedBy === value) testsSorted = tests.reverse();
    else {
      setSortedBy(value);
      if (
        value == 'testCaseId' ||
        value == 'protocol' ||
        value == 'channel' ||
        value == 'category'
      ) {
        testsSorted = tests.sort((a, b) =>
          a[value] > b[value] ? -1 : a[value] < b[value] ? 1 : 0
        );
      } else if (value == 'runTime') {
        testsSorted = tests.sort((a, b) =>
          getDate(a.runTime) >= getDate(b.runTime)
            ? 1
            : getDate(a.runTime) <= getDate(b.runTime)
            ? -1
            : 0
        );
      } else if (value == 'result') {
        testsSorted = tests.sort((a, b) => {
          if (a.result == 0 && (b.result == 1 || b.result == null)) return -1;
          if (b.result == 0 && (a.result == 1 || a.result == null)) return 1;
          return 0;
        });
      }
    }
    setTests(testsSorted);
    setIsSorted(true);
  };

  const editTesterComments = (testReportDetailId, value) => {
    const newTests = tests.map(test => {
      if (test.testReportDetailId == testReportDetailId) {
        test.waiverTesterComment = value;
      }
      return test;
    });
    setTests(newTests);
  };

  const openModal = e => {
    e.preventDefault();
    setEditing(false);
    setShowModal(true);
  };

  const generateReports = async () => {
    try {
      const res = await postFetcher({})(
        `/tester/products/tc/generateTestResult/${product}`
      );
      const testList = res?.result?.data?.testReportDetailList;
      if (!testList) {
        setErrorMsg('Test report is empty');
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
        return;
      }
      const testReportId = res?.result?.data?.testReportId;
      let testsFailed = 0;
      let testsPassed = 0;
      let testsExecuted = 0;
      let testsApplicable = 0;
      if (!!testList) {
        testList.forEach(test => {
          if (test.result == 1) {
            testsPassed += 1;
          } else if (test.result == 0) {
            testsFailed += 1;
          }
        });
        testsExecuted = testList.filter(test => test.result != null).length;
        testsApplicable = testList.length;
      }
      setTestsExecuted(testsExecuted);
      setTestsApplicable(testsApplicable);
      setTestsPassed(testsPassed);
      setTestsFailed(testsFailed);
      setTestReportId(testReportId);
      setTests(
        !!testList
          ? testList.length < 15
            ? testList.concat(nullData)
            : testList
          : nullData
      );
      setCurrentStep(2);
      setEditing(true);
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      setErrorMsg('Something went wrong while trying to get the test report');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
      setTests(nullData);
    }
  };

  const submitReport = async e => {
    e.preventDefault();
    try {
      const sendTest = tests.filter(test => !!test.testReportDetailId);
      const testReportStatusSubmittedCode = 2;
      await postFetcher({
        productId: product,
        testReportId,
        status: testReportStatusSubmittedCode,
        testReportDetailList: sendTest,
      })('/tester/products/tc/generateTestResult/update-test-result');
      setCurrentStep(3);
      setStatusId(3);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
    }
  };

  return (
    <div className="h-full pb-28">
      <h1 className="text-xl mb-3 font-semibold tracking-wide">Test Results</h1>
      <table className="table-auto rounded-xl h-full table-scrolling overflow-hidden">
        <thead className="w-full bg-blue-900">
          <tr className="text-left">
            <th
              className={`${
                !editing ? 'bg-blue-900' : 'bg-blue-900 bg-opacity-75'
              } text-white border-r border-white text-sm float-left`}
              style={{ width: '180px' }}
            >
              <button
                className="px-4 py-2 w-full no-sel flex border-none"
                onClick={() => sortTest('testCaseId')}
              >
                <p className="mr-1">TC ID</p>
                <IcoArwSort
                  className={
                    'fill-current w-3 h-4 mt-px transform' +
                    (!!sortedBy.match('testCaseId')
                      ? 'text-gr-600'
                      : 'rotate-180 text-gr-300')
                  }
                />
              </button>
            </th>
            <th
              className={`${
                !editing ? 'bg-blue-900' : 'bg-blue-900 bg-opacity-75'
              } text-white border-r border-white text-sm large`}
            >
              <button
                className="px-4 py-2 w-full no-sel flex"
                onClick={() => sortTest('protocol')}
              >
                <p className="mr-1">Protocol</p>
                <IcoArwSort
                  className={
                    'fill-current w-3 h-4 mt-px transform' +
                    (!!sortedBy.match('protocol')
                      ? 'text-gr-600'
                      : 'rotate-180 text-gr-300')
                  }
                />
              </button>
            </th>
            <th
              className={`${
                !editing ? 'bg-blue-900' : 'bg-blue-900 bg-opacity-75'
              } text-white border-r border-white text-sm float-left`}
              style={{ width: '170px' }}
            >
              <button
                className="px-4 py-2 w-full no-sel flex"
                onClick={() => sortTest('runTime')}
              >
                <p className="mr-1">Time</p>
                <IcoArwSort
                  className={
                    'fill-current w-3 h-4 mt-px transform' +
                    (!!sortedBy.match('runTime')
                      ? 'text-gr-600'
                      : 'rotate-180 text-gr-300')
                  }
                />
              </button>
            </th>
            <th
              className={`${
                !editing ? 'bg-blue-900' : 'bg-blue-900 bg-opacity-75'
              } text-white border-r border-white text-sm large`}
            >
              <button
                className="px-4 py-2 w-full no-sel flex"
                onClick={() => sortTest('channel')}
              >
                <p className="mr-1">Channel</p>
                <IcoArwSort
                  className={
                    'fill-current w-3 h-4 mt-px transform' +
                    (!!sortedBy.match('channel')
                      ? 'text-gr-600'
                      : 'rotate-180 text-gr-300')
                  }
                />
              </button>
            </th>
            <th
              className={`${
                !editing ? 'bg-blue-900' : 'bg-blue-900  bg-opacity-75'
              } text-white border-r border-white text-sm large`}
            >
              <button
                className="px-4 py-2 w-full no-sel flex"
                onClick={() => sortTest('category')}
              >
                <p className="mr-1">Category</p>
                <IcoArwSort
                  className={
                    'fill-current w-3 h-4 mt-px transform' +
                    (!!sortedBy.match('category')
                      ? 'text-gr-600'
                      : 'rotate-180 text-gr-300')
                  }
                />
              </button>
            </th>
            <th
              className={`${
                !editing ? 'bg-blue-900' : 'bg-blue-900 bg-opacity-75'
              } text-white border-r border-white text-sm large`}
            >
              <button
                className="px-4 py-2 w-full no-sel flex"
                onClick={() => sortTest('result')}
              >
                <p className="mr-1">Result</p>
                <IcoArwSort
                  className={
                    'fill-current w-3 h-4 mt-px transform' +
                    (!!sortedBy.match('result')
                      ? 'text-gr-600'
                      : 'rotate-180 text-gr-300')
                  }
                />
              </button>
            </th>
            <th
              className={`${
                !editing ? 'bg-blue-900' : 'bg-blue-900 bg-opacity-75'
              } px-4 py-2 text-white border-r border-white text-sm float-left`}
              style={{ width: '220px' }}
            >
              Waiver Comments (Tester)
            </th>
            <th
              className={`${
                !editing ? 'bg-blue-900' : 'bg-blue-900 bg-opacity-75'
              } px-4 py-2 text-white text-sm float-left`}
              style={{ width: '200px' }}
            >
              Waiver Comments (JCB)
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {tests?.map((test, index) => {
            return (
              <TestResultModalTableTr
                test={test}
                background={index % 2 == 0 ? 'bg-gray-50' : 'bg-gray-200'}
                // backgroundEditing={
                //   index % 2 == 0
                //     ? 'bg-gray-500 bg-opacity-75'
                //     : 'bg-gray-600 bg-opacity-75'
                // }
                index={index}
                borderStyle="border-r border-gray-500"
                editing={editing}
                editTesterComments={editTesterComments}
              />
            );
          })}
        </tbody>
      </table>
      <div className="mt-3 flex justify-around">
        <h1 className="text-lg mb-3 font-semibold tracking-wide">
          Total Test Cases Applicable: {testsApplicable}
        </h1>
        <h1 className="text-lg mb-3 font-semibold tracking-wide">
          Total Test Cases Executed: {testsExecuted}
        </h1>
        <h1 className="text-lg mb-3 font-semibold tracking-wide">
          Total Test Cases Passed: {testsPassed}
        </h1>
        <h1 className="text-lg mb-3 font-semibold tracking-wide">
          Total Test Cases Failed: {testsFailed}
        </h1>
      </div>
      <div className="mt-4 flex justify-between">
        {currentStep == 1 ? (
          <button
            onClick={() => generateReports()}
            // This botton never is enabled since that page
            disabled={true}
            className="bg-gray-400 py-2 px-6 text-white rounded-xl"
          >
            Generate reports
          </button>
        ) : (
          <button
            onClick={e => openModal(e)}
            className={`bg-gray-400 py-2 px-6 text-white rounded-xl`}
            //This botton never is enabled since that page
            disabled={true}
          >
            Submit Report
          </button>
        )}
        <p className="text-2xl text-red-500">{errorMsg}</p>
        {currentStep == 1 && (
          <CSVLink
            data={
              !!tests && tests.length > 0
                ? tests.filter(test => !!test.testCaseId)
                : []
            }
            headers={[
              { label: 'TC ID', key: 'testCaseId' },
              { label: 'Protocol', key: 'protocol' },
              { label: 'Time', key: 'runTime' },
              { label: 'Channel', key: 'channel' },
              { label: 'Category', key: 'category' },
              { label: 'Result', key: 'result' },
              { label: 'Waiver Comments(Tester)', key: 'waiverTesterComment' },
              { label: 'Waiver Comments (JCB)', key: 'waiverJcbComment' },
            ]}
            filename={
              operatorId
                ? `${operatorId}${
                    protocolVersion ? `_${protocolVersion}` : ''
                  }${
                    approvalDate
                      ? `_${moment(approvalDate).format('YYYY-MM-DD')}`
                      : ''
                  }.csv`
                : 'test_results.csv'
            }
          >
            <button className="bg-blue-600 py-2 px-6 text-white rounded-xl">
              Export Test Results
            </button>
          </CSVLink>
        )}
      </div>
      {showModal && (
        <ModalConfimationTestReport
          isOpenModal={showModal}
          closeModal={() => setShowModal(false)}
          submitReport={submitReport}
        />
      )}
    </div>
  );
}
