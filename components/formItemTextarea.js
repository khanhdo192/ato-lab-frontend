import FormAssetLabel from '../components/formAssetLabel';
import FormAssetErrorP from '../components/formAssetErrorP';
import FormAssetErrorIco from '../components/formAssetErrorIco';

export default function FormItemTextarea({
  rows,
  maxlength,
  id,
  placeholder,
  value,
  isDisabled,
  onChange,
  label,
  info,
  error,
  errorMsg,
}) {
  const onChangeHandler = () => {};
  return (
    <div
      className={
        'relative w-full px-1 lg:px-2 mb-8 ' + (error ? 'form-error' : '')
      }
    >
      <FormAssetLabel id={id} label={label} />
      <textarea
        className="form-input w-full px-3 lg:px-4 focus:border-b-310 leading-7 resize-none"
        rows={rows}
        maxLength={maxlength}
        id={id}
        placeholder={placeholder}
        value={value}
        disabled={isDisabled}
        onChange={!!onChange ? onChange : onChangeHandler}
      ></textarea>
      <FormAssetErrorP errorMsg={errorMsg} />
      <p className="absolute right-2 text-b-300 text-btn-action tracking-wider pt-0.5">
        {info}
      </p>
      {error && <FormAssetErrorIco />}
    </div>
  );
}
