import { IcoBlueCheck } from '@/components/icons';

export default function BlueSwitch({
  label,
  id,
  labelColor,
  xtra,
  isDisable,
  onChange,
  status,
}) {
  return (
    <div id={id}>
      <div
        className={`flex items-center relative ${
          isDisable ? 'opacity-40 ' : 'cursor-pointer'
        } ${xtra ? xtra : ''}`}
        onClick={isDisable ? null : () => onChange(id, !status)}
      >
        <div
          className={`flex items-center min-w-11 w-14 h-7 px-1 rounded-full border ${
            status ? 'bg-p-500 border-p-500' : 'bg-b-50 border-b-50'
          } transition duration-200 ease-in-out`}
        >
          <div
            className={`w-5.5 h-5.5 rounded-full bg-white shadow-switch flex items-center justify-center transform transition-transform duration-200 ease-in-out ${
              status ? 'translate-x-6' : 'translate-x-0'
            }`}
          >
            <IcoBlueCheck
              className={`${
                !status ? 'invisible' : 'visible'
              } transition duration-200 ease-in-out`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
