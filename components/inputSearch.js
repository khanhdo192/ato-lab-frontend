import { IcoSearch } from '../components/icons';

export default function InputSearch({
  id,
  name,
  placeholder,
  value,
  xtra,
  onChange,
  disable,
  nonIcon,
}) {
  return (
    <div className={'relative text-b-600 ' + xtra}>
      {!nonIcon && (
        <IcoSearch className="absolute top-2 left-2 w-4.5 h-4.5 fill-current" />
      )}
      <input
        className={`w-full relative input no-sel bg-transparent cursor-pointer  ${
          !nonIcon ? 'pl-9' : 'pl-2'
        } pr-2 placeholder-b-300 focus:border-b-300 leading-none`}
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? onChange : null}
        disabled={disable}
      />
    </div>
  );
}
