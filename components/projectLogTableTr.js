import React from 'react';

const showLogAttribute = (log, attribute) => {
  if (typeof log == 'string') {
    return log;
  } else {
    if (typeof log[attribute] == 'boolean') {
      if (log[attribute]) {
        return 'Yes';
      } else {
        return 'No';
      }
    } else {
      return log[attribute];
    }
  }
};

const isNecessaryASelectInput = attribute => {
  const attributeWithSelect = [
    'textUiAcsNative21',
    'singleSelectUiAcsNative21',
    'multiSelectUiAcsNative21',
    'oobUiAcsNative21',
    'textUiAcsNative22',
    'singleSelectUiAcsNative22',
    'multiSelectUiAcsNative22',
    'oobUiAcsNative22',
    'textUiAcsHtml21',
    'singleSelectUiAcsHtml21',
    'multiSelectUiAcsHtml21',
    'oobUiAcsHtml21',
    'htmlOtherUiAcsHtml21',
    'textUiAcsHtml22',
    'singleSelectUiAcsHtml22',
    'multiSelectUiAcsHtml22',
    'oobUiAcsHtml22',
    'htmlOtherUiAcsHtml22',
    'noPlanAcquiererMerchantPsp',
    'noPlanScheduleIssuer',
    'protocolVersionSdk1',
    'protocolVersionSdk2',
  ];

  return !!attributeWithSelect.find(attr => attr == attribute);
};

const isNecessaryAPickDateInput = attribute => {
  const attributeWithPickDateInput = [
    'approvalExpirationDateSdk1',
    'approvalExpirationDateSdk2',
    'emvcoApprovalExpirationDate',
  ];

  return !!attributeWithPickDateInput.find(attr => attr == attribute);
};

export default function projectLogTableTr({
  title,
  background,
  textStyle,
  borderStyle,
  logs,
  attribute,
  editing,
  edit,
}) {
  return (
    <tr>
      <td className={`px-6 py-2 ${background} ${textStyle}`}>
        {title}{' '}
        {!!editing ? <small className="text-red-700">(Edit)</small> : null}
      </td>
      {logs?.map((log, index) =>
        !!editing && index == 0 ? (
          <td
            className={`${background} ${borderStyle}`}
            key={`projectLogTd-${index}`}
          >
            {isNecessaryASelectInput(attribute) ? (
              <select
                key={index}
                className={`px-5 py-2 w-full border-none text-gray-600 ${background}`}
                defaultValue={log[attribute]}
                onChange={e => edit(attribute, e.target.value, log.id)}
              >
                {attribute == 'protocolVersionSdk1' ||
                attribute == 'protocolVersionSdk2' ? (
                  <>
                    <option value={'2.1.0'}>2.1.0</option>
                    <option value={'2.2.0'}>2.2.0</option>
                  </>
                ) : (
                  <>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </>
                )}
              </select>
            ) : isNecessaryAPickDateInput(attribute) ? (
              <input
                type="date"
                key={index}
                className={`px-6 py-2 w-full border-none text-gray-600 ${background}`}
                defaultValue={log[attribute]}
                onChange={e => edit(attribute, e.target.value, log.id)}
              />
            ) : (
              <input
                key={index}
                className={`px-6 py-2 w-full border-none text-gray-600 ${background}`}
                defaultValue={log[attribute]}
                onChange={e => edit(attribute, e.target.value, log.id)}
              />
            )}
          </td>
        ) : !!attribute ? (
          <td
            className={`px-6 py-2 ${
              !!edit &&
              !!logs[index + 1] &&
              logs[index + 1][attribute] !== log[attribute]
                ? 'bg-yellow-200'
                : background
            } ${textStyle} ${borderStyle}`}
            key={`projectLogTd-${index}`}
          >
            {showLogAttribute(log, attribute)}
          </td>
        ) : (
          <td
            className={`px-6 py-2 ${
              !!edit && !!logs[index + 1] && logs[index + 1] !== log
                ? 'bg-yellow-200'
                : background
            } ${textStyle} ${borderStyle}`}
            key={`projectLogTd-${index}`}
          >
            {showLogAttribute(log, attribute)}
          </td>
        )
      )}
    </tr>
  );
}
