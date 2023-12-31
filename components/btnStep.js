export default function BtnStep({
  label,
  step,
  status,
  isActive,
  isDisable,
  onClick,
}) {
  return (
    <button
      disabled={isDisable}
      onClick={onClick}
      className={
        `${
          isActive ? 'bg-blue-900' : 'bg-gray-400'
        } text-white py-4 px-4 items-center no-sel w-full font-medium leading-none pt-4 lg:pt-4 lg:pt-4 border-blue-900 rounded-lg transition-transform transform lg:hover:scale-103 flex justify-center ` +
        (isDisable
          ? 'cursor-default transform-none'
          : isActive
          ? 'cursor-default'
          : '')
      }
    >
      <p>
        Step {step} <span className="hidden lg:inline">- {label}</span>
      </p>
    </button>
  );
}
