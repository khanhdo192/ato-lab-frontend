export default function CommonBtn({
  xtra,
  buttonColor,
  textColor,
  label,
  onClick,
  width = 'w-100 h-100',
  disabled,
}) {
  return (
    <button
      className={`${buttonColor} relative flex items-center justify-center 
        no-sel text-sm tracking-wider leading-none rounded-lg py-2 ${
          width ? 'w-1/2' : 'w-20'
        } transition-transform transform
        ${xtra}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={`items-center justify-center ${width}`}>
        <p className={textColor}>{label}</p>
      </div>
    </button>
  );
}
