import { useMemo } from 'react';

export default function TestCardsTableRow({
  card,
  background,
  borderStyle,
  editing,
  editCardNumber,
  type,
}) {
  const {
    cardId,
    cardType,
    cardNumber,
    relevantTestCase,
    acsEnrollment,
    authenticationMethod,
  } = card;

  const methodRender = useMemo(() => {
    return authenticationMethod.split(';').map((authen, index) => (
      <li className="pb-2" key={`authen-${index}`}>
        {authen}
      </li>
    ));
  }, [authenticationMethod]);

  const acsEnrolled = useMemo(() => {
    switch (acsEnrollment.toString()) {
      case '0':
        return 'No';
      case '1':
        return 'Yes';
      default:
        return 'Not found';
    }
  }, [acsEnrollment]);

  return (
    <tr className={`text-sm ${background}`}>
      <td className={`px-4 py-2 ${borderStyle}`}>{cardType}</td>
      {editing ? (
        <td className={`${borderStyle}`}>
          <input
            className={`px-4 py-2 w-full border-none text-gray-600 ${background}`}
            defaultValue={cardNumber}
            onChange={e => editCardNumber(cardId, e.target.value)}
          />
        </td>
      ) : (
        <td className={`px-4 py-2 ${borderStyle}`}>{cardNumber}</td>
      )}
      <td className={`px-4 py-2 ${borderStyle}`}>
        {relevantTestCase?.map((testCase, index) => {
          if (index == relevantTestCase.length - 1) return `${testCase}`;
          return `${testCase}, `;
        })}
      </td>
      {type === 'acs' ? (
        <td className={`px-4 py-2 text-center ${borderStyle}`}>
          {acsEnrolled}
        </td>
      ) : null}
      <td className={`px-4 py-2 ${authenticationMethod ? '' : 'text-center'}`}>
        {authenticationMethod ? (
          <ul className="list-disc list-inside">{methodRender}</ul>
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
}
