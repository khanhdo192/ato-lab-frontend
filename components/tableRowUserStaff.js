import BtnAction from '../components/btnAction';
import TextRole from '../components/textRole';

export default function TableRowUserStaff({ data, onEdit, isLoading }) {
  const commonDiv = 'flex';
  const commonP = 'truncate px-1 ';

  return (
    <div className="relative grid grid-cols-user-staff items-center text-xs text-gr-700 py-3.5 lg:border-t-0 border-b border-b-200">
      <div className={commonDiv}>
        <p className="truncate pr-1">{data[0]}</p>
      </div>
      <div className={commonDiv}>
        <p className={commonP}>{data[4]}</p>
      </div>
      {onEdit ? (
        <div className={commonDiv}>
          <TextRole label={data[5]} />
        </div>
      ) : (
        <div className="flex justify-end">
          <TextRole label={data[5]} />
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
