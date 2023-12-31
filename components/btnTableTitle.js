import { IcoArwSort } from '@/components/icons';

export default function BtnTableTitle({
  active,
  label,
  justify,
  noOrder,
  value,
  onClick,
  labelStyle = 'text-gr-600',
  buttonStyles = '',
}) {
  return (
    <button
      onClick={onClick}
      className={
        `no-sel flex items-center pr-0.5 ${buttonStyles} ` +
        (justify == 'right' ? 'justify-end' : '') +
        (justify == 'center' ? 'justify-center' : '')
      }
    >
      <p className={`text-xs font-medium mr-1 truncate ${labelStyle}`}>
        {label}
      </p>
      {!noOrder && (
        <IcoArwSort
          className={
            'fill-current w-2 h-2 mt-px transform ' +
            (active ? 'text-blue-400' : 'rotate-180 text-gr-300')
          }
        />
      )}
    </button>
  );
}
