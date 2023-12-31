import { useState } from 'react';
import { IcoEyeClose, IcoEyeOpen, IcoMail, IcoPass } from '../components/icons';

export default function LoginInput({
  id,
  type,
  placeholder,
  value,
  ico,
  isDisabled,
  onChange,
  isRequired,
}) {
  const [viewPass, setViewPass] = useState(false);
  const toggleView = () => setViewPass(!viewPass);
  const classIco = 'w-4.5 h-4.5 text-white fill-current';

  return (
    <div className="relative my-2.5">
      {type !== 'password' ? (
        <div className="flex absolute top-2 right-1 items-center justify-center w-7 h-7 rounded-full bg-b-300">
          {
            {
              mail: <IcoMail className={classIco} />,
              pass: <IcoPass className={classIco} />,
            }[ico]
          }
        </div>
      ) : (
        <div className="flex absolute top-2 right-1 items-center justify-center w-7 h-7 rounded-full bg-b-300">
          {viewPass ? (
            <a className="cursor-pointer" onClick={toggleView}>
              <IcoEyeOpen className="w-6 h-6 text-white fill-current" />
            </a>
          ) : (
            <a className="cursor-pointer" onClick={toggleView}>
              <IcoEyeClose className="w-6 h-6 text-white fill-current" />
            </a>
          )}
        </div>
      )}
      <input
        className="w-full no-sel-input bg-transparent text-white border-0 border-b border-b-300 pr-10 py-2.5 pl-2 placeholder-b-300"
        type={type === 'password' && viewPass ? 'text' : type}
        placeholder={placeholder}
        value={value}
        disabled={isDisabled}
        onChange={e => onChange(e.target.value)}
        required={isRequired}
      />
    </div>
  );
}
