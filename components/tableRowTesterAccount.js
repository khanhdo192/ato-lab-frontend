import BtnAction from '../components/btnAction';

export default function TableRowTesterAccount({ data, onEdit, isLoading }) {
  const commonDiv = 'flex';
  const commonP = 'truncate px-1 ';

  return (
    <div className="relative grid grid-cols-user-tester-account items-center text-xs text-gr-700 py-3.5 lg:border-t-0 border-b border-b-200">
      <div className={commonDiv}>
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
        <p className={commonP}>{data[5]}</p>
      </div>
      {onEdit ? (
        <div className={commonDiv}>
          <p className={commonP}>{data[6]}</p>
        </div>
      ) : (
        <div className="flex justify-center">
          <p className={commonP}>{data[6]}</p>
        </div>
      )}
      {onEdit && (
        <div className="flex justify-end">
          <BtnAction
            ico={isLoading ? 'spinner' : 'edit'}
            onClick={onEdit ? onEdit : null}
            color="bg-p-500"
          />
        </div>
      )}
    </div>
  );
}
