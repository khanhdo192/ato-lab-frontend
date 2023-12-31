import { useState, useEffect } from 'react';
import TestCardsTableRow from '@/components/testCardsTable/testCardsTableRow';
import { IcoArwSort } from '../icons';

export default function TestCardsTable({ testCards, type }) {
  const [cards, setCards] = useState([]);
  const [sortedBy, setSortedBy] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setIsSorted(false);
  }, [isSorted]);

  useEffect(() => {
    setCards(testCards);
  }, [testCards]);

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

  return (
    <div className="overflow-auto">
      <table className="table-auto w-full" style={{ minWidth: '1280px' }}>
        <thead>
          <tr className="text-left">
            <th
              className="bg-blue-900 text-white border-r border-white text-sm"
              style={{ width: '9%' }}
            >
              <button
                className="px-4 py-2 w-full no-sel flex justify-center"
                onClick={() => sortCard('cardType')}
              >
                <p className="mr-1">Card Type</p>
                <IcoArwSort
                  className={
                    'fill-current w-3 h-4 mt-px transform' +
                    (!!sortedBy.match('cardType')
                      ? 'text-gr-600'
                      : 'rotate-180 text-gr-300')
                  }
                />
              </button>
            </th>
            <th className="bg-blue-900 text-white border-r border-white text-sm">
              <button
                className="px-4 py-2 w-full no-sel flex justify-center"
                onClick={() => sortCard('cardNumber')}
              >
                {editing ? (
                  <p className="mr-1">Card Number (Edit)</p>
                ) : (
                  <p className="mr-1">Card Number</p>
                )}
                <IcoArwSort
                  className={
                    'fill-current w-3 h-4 mt-px transform' +
                    (!!sortedBy.match('cardNumber')
                      ? 'text-gr-600'
                      : 'rotate-180 text-gr-300')
                  }
                />
              </button>
            </th>
            <th
              className="bg-blue-900 text-white border-r border-white text-sm"
              style={{ width: '45%' }}
            >
              <button
                className="px-4 py-2 no-sel flex"
                onClick={() => sortCard('relevantTestCases')}
              >
                <p className="mr-1">Relevant Test Cases</p>
                <IcoArwSort
                  className={
                    'fill-current w-3 h-4 mt-px transform' +
                    (!!sortedBy.match('relevantTestCase')
                      ? 'text-gr-600'
                      : 'rotate-180 text-gr-300')
                  }
                />
              </button>
            </th>
            {type === 'acs' ? (
              <th
                className="bg-blue-900 text-white border-r border-white text-sm"
                style={{ width: '8%' }}
              >
                <button
                  className="px-4 py-2 w-full no-sel flex justify-center"
                  onClick={() => sortCard('acsEnrollment')}
                >
                  <p className="mr-1">Enrolled in ACS</p>
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
            ) : null}
            <th className="bg-blue-900 text-white border-r border-white text-sm">
              <button
                className="px-4 py-2 w-full no-sel flex justify-center"
                onClick={() => sortCard('authenticationMethod')}
              >
                <p className="mr-1">Authentication Method</p>
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
          </tr>
        </thead>
        <tbody>
          {cards?.map((card, index) => {
            return (
              <TestCardsTableRow
                key={`testCardRow-${index}`}
                card={card}
                background={index % 2 == 0 ? 'bg-gray-50' : 'bg-gray-100'}
                borderStyle="border-r border-gray-500"
                editCardNumber={editCardNumber}
                editing={editing}
                type={type}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
