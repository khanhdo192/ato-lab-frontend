import { useState, useEffect } from 'react';
import OperatorTableRow from '@/components/operatorTable/operatorTableRow';
import { IcoArwSort } from '../icons';
import { postFetcherWithoutConfig } from '@/lib/fetcher';
import { CSVLink } from 'react-csv';
import Spinner from '../spinner';

export default function OperatorTable({
  operators,
  switchProductStatus,
  switchLoaStatus,
  setOperatorSelected,
  operatorSelected,
  setCantSelectMsg,
  switchAccountStatus,
}) {
  const [cards, setCards] = useState([]);
  const [cardsCSV, setCardsCSV] = useState([]);
  const [sortedBy, setSortedBy] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsSorted(false);
  }, [isSorted]);

  useEffect(() => {
    const csvCards = operators.map(op => {
      const {
        version: messageVersion,
        referenceNumbre: emvcoReferenceNumber,
        companyName,
        operatorId,
        email,
        country,
        address,
        component,
        vendor,
        productName,
        productStatus,
        approvalDate,
        complianceExpirationDate,
        loaExpiration,
        loaStatus,
        operatorStatus,
      } = op;

      return {
        companyName,
        operatorId,
        email,
        country,
        address: address?.replace(/"/g, ''),
        component,
        vendor,
        productName,
        messageVersion,
        accountStatus: switchAccountStatus(operatorStatus),
        productStatus: switchProductStatus(productStatus),
        approvalDate,
        complianceExpirationDate,
        loaExpiration,
        loaStatus: switchLoaStatus(loaStatus),
        emvcoReferenceNumber,
      };
    });
    setCardsCSV(csvCards);
    setCards(operators);
  }, [operators]);
  const sortCard = value => {
    let testCardSorted = [];
    if (sortedBy === value) testCardSorted = cards.reverse();
    else {
      setSortedBy(value);
      if (
        value == 'cardType' ||
        value == 'authenticationMethod' ||
        value == 'cardNumber' ||
        value == 'acsEnrollment' ||
        value == 'relevantTestCases'
      ) {
        testCardSorted = cards.sort((a, b) =>
          a[value] > b[value] ? -1 : a[value] < b[value] ? 1 : 0
        );
      }
    }
    setCards(testCardSorted);
    setIsSorted(true);
  };

  const editCardNumber = (id, value) => {
    const newCards = cards.map(card => {
      if (card.cardId == id) {
        card.cardNumber = value;
      }
      return card;
    });
    setCards(newCards);
  };

  const modifyCardNumber = async e => {
    e.preventDefault();
    setEditing(false);
    setSubmitted(true);

    const newCards = cards?.map(({ cardId, cardNumber }) => {
      return { cardId, cardNumber };
    });

    await postFetcherWithoutConfig(newCards)(
      '/tester/products/tc/updateCardNumberCardRange'
    );
    setSubmitted(false);
  };

  return (
    <>
      <div className="overflow-scroll w-full" style={{ height: '60vh' }}>
        <table className="table-auto">
          <thead className="sticky top-0">
            <tr className="text-center items-center">
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <p className="mr-1">Operator Company Name</p>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <p className="mr-1">OP ID</p>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <p className="mr-1">Email</p>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <button
                  className="px-4 py-2 w-full no-sel flex item-center"
                  onClick={() => sortCard('acsEnrollment')}
                >
                  <p className="mr-1">Country</p>
                  <IcoArwSort
                    className={
                      'fill-current w-3 h-4 mt-px transform' +
                      (!!sortedBy.match('acsEnrollment')
                        ? 'text-gr-600'
                        : 'rotate-180 text-gr-300')
                    }
                  />
                </button>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <button
                  className="px-4 py-2 w-full no-sel flex item-center"
                  onClick={() => sortCard('acsEnrollment')}
                >
                  <p className="mr-1">Address</p>
                </button>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <p className="mr-1">Component</p>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <p className="mr-1">Vendor</p>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <p className="mr-1">Product Name</p>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <button
                  className="px-4 py-2 w-full no-sel flex item-center"
                  onClick={() => sortCard('authenticationMethod')}
                >
                  <p className="mr-1">Message Version</p>
                  <IcoArwSort
                    className={
                      'fill-current w-3 h-4 mt-px transform flex' +
                      (!!sortedBy.match('authenticationMethod')
                        ? 'text-gr-600'
                        : 'rotate-180 text-gr-300')
                    }
                  />
                </button>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <button
                  className="px-4 py-2 w-full no-sel flex"
                  onClick={() => sortCard('authenticationMethod')}
                >
                  <p className="mr-1">Account Status</p>
                  <IcoArwSort
                    className={
                      'fill-current w-3 h-4 mt-px transform' +
                      (!!sortedBy.match('authenticationMethod')
                        ? 'text-gr-600'
                        : 'rotate-180 text-gr-300')
                    }
                  />
                </button>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <button
                  className="px-4 py-2 w-full no-sel flex"
                  onClick={() => sortCard('authenticationMethod')}
                >
                  <p className="mr-1">Product Status</p>
                  <IcoArwSort
                    className={
                      'fill-current w-3 h-4 mt-px transform' +
                      (!!sortedBy.match('authenticationMethod')
                        ? 'text-gr-600'
                        : 'rotate-180 text-gr-300')
                    }
                  />
                </button>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <button
                  className="px-4 py-2 w-full no-sel flex"
                  onClick={() => sortCard('authenticationMethod')}
                >
                  <p className="mr-1">JCB Approval Date</p>
                  <IcoArwSort
                    className={
                      'fill-current w-3 h-4 mt-px transform' +
                      (!!sortedBy.match('authenticationMethod')
                        ? 'text-gr-600'
                        : 'rotate-180 text-gr-300')
                    }
                  />
                </button>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <button
                  className="px-4 py-2 w-full no-sel flex"
                  onClick={() => sortCard('authenticationMethod')}
                >
                  <p className="mr-1">JCB Compliance Expiration</p>
                  <IcoArwSort
                    className={
                      'fill-current w-3 h-4 mt-px transform' +
                      (!!sortedBy.match('authenticationMethod')
                        ? 'text-gr-600'
                        : 'rotate-180 text-gr-300')
                    }
                  />
                </button>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <button
                  className="px-4 py-2 w-full no-sel flex"
                  onClick={() => sortCard('authenticationMethod')}
                >
                  <p className="mr-1">EMVCo LoA Expiration</p>
                  <IcoArwSort
                    className={
                      'fill-current w-3 h-4 mt-px transform' +
                      (!!sortedBy.match('authenticationMethod')
                        ? 'text-gr-600'
                        : 'rotate-180 text-gr-300')
                    }
                  />
                </button>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <p className="mr-1">EMVCo LoA Status</p>
              </th>
              <th className="bg-blue-900 text-white border-r border-white text-sm">
                <p className="mr-1">EMVCo Reference Number</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {cards?.map((card, index) => {
              return (
                <OperatorTableRow
                  key={`operatorRow-${index}`}
                  card={card}
                  background={index % 2 == 0 ? 'bg-gray-50' : 'bg-gray-100'}
                  borderStyle="border-r border-gray-500"
                  editCardNumber={editCardNumber}
                  editing={editing}
                  setOperatorSelected={setOperatorSelected}
                  operatorSelected={operatorSelected}
                  switchProductStatus={switchProductStatus}
                  switchLoaStatus={switchLoaStatus}
                  setCantSelectMsg={setCantSelectMsg}
                  switchAccountStatus={switchAccountStatus}
                />
              );
            })}
            {cards.length === 0 && (
              <tr>
                <td colSpan={16} className="animate-pulse text-center py-48">
                  <Spinner isLoading />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-10">
        <div></div>
        <CSVLink
          data={!!cardsCSV && cardsCSV.length > 0 ? cardsCSV : []}
          headers={[
            { label: 'Operator Company Name', key: 'companyName' },
            { label: 'OP ID', key: 'operatorId' },
            { label: 'Email', key: 'email' },
            { label: 'Country', key: 'country' },
            { label: 'Address', key: 'address' },
            { label: 'Component', key: 'component' },
            { label: 'Vendor', key: 'vendor' },
            { label: 'Product Name', key: 'productName' },
            { label: 'Message Version', key: 'messageVersion' },
            { label: 'Account Status', key: 'accountStatus' },
            { label: 'Product Status', key: 'productStatus' },
            { label: 'JCB Approval Date', key: 'approvalDate' },
            {
              label: 'JCB Compliance Expiration',
              key: 'complianceExpirationDate',
            },
            { label: 'EMVCo LoA Expiration', key: 'loaExpiration' },
            { label: 'EMVCo LoA Status', key: 'loaStatus' },
            { label: 'EMVCo Reference Number', key: 'emvcoReferenceNumber' },
          ]}
          filename={`operator_records_${
            new Date().toISOString().split('T')[0]
          }`}
        >
          <button className="bg-blue-600 text-white font-medium px-5 py-2 rounded-lg">
            Export to Excel
          </button>
        </CSVLink>
      </div>
    </>
  );
}
