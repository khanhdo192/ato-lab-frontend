import StatusVariation from '../components/statusVariation';

export default function HomeHighliteItem({
  val,
  label,
  color,
  variation,
  type,
  isLast,
  subString,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <p className="text-sm font-medium tracking-wide mt-0.5 md:break-words md:truncate">
        {label}
        <br />
        {subString && <span className="text-xs font-normal">{subString}</span>}
      </p>
      <div
        className={
          (color ? color : 'bg-b-300 ') +
          (val == '0' ? 'opacity-30' : '') +
          ' flex justify-center min-w-6 pb-0.5 pt-1 pl-1.5 pr-1.5 sm:ml-3 rounded-lg max-w-max'
        }
      >
        <p className="font-semibold text-white leading-none ml-2px">{val}</p>
      </div>

      <StatusVariation variation={variation} type={type} />
    </div>
  );
}
