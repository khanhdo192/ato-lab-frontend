import React, { useEffect, useState } from 'react';
import TestResultTableTr from './testResultTableTr';
import { IcoArwSort } from '@/components/icons';
import { postFetcher } from '@/lib/fetcher';
import { CSVLink } from 'react-csv';
import omit from 'lodash/omit';
import moment from 'moment';
import Spinner from './spinner';
import { useRouter } from 'next/router';
import { getDate } from '@/utils/calculate';

export default function TestResultTable({
  user,
  testResults,
  nullData,
  testReportId,
  testsPassed,
  testsFailed,
  testsExecuted,
  testsApplicable,
  canEdit,
  id,
  info,
}) {
  const router = useRouter();
  const [tests, setTests] = useState([]);
  const [editing, setEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedBy, setSortedBy] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const [editedNow, setEditedNow] = useState(false);
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
    setTests(
      !!testResults
        ? testResults.sort((a, b) =>
            a.testCaseId < b.testCaseId
              ? -1
              : a.testCaseId > b.testCaseId
              ? 1
              : 0
          )
        : []
    );
  }, [testResults]);

  const changeResult = async e => {
    e.preventDefault();
    try {
      setSubmitted(true);
      setIsLoading(true);
      const sendTest = tests.filter(test => !!test.testReportDetailId);
      const testReportStatusSubmittedCode = 2;

      await postFetcher({
        productId: id,
        testReportId,
        status: testReportStatusSubmittedCode,
        testReportDetailList: sendTest,
      })('/tester/products/tc/generateTestResult/update-test-result');
      setSubmitted(false);
      setEditing(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      setIsLoading(false);
    }
  };

  const sortTest = value => {
    let testsSorted = [];
    const testsWithoutNullData = tests.filter(test => !!test.testCaseId);
    if (sortedBy === value) testsSorted = testsWithoutNullData.reverse();
    else {
      setSortedBy(value);
      if (
        value == 'testCaseId' ||
        value == 'protocol' ||
        value == 'channel' ||
        value == 'category'
      ) {
        testsSorted = testsWithoutNullData.sort((a, b) =>
          a[value] > b[value] ? -1 : a[value] < b[value] ? 1 : 0
        );
      } else if (value == 'time') {
        testsSorted = testsWithoutNullData.sort((a, b) =>
          getDate(a.time) >= getDate(b.time)
            ? 1
            : getDate(a.time) <= getDate(b.time)
            ? -1
            : 0
        );
      } else if (value == 'result') {
        testsSorted = testsWithoutNullData.sort((a, b) => {
          if (a.result == 0 && (b.result == 1 || b.result == null)) return -1;
          if (b.result == 0 && (a.result == 1 || a.result == null)) return 1;
          return 0;
        });
      }
    }
    setTests(testsSorted.concat(nullData));
    setIsSorted(true);
  };

  const edit = (testCaseId, name, value) => {
    const newTests = tests.map(test => {
      if (test.testCaseId == testCaseId) {
        test[name] = value;
      }
      return test;
    });
    setTests(newTests);
  };

  return (
    <div>
      <h1 className="text-xl mb-3 font-semibold tracking-wide">Test Results</h1>
      <div className="overflow-scroll">
        <table className="table-auto w-full mb-4">
          <thead>
            <tr className="text-left">
              <th
                className={`${
                  !editing ? 'bg-blue-900 bg-opacity-75' : 'bg-blue-900'
                } text-white border-r border-white text-sm`}
              >
                <button
                  className="px-4 py-2 w-full no-sel flex"
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
                  !editing ? 'bg-blue-900 bg-opacity-75' : 'bg-blue-900'
                } text-white border-r border-white text-sm`}
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
                  !editing ? 'bg-blue-900 bg-opacity-75' : 'bg-blue-900'
                } text-white border-r border-white text-sm`}
              >
                <button
                  className="px-4 py-2 w-full no-sel flex"
                  onClick={() => sortTest('time')}
                >
                  <p className="mr-1">Time</p>
                  <IcoArwSort
                    className={
                      'fill-current w-3 h-4 mt-px transform' +
                      (!!sortedBy.match('time')
                        ? 'text-gr-600'
                        : 'rotate-180 text-gr-300')
                    }
                  />
                </button>
              </th>
              <th
                className={`${
                  !editing ? 'bg-blue-900 bg-opacity-75' : 'bg-blue-900'
                } text-white border-r border-white text-sm`}
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
                  !editing ? 'bg-blue-900 bg-opacity-75' : 'bg-blue-900'
                } text-white border-r border-white text-sm`}
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
                  !editing ? 'bg-blue-900 bg-opacity-75' : 'bg-blue-900'
                } text-white border-r border-white text-sm`}
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
                  !editing ? 'bg-blue-900 bg-opacity-75' : 'bg-blue-900'
                } px-4 py-2 text-white border-r border-white text-sm`}
              >
                Waiver Comments(Tester)
              </th>
              <th
                className={`${
                  !editing ? 'bg-blue-900 bg-opacity-75' : 'bg-blue-900'
                } px-4 py-2 text-white text-sm`}
              >
                Waiver Comments (JCB)
              </th>
            </tr>
          </thead>
          <tbody className="relative">
            {tests?.map((test, index) => {
              return (
                <TestResultTableTr
                  key={`testResultTr-${index}`}
                  test={test}
                  backgroundEditing={
                    index % 2 == 0 ? 'bg-gray-50' : 'bg-gray-100'
                  }
                  background={
                    index % 2 == 0
                      ? 'bg-gray-500 bg-opacity-50'
                      : 'bg-gray-600 bg-opacity-50'
                  }
                  borderStyle="border-r border-gray-500"
                  edit={edit}
                  editing={editing}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="py-4 flex lg:justify-around sm:gap-4 flex-col sm:flex-row">
        <h1 className="lg:text-lg font-semibold tracking-wide">
          Total Test Cases Applicable: {testsApplicable}
        </h1>
        <h1 className="lg:text-lg font-semibold tracking-wide">
          Total Test Cases Executed: {testsExecuted}
        </h1>
        <h1 className="lg:text-lg font-semibold tracking-wide">
          Total Test Cases Passed: {testsPassed}
        </h1>
        <h1 className="lg:text-lg font-semibold tracking-wide">
          Total Test Cases Failed: {testsFailed}
        </h1>
      </div>
      <div className="mt-5 flex-col sm:flex-row gap-4 flex justify-between">
        {editing ? (
          <div className="flex">
            <button
              className="bg-gray-500 py-2 px-9 rounded-lg text-white mr-6"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 px-5 rounded-lg text-white flex items-center justify-between gap-4"
              onClick={e => changeResult(e)}
              disabled={submitted}
            >
              <Spinner isLoading={isLoading} />
              Save Changes
            </button>
          </div>
        ) : (
          <button
            className={`${
              !canEdit ? 'cursor-default bg-gray-400' : 'bg-blue-600'
            } py-2 px-9 rounded-lg text-white w-max`}
            onClick={() => setEditing(true)}
            disabled={!canEdit}
          >
            Edit
          </button>
        )}
        <CSVLink
          data={
            !!tests && tests.length > 0
              ? tests
                  .filter(test => !!test.testCaseId)
                  .map(test =>
                    omit(
                      {
                        ...test,
                        result:
                          test.result == 2
                            ? 'WAIVER'
                            : test.result == 0
                            ? 'FAIL'
                            : test.result == 1
                            ? 'PASS'
                            : test.result,
                      },
                      'testReportDetailId'
                    )
                  )
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
              ? `${operatorId}${protocolVersion ? `_${protocolVersion}` : ''}${
                  approvalDate
                    ? `_${moment(approvalDate).format('YYYY-MM-DD')}`
                    : ''
                }.csv`
              : 'test_results.csv'
          }
        >
          <button
            className={`bg-blue-600 text-white font-medium px-5 py-2 border border-gray-600 rounded-lg`}
          >
            Export Test Results
          </button>
        </CSVLink>
      </div>
      <div className="mt-4">
        {editedNow ? (
          <p>
            Updated at {new Date().toLocaleString()} by {user?.fullName}
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
