import StatusVariation from '../components/statusVariation';

export default function HomeHighliteItemXl({
  type,
  variation,
  val,
  serverName,
  label,
}) {
  return (
    <div className="mb-1 lg:mb-0">
      <div className="flex items-center mb-2">
        <p className="font-light text-5xl font-normal">{val}</p>

        <StatusVariation type={type} variation={variation} />
      </div>

      <p className="uppercase text-xxs tracking-wider truncate">
        <span className="font-bold text-b-310">{serverName}</span>
        {label}
      </p>
    </div>
  );
}
