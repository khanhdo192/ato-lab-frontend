import React, { useState } from 'react';

export default function testResultModalTableTr({
  test,
  // backgroundEditing,
  background,
  borderStyle,
  editing,
  editTesterComments,
}) {
  const [displayInput, setDisplayInput] = useState(false);

  const displayTextArea = () => {
    setDisplayInput(true);
  };

  const sendNewComment = e => {
    if (e.key === 'Enter' && e.shiftKey == false) {
      setDisplayInput(false);
    }
  };

  return (
    <tr className={`text-sm ${background} `}>
      <td
        className={`px-4 py-2 ${borderStyle} float-left`}
        style={{ width: '180px' }}
      >
        {test.testCaseId}
      </td>
      <td className={`large px-4 py-2 ${borderStyle}`}>{test.protocol}</td>
      <td
        className={`px-4 py-2 ${borderStyle} large`}
        style={{ width: '170px' }}
      >
        {test.runTime}
      </td>
      <td className={`large px-4 py-2 ${borderStyle}`}>{test.channel}</td>
      <td className={`large px-4 py-2 ${borderStyle}`}>{test.category}</td>
      <td className={`large px-4 py-2 ${borderStyle}`}>
        {test.result == null
          ? 'N/A'
          : test.result == 0
          ? 'FAIL'
          : test.result == 1
          ? 'PASS'
          : null}
      </td>
      {!!editing && test.waiverTesterComment != 'Null Data' ? (
        <td
          className={`relative px-4 py-2 ${borderStyle} float-left`}
          style={{ width: '220px' }}
        >
          {displayInput ? (
            <textarea
              className={`${
                displayInput ? 'absolute' : 'hidden'
              } z-10 border border-gray-300 rounded-small p-3 top-3 left-4 right-4 overflow-y-scroll resize-none`}
              rows="4"
              onChange={e =>
                editTesterComments(test.testReportDetailId, e.target.value)
              }
              onKeyPress={e => sendNewComment(e)}
            >
              {!!test.waiverTesterComment && test.waiverTesterComment.length > 0
                ? test.waiverTesterComment
                : null}
            </textarea>
          ) : (
            <button className="text-gray-500" onClick={() => displayTextArea()}>
              {!!test.waiverTesterComment
                ? test.waiverTesterComment == 'Null Data'
                  ? null
                  : test.waiverTesterComment.length > 25
                  ? test.waiverTesterComment.slice(0, 25) + '...'
                  : test.waiverTesterComment
                : 'You can leave a comment'}
            </button>
          )}
        </td>
      ) : (
        <td
          className={`px-4 py-2 ${borderStyle} float-left`}
          style={{ width: '220px' }}
        >
          {!!test.waiverTesterComment
            ? test.waiverTesterComment == 'Null Data'
              ? null
              : test.waiverTesterComment.length > 25
              ? test.waiverTesterComment.slice(0, 25) + '...'
              : test.waiverTesterComment
            : null}
        </td>
      )}
      <td className={`px-4 py-2 float-left`} style={{ width: '200px' }}>
        {test.waiverJcbComment && test.waiverJcbComment.length > 25
          ? test.waiverJcbComment.slice(0, 25) + '...'
          : test.waiverJcbComment}
      </td>
    </tr>
  );
}
