import { IcoArwPull } from '../components/icons';

export default function InputSelect({
  id,
  name,
  children,
  onChange,
  xtra,
  value,
}) {
  return (
    <div className={`relative  ${!xtra ? 'w-mt' : ''}  text-b-600 ${xtra}`}>
      <IcoArwPull className="absolute top-2.5 right-2.5 w-3 h-3 fill-current" />
      <select
        className={`relative input pr-9 no-sel bg-transparent cursor-pointer focus:border-b-300 leading-none ${
          xtra ? 'w-full' : xtra
        }`}
        onChange={onChange ? onChange : null}
        id={id}
        value={value}
        name={name}
      >
        {children}
      </select>
    </div>
  );
}
