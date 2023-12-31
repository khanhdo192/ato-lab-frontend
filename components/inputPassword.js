import Spinner from '@/components/spinner';
import React from 'react';
import FormAssetErrorP from '../components/formAssetErrorP';
import FormAssetLabel from '../components/formAssetLabel';
import FormAssetSuccessIco from '../components/formAssetSuccessIco';
import FormAssetSuccessP from '../components/formAssetSuccessP';
import { IcoEdit, IcoPassHide, IcoPassUnhide } from '../components/icons';

export default function InputPassword({
  id,
  type,
  placeholder,
  value,
  isDisabled,
  buttonIsDisabled,
  isRequired,
  label,
  info,
  error,
  errorMsg,
  onChange,
  defaultValue,
  maxlength,
  success,
  successMsg,
  onClick,
  autoComplete,
}) {
  const [viewPass, setViewPass] = React.useState(false);

  const toggleView = () => setViewPass(!viewPass);

  return (
    <div
      className={
        'relative w-full mb-8 ' +
        (isDisabled ? 'opacity-40 ' : 'cursor-pointer ') +
        (error ? 'form-error' : '') +
        (success ? 'form-success' : '')
      }
    >
      <FormAssetLabel id={id} label={label} />
      <input
        id={id}
        className="form-input w-full px-3 lg:px-4 "
        type={type == 'password' && viewPass ? 'text' : type}
        placeholder={placeholder}
        value={value}
        required={isRequired}
        disabled={isDisabled}
        onChange={onChange}
        defaultValue={defaultValue}
        maxLength={maxlength}
        autoComplete={autoComplete}
      />
      <FormAssetErrorP errorMsg={errorMsg} />
      <FormAssetSuccessP successMsg={!errorMsg && successMsg} />
      <p className="absolute right-2 text-b-300 text-btn-action tracking-wider pt-0.5">
        {info}
      </p>
      {!errorMsg && success && <FormAssetSuccessIco />}
      <div
        className={
          (type == 'password' ? 'flex' : 'hidden') +
          ' absolute top-3 right-6 items-center justify-center w-6 h-6 bg-white'
        }
      >
        {viewPass && (
          <a className="cursor-pointer" onClick={toggleView}>
            <IcoPassUnhide className="w-7 h-7 text-b-950 fill-current" />
          </a>
        )}
        {!viewPass && (
          <a className="cursor-pointer" onClick={toggleView}>
            <IcoPassHide className="w-7 h-7 text-b-950 fill-current" />
          </a>
        )}
      </div>
      <div
        className={
          (type == 'edit' ? 'flex' : 'hidden') +
          ' absolute top-8 right-4 items-center justify-center w-6 h-6 bg-white rounded-full shadow-icon ' +
          (buttonIsDisabled ? 'opacity-40 ' : 'cursor-pointer ')
        }
      >
        <a onClick={!buttonIsDisabled ? onClick : null}>
          <IcoEdit className="w-5 h-5 text-p-500 fill-current" />
        </a>
      </div>

      <div
        className={
          (type == 'spinner' ? 'flex' : 'hidden') +
          ' absolute top-8 right-4 items-center justify-center w-6 h-6 bg-white rounded-full shadow-icon'
        }
      >
        <a onClick={!buttonIsDisabled ? onClick : null}>
          <Spinner isLoading size={5} />
        </a>
      </div>
    </div>
  );
}

InputPassword.defaultProps = {
  type: 'text',
};
