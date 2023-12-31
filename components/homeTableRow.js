import BtnAction from '../components/btnAction';
import HomeTableStatus from '../components/homeTableStatus';
import HomeTableSla from '../components/homeTableSla';

export default function HomeTableRow({
  data,
  statusLabel,
  onClick,
  isLoading,
}) {
  const commonDiv = 'flex justify-end ';
  const commonP = 'truncate px-1';
  const scheme = [
    ['gr-100', 'gr-400'],
    ['p-100', 'p-400'],
    ['b-100', 'b-310'],
    ['y-100', 'y-500'],
    ['g-100', 'g-400'],
    ['r-100', 'r-400'],
    ['o-100', 'o-400'],
  ];
  let statusSchemeId = 0;
  let slaSchemeId = 0;

  switch (statusLabel.toLowerCase()) {
    case 'approved':
      statusLabel = 'Approved';
      statusSchemeId = 4;
      break;

    case 'under approval':
      statusLabel = 'Under Approval';
      statusSchemeId = 3;
      break;

    case 'reviewing results':
      statusSchemeId = 2;
      statusLabel = 'Reviewing Results';
      break;

    case 'results submitted':
      statusSchemeId = 1;
      statusLabel = 'Results Submitted';
      break;

    case 'self-test':
      statusLabel = 'Self Test';
      break;

    case 'reviewing profile':
      statusSchemeId = 2;
      statusLabel = 'Reviewing Profile';
      break;

    case 'profile submitted':
      statusLabel = 'Profile Submitted';
      statusSchemeId = 1;
      break;

    case 'new/edit':
    case 'new/edit product':
      statusSchemeId = 1;
      statusLabel = 'New/Edit';
      break;

    case 'profile rejected':
      statusLabel = 'Profile Rejected';
      statusSchemeId = 5;
      break;
  }

  const sla = data[8];

  switch (true) {
    case sla < 8:
      slaSchemeId = 3; // Yellow
      break;
    case sla < 9:
      slaSchemeId = 6; // Orange
      break;
    case sla >= 9:
      slaSchemeId = 5; // Red
      break;
  }

  return (
    <div className="relative grid grid-cols-home-table items-center text-xs text-gr-700 py-3.5 lg:border-t-0 border-b border-b-200">
      <div>
        <p className="truncate pr-1">{data[0]}</p>
      </div>
      <div className={commonDiv}>
        <p className={commonP}>{data[1]}</p>
      </div>
      <div className={commonDiv}>
        <p className={commonP}>{data[2]}</p>
      </div>
      <div className={commonDiv}>
        <p className={commonP}>{data[3]}</p>
      </div>
      <div className={commonDiv}>
        <p className={commonP}>{data[4]}</p>
      </div>
      <div className={commonDiv}>
        <HomeTableStatus statusId={[data[5], ...scheme[statusSchemeId]]} />
      </div>
      <div className={commonDiv}>
        <p className={commonP}>{data[6]}</p>
      </div>
      <div className={commonDiv}>
        <p className={commonP}>{data[7]}</p>
      </div>
      <div className={commonDiv}>
        <HomeTableSla statusId={[sla, ...scheme[slaSchemeId]]} />
      </div>
      <div className={commonDiv}>
        <p className={commonP}>{data[9]}</p>
      </div>
      <div className="absolute right-0">
        <div>
          <BtnAction
            ico={isLoading ? 'spinner' : 'manage'}
            onClick={onClick}
            color="bg-p-500"
          />
        </div>
      </div>
    </div>
  );
}
