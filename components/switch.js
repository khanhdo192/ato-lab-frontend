export default function Switch({
  label,
  id,
  labelColor,
  xtra,
  isDisable,
  isActive,
  onClick,
}) {
  return (
    <div id={id} className="">
      <div
        className={
          'flex items-center relative px-1 lg:px-2 mb-6 text-gr-600 ' +
          (isDisable ? 'opacity-40 ' : 'cursor-pointer ') +
          xtra
        }
        onClick={isDisable ? null : onClick}
      >
        <div
          className={
            'flex items-center min-w-11 w-11 h-6 px-1 rounded-full border ' +
            (isActive
              ? 'bg-p-500 border-p-500 justify-end'
              : 'bg-gr-100 border-gr-400')
          }
        >
          <div
            className={
              'w-4.5 h-4.5 rounded-full ' +
              (isActive ? 'bg-white' : 'bg-gr-400')
            }
          ></div>
        </div>
        {label && (
          <p
            className={
              'text-xs tracking-wide font-medium pl-3 ' +
              (labelColor && labelColor)
            }
          >
            {label}
          </p>
        )}
      </div>
    </div>
  );
}
