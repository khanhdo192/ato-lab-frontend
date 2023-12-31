import React from 'react';

export default function TestSessionTableTr({ test, background, setSession }) {
  return (
    <tr className={`text-sm ${background} `}>
      {!!test.id ? (
        <button
          onClick={() => setSession(test.id)}
          className="w-full text-left"
        >
          <td className={`px-4 py-2 float-left`} style={{ width: '30%' }}>
            {test.newSession}
          </td>
          <td className={`px-4 py-2 float-left`} style={{ width: '50%' }}>
            {!!test.createdTime
              ? new Date(test.createdTime)
                  .toISOString()
                  .split('.')[0]
                  .replace('T', ' ')
              : null}
          </td>

          <td className={`px-4 py-2 normal`}>{test.testSetLength}</td>
        </button>
      ) : (
        <>
          <td
            className={`px-4 py-2 normal float-left`}
            style={{ width: '30%' }}
          >
            {test.session}
          </td>
          <td className={`px-4 py-2 float-left`} style={{ width: '50%' }}>
            {!!test.createdTime
              ? new Date(test.createdTime)
                  .toISOString()
                  .split('.')[0]
                  .replace('T', ' ')
              : null}
          </td>
          <td className={`px-4 py-2 normal`}>{test.testSetLength}</td>
        </>
      )}
    </tr>
  );
}
