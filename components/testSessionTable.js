import React, { useEffect, useState } from 'react';
import TestSessionTableTr from './testSessionTableTr';
import { IcoArwSort } from '@/components/icons';
import { nullDataTestSession as nullData } from '@/utils/nullData';
import { getDate, sortSession } from '@/utils/calculate';

export default function testSessionTable({ userTestSets, setSession }) {
  const [tests, setTests] = useState([]);
  const [sortedBy, setSortedBy] = useState('');
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    setIsSorted(false);
  }, [isSorted]);

  useEffect(() => {
    setTests(
      !!userTestSets
        ? userTestSets.length < 15
          ? userTestSets.concat(nullData).sort(sortSession)
          : userTestSets.sort(sortSession)
        : []
    );
  }, [userTestSets]);

  const sortTest = value => {
    let testsSorted = [];
    const testsWithoutNull = tests.filter(test => !!test.id);
    if (sortedBy === value) testsSorted = testsWithoutNull.reverse();
    else {
      setSortedBy(value);
      if (value == 'session' || value == 'testSetLength') {
        testsSorted = testsWithoutNull.sort((a, b) =>
          a[value] > b[value] ? -1 : a[value] < b[value] ? 1 : 0
        );
      } else if (value == 'createdTime') {
        testsSorted = testsWithoutNull.sort((a, b) =>
          getDate(a.time) >= getDate(b.time)
            ? 1
            : getDate(a.time) <= getDate(b.time)
            ? -1
            : 0
        );
      }
    }
    setTests(testsSorted.concat(nullData));
    setIsSorted(true);
  };

  return (
    <div className="border border-gray-400 rounded-xl pt-7 pl-7 pr-7 h-full">
      <h1 className="text-lg mb-3 font-semibold tracking-wide">
        Test Sessions
      </h1>
      <div style={{ height: '90%' }}>
        <table className="table-auto rounded-xl h-full table-scrolling overflow-hidden">
          <thead className="w-full bg-blue-900">
            <tr className="text-left">
              <th
                className="bg-blue-900 text-white text-sm float-left"
                style={{ width: '30%' }}
              >
                <button
                  className="px-4 py-2 w-full no-sel flex"
                  onClick={() => sortTest('session')}
                >
                  <p className="mr-1">Session</p>
                  <IcoArwSort
                    className={
                      'fill-current w-3 h-4 mt-px transform' +
                      (!!sortedBy.match('session')
                        ? 'text-gr-600'
                        : 'rotate-180 text-gr-300')
                    }
                  />
                </button>
              </th>
              <th
                className="bg-blue-900 text-white text-sm float-left"
                style={{ width: '50%' }}
              >
                <button
                  className="px-4 py-2 w-full no-sel flex"
                  onClick={() => sortTest('createdTime')}
                >
                  <p className="mr-1">Time</p>
                  <IcoArwSort
                    className={
                      'fill-current w-3 h-4 mt-px transform' +
                      (!!sortedBy.match('createdTime')
                        ? 'text-gr-600'
                        : 'rotate-180 text-gr-300')
                    }
                  />
                </button>
              </th>
              <th className="normal bg-blue-900 text-white text-sm">
                <button
                  className="px-4 py-2 w-full no-sel flex"
                  onClick={() => sortTest('testSetLength')}
                >
                  <p className="mr-1">#</p>
                  <IcoArwSort
                    className={
                      'fill-current w-3 h-4 mt-px transform' +
                      (!!sortedBy.match('testSetLength')
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
                <TestSessionTableTr
                  test={test}
                  background={index % 2 == 0 ? 'bg-gray-50' : 'bg-gray-100'}
                  setSession={setSession}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
