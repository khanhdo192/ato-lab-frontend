import { useCallback } from 'react';
import Link from 'next/link';

export default function TestCardsTableRow({
  card,
  background,
  borderStyle,
  setOperatorSelected,
  operatorSelected,
  switchProductStatus,
  switchLoaStatus,
  setCantSelectMsg,
  switchAccountStatus,
}) {
  const {
    companyName,
    operatorId,
    email,
    country,
    address,
    component,
    vendor,
    productName,
    version,
    productStatus,
    approvalDate,
    complianceExpirationDate,
    loaExpiration,
    loaStatus,
    referenceNumbre,
    operatorStatus,
    productId,
  } = card;

  const canSelected = operatorId => {
    if (operatorId.includes('XXXXXX')) {
      setOperatorSelected('');
      setCantSelectMsg('Unapproved operators cannot be selected.');
      setTimeout(() => {
        setCantSelectMsg('');
      }, 5000);
    } else {
      setCantSelectMsg('');
      setOperatorSelected(operatorId);
    }
  };

  const renderLink = useCallback(() => {
    if (!!productId) {
      return (
        <Link href={`/product-validation/${productId}`}>
          <a className="text-blue-500 font-bold underline hover:text-blue-700">
            {productName || '-'}
          </a>
        </Link>
      );
    } else {
      return productName || '-';
    }
  }, [productName, productId]);

  return (
    <tr
      onClick={() => canSelected(operatorId)}
      className={`${
        operatorId == operatorSelected ? 'bg-blue-200' : ''
      } text-sm ${background} ${
        operatorId.includes('XXXXXX') ? '' : 'cursor-pointer '
      }`}
    >
      <td className={`px-4 py-2 ${borderStyle}`}>{companyName || '-'}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>{operatorId || '-'}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>{email || '-'}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>{country || '-'}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>{address || '-'}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>{component || '-'}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>{vendor || '-'}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>{renderLink()}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>{version || '-'}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>
        {switchAccountStatus(operatorStatus) || '-'}
      </td>
      <td className={`px-4 py-2 ${borderStyle}`}>
        {switchProductStatus(productStatus)}
      </td>
      <td className={`px-4 py-2 ${borderStyle}`}>{approvalDate || '-'}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>
        {complianceExpirationDate || '-'}
      </td>
      <td className={`px-4 py-2 ${borderStyle}`}>{loaExpiration || '-'}</td>
      <td className={`px-4 py-2 ${borderStyle}`}>
        {switchLoaStatus(loaStatus)}
      </td>
      <td className={`px-4 py-2 ${borderStyle}`}>{referenceNumbre || '-'}</td>
    </tr>
  );
}
