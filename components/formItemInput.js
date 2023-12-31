import React from 'react';
import { IcoView, IcoViewNone } from '../components/icons';

import FormAssetLabel from '../components/formAssetLabel';
import FormAssetErrorP from '../components/formAssetErrorP';
import FormAssetErrorIco from '../components/formAssetErrorIco';

export default function FormItemInput({
  id,
  type,
  placeholder,
  value,
  isDisabled,
  isRequired,
  label,
  info,
  error,
  errorMsg,
  onChange,
  defaultValue,
  max = null,
  styles = null,
  pad = 'px-3 lg:px-4',
}) {
  const [viewPass, setViewPass] = React.useState(false);

  const toggleView = () => setViewPass(!viewPass);

  return (
    <div
      className={
        'relative w-full px-1 lg:px-2 mb-8 ' + (error ? 'form-error' : '')
      }
    >
      <FormAssetLabel id={id} label={label} />
      <input
        id={id}
        className={`form-input w-full focus:border-b-310 ${pad} ${styles}`}
        type={type == 'password' && viewPass ? 'text' : type}
        placeholder={placeholder}
        value={value}
        required={isRequired}
        disabled={isDisabled}
        onChange={onChange}
        defaultValue={defaultValue}
        maxLength={max}
      />
      <FormAssetErrorP errorMsg={errorMsg} />
      <p className="absolute right-2 text-b-300 text-btn-action tracking-wider pt-0.5">
        {info}
      </p>
      {error && <FormAssetErrorIco />}

      <div
        className={
          (type == 'password' ? 'flex' : 'hidden') +
          ' absolute top-8 right-4 items-center justify-center w-6 h-6 bg-white rounded-full shadow-icon'
        }
      >
        {viewPass && (
          <a className="cursor-pointer" onClick={toggleView}>
            <IcoView className="w-5 h-5 text-p-500 fill-current" />
          </a>
        )}
        {!viewPass && (
          <a className="cursor-pointer" onClick={toggleView}>
            <IcoViewNone className="w-5 h-5 text-gr-500 fill-current" />
          </a>
        )}
      </div>
    </div>
  );
}
FormItemInput.defaultProps = {
  type: 'text',
};
