import { IcoArwPull } from '../components/icons';

import FormAssetLabel from '../components/formAssetLabel';
import FormAssetErrorP from '../components/formAssetErrorP';
import FormAssetErrorIco from '../components/formAssetErrorIco';
import { update } from 'lodash';

export default function FormItemInput({
  id,
  placeholder,
  value,
  isDisabled,
  label,
  error,
  errorMsg,
  children,
  onChange,
  updateDate,
}) {
  return (
    <div
      className={
        'relative w-full px-1 lg:px-2 mb-8 ' + (error ? 'form-error' : '')
      }
    >
      <FormAssetLabel id={id} label={label} />
      <IcoArwPull className="absolute top-9.5 right-5 w-3 h-3 fill-current" />
      <select
        onChange={onChange ? e => onChange(e) : null}
        id={id}
        className="form-input w-full px-3 lg:px-4 cursor-pointer bg-transparent truncate pr-10 focus:border-b-310"
        type="text"
        placeholder={placeholder}
        value={value}
        disabled={isDisabled}
      >
        {children}
      </select>
      {!!updateDate && !errorMsg ? (
        <p className="absolute right-2 text-xs text-right mt-0.5 mr-1 text-blue-400">
          {updateDate}
        </p>
      ) : !!errorMsg ? (
        <FormAssetErrorP errorMsg={errorMsg} />
      ) : null}
      {error && <FormAssetErrorIco />}
    </div>
  );
}
