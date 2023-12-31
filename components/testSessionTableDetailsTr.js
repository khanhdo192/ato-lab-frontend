import React from 'react';

export default function TestSessionTableDetailsTr({
  test,
  background,
  handlerChangeTestCase,
  index,
}) {
  return (
    <tr
      className={`${
        !!test && !!test.tcResultId ? 'cursor-pointer' : 'cursor-default'
      } text-sm ${background}`}
      onClick={
        !!test && !!test.tcResultId
          ? () =>
              handlerChangeTestCase({
                testCaseId: test.tcId,
                tcResultId: test.tcResultId,
                index,
              })
          : null
      }
    >
      <td className={`pl-4 py-2 float-left`} style={{ width: '35%' }}>
        {test.tcId}
      </td>
      <td className={`normal pl-4 py-2`}>{test.channel}</td>
      <td className={`normal pl-4 py-2`}>{test.category}</td>
      <td className={`normal pl-4 py-2`}>
        {test.result == null
          ? 'N/A'
          : test.result == 0
          ? 'FAIL'
          : test.result == 1
          ? 'PASS'
          : null}
      </td>
    </tr>
  );
}
