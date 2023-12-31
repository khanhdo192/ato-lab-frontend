import React, { useEffect, useState } from 'react';
import TestSessionTableDetailsTr from './testSessionTableDetailsTr';
import { IcoArwSort } from '@/components/icons';
import { nullDataTestSessionDetail as nullData } from '@/utils/nullData';

export default function TestSessionTableDetails({
  testCaseResults = [],
  handlerChangeTestCase,
}) {
  const [tests, setTests] = useState(
    !!testCaseResults
      ? testCaseResults.length < 15
        ? testCaseResults.concat(nullData)
        : testCaseResults
      : []
  );
  const [sortedBy, setSortedBy] = useState('');
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    setIsSorted(false);
  }, [isSorted]);

  useEffect(() => {
    setTests(
      !!testCaseResults
        ? testCaseResults.length < 15
          ? testCaseResults.concat(nullData)
          : testCaseResults
        : nullData
    );
  }, [testCaseResults]);

  const sortTest = value => {
    let testsSorted = [];
    const testsWithoutNull = tests.filter(test => !!test.tcResultId);
    if (sortedBy === value) testsSorted = testsWithoutNull.reverse();
    else {
      setSortedBy(value);
      if (
        value == 'tcId' ||
        value == 'channel' ||
        value == 'category' ||
        value == 'result'
      ) {
        testsSorted = testsWithoutNull.sort((a, b) =>
          a[value] > b[value] ? -1 : a[value] < b[value] ? 1 : 0
        );
      }
    }
    setTests(testsSorted.concat(nullData));
    setIsSorted(true);
  };

  return (
    <div className="border border-gray-400 rounded-xl pt-7 pl-7 pr-7 h-full">
      <div class="flex justify-between">
        <h1 className="text-lg mb-3 font-semibold tracking-wide">Results</h1>
        <div className="flex">
          <p className="font-medium">
            Total: {!!testCaseResults ? testCaseResults.length : 0}
          </p>
          <p className="pl-3 font-medium">
            Passed:{' '}
            {!!testCaseResults
              ? testCaseResults.filter(test => test.result != 0).length
              : 0}
          </p>
          <p className="pl-3 font-medium">
            Failed:{' '}
            {!!testCaseResults
              ? testCaseResults.filter(test => test.result == 0).length
              : 0}
          </p>
          <p className="pl-3 font-medium">
            N/A:{' '}
            {!!testCaseResults
              ? testCaseResults.filter(
                  test => test.result == null || test.result == undefined
                ).length
              : 0}
          </p>
        </div>
      </div>
      <div style={{ height: '90%' }}>
        <table className="table-auto rounded-xl h-full table-scrolling overflow-hidden">
          <thead className="w-full bg-blue-900">
            <tr className="text-left">
              <th
                className="bg-blue-900 text-white text-sm float-left"
                style={{ width: '35%' }}
              >
                <button
                  className="px-4 py-2 w-full no-sel flex"
                  onClick={() => sortTest('tcId')}
                >
                  <p className="mr-1">TC ID</p>
                  <IcoArwSort
                    className={
                      'fill-current w-3 h-4 mt-px transform' +
                      (!!sortedBy.match('tcId')
                        ? 'text-gr-600'
                        : 'rotate-180 text-gr-300')
                    }
                  />
                </button>
              </th>
              <th className="normal bg-blue-900 text-white text-sm">
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
              <th className="normal bg-blue-900 text-white text-sm">
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
              <th className="normal bg-blue-900 text-white text-sm">
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
            </tr>
          </thead>
          <tbody className="w-full">
            {tests?.map((test, index) => {
              return (
                <TestSessionTableDetailsTr
                  test={test}
                  background={index % 2 == 0 ? 'bg-gray-50' : 'bg-gray-100'}
                  handlerChangeTestCase={handlerChangeTestCase}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
