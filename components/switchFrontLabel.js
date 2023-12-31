export default function SwitchFrontLabel({
  label,
  id,
  labelColor,
  xtra,
  isDisable,
  isActive,
  onClick,
}) {
  return (
    <div id={id}>
      <div
        className={
          'flex items-center relative px-1 lg:px-2 mb-6 text-gr-600 ' +
          (isDisable ? 'opacity-40 ' : 'cursor-pointer ') +
          xtra
        }
        onClick={isDisable ? null : onClick}
      >
        {label && (
          <p
            className={
              'tracking-wide font-medium pr-4 ' + (labelColor && labelColor)
            }
          >
            {label}
          </p>
        )}
        <div
          className={
            'flex items-center min-w-11 w-11 h-6 px-1 rounded-full border ' +
            (isActive
              ? 'bg-blue-500 border-blue-500 justify-end'
              : 'bg-blue-300 border-blue-300')
          }
        >
          <div
            className={
              'w-4.5 h-4.5 rounded-full ' + (isActive ? 'bg-white' : 'bg-white')
            }
            // TODO: put the IcoCheckSVG image enter the background image when the Swicth is activated
            // style={{ backgroundImage: `url(${IcoCheckSVG})` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
