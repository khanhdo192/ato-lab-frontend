import { useRouter } from 'next/router';
import React from 'react';

export default function testResultTableTr({
  test,
  backgroundEditing,
  background,
  borderStyle,
  edit,
  editing,
}) {
  const router = useRouter()
  const goToCurrentTestId = (testId) => () => {
    const {id} = router.query
    if(id){
      router.push(`/test-case/${id}/?tc_id=${testId}`)
    }
    console.log(router)
  }

  return (
    <tr className={`text-sm ${!!editing ? backgroundEditing : background} `}>
      <td className={`px-4 py-2 ${borderStyle}`}>
        <a href='#' className='text-blue-600' onClick={goToCurrentTestId(test.testCaseId)}>
          {test.testCaseId}
        </a>
      </td>
      <td className={`px-4 py-2 ${borderStyle}`}>{test.protocol}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>{test.runTime}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>{test.channel}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>{test.category}</td>
      {!!editing && (test.result == 0 || test.result == 2) ? (
        <td className={`${borderStyle}`}>
          <select
            className={`pl-3 py-2 w-full border-none ${
              !!editing ? backgroundEditing : background
            }`}
            // defaultValue={
            //   test.result == null
            //     ? 'N/A'
            //     : test.result == 0
            //     ? 'FAIL'
            //     : test.result == 1
            //     ? 'PASS'
            //     : null
            // }
            onChange={e => edit(test.testCaseId, 'result', e.target.value)}
          >
            <option value="0" selected={test.result == 0}>
              FAIL
            </option>
            {/* <option value="1" selected={test.result == 1}>
              PASS
            </option> */}
            <option value="2" selected={test.result == 2}>
              WAIVER
            </option>
          </select>
        </td>
      ) : (
        <td className={`px-4 py-2 ${borderStyle}`}>
          {test.result == 2
            ? 'WAIVER'
            : test.result == 0
            ? 'FAIL'
            : test.result == 1
            ? 'PASS'
            : null}
        </td>
      )}
      <td className={`px-4 py-2 ${borderStyle}`}>{test.waiverTesterComment}</td>
      {!!editing && test.result == 2 ? (
        <td>
          <textarea
            className={`pl-4 py-1 w-full border-none ${
              !!editing ? backgroundEditing : background
            }`}
            placeholder="You can leave a comment"
            onChange={e =>
              edit(test.testCaseId, 'waiverJcbComment', e.target.value)
            }
          >
            {test.waiverJcbComment}
          </textarea>
        </td>
      ) : (
        <td className={`px-4 py-2`}>{test.waiverJcbComment}</td>
      )}
    </tr>
  );
}
