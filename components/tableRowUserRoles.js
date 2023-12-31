import { IcoMin, IcoSuccess } from '../components/icons';
import BtnAction from '../components/btnAction';
import TextRole from '../components/textRole';

export default function TableRowUserRoles({ data, onEdit }) {
  const commonDiv = 'flex justify-center';
  const icoContainer =
    'flex items-center justify-center w-5.5 h-5.5 rounded-full ';
  const icoClass = 'min-w-6 min-h-6 text-white fill-current';

  return (
    <div className="relative grid grid-cols-user-roles lg:grid-cols-user-roles-lg items-center text-sm lg:text-xs text-gr-700 border-t lg:border-t-0 lg:border-b border-b-200 py-4">
      <div>
        <TextRole label={data[0]} />
      </div>
      <div className={commonDiv}>
        <div className={icoContainer + (data[1] ? 'bg-g-400' : 'bg-gr-300')}>
          {data[1] ? (
            <IcoSuccess className={icoClass} />
          ) : (
            <IcoMin className={icoClass} />
          )}
        </div>
      </div>
      <div className={commonDiv}>
        <div className={icoContainer + (data[2] ? 'bg-g-400' : 'bg-gr-300')}>
          {data[2] ? (
            <IcoSuccess className={icoClass} />
          ) : (
            <IcoMin className={icoClass} />
          )}
        </div>
      </div>
      {onEdit ? (
        <div className="flex lg:justify-end">
          <div className={icoContainer + (data[2] ? 'bg-g-400' : 'bg-gr-300')}>
            <BtnAction
              onClick={onEdit ? onEdit : null}
              ico="edit"
              color="bg-p-500"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
