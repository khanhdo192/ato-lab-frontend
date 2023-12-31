export default function FormItemCheckbox({
  id,
  name,
  value,
  label,
  labelColor,
  xtra,
  isDisabled,
  isActive,
  isChequed,
  onClick,
  style,
  textSize = 'text-xs',
  font = 'font-medium',
  inputClassName,
}) {
  return (
    <div
      className={`flex items-center relative px-1 lg:px-2 mb-6 text-gr-600 ${
        isDisabled ? 'opacity-40' : 'cursor-pointer'
      } ${xtra ?? xtra}
      `}
      style={style}
    >
      <input
        className={`no-sel-input w-5 h-5 rounded-md cursor-pointer ${
          inputClassName ? inputClassName : ''
        }`}
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={isChequed}
        disabled={isDisabled}
        onClick={onClick}
      />

      <label
        htmlFor={id}
        className={
          textSize +
          ' ' +
          font +
          ' block tracking-wide font-medium pl-3 truncate cursor-pointer ' +
          labelColor
        }
      >
        {label}
      </label>
    </div>
  );
}
