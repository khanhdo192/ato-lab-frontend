import TextH4 from '../components/textH4';

export default function ProceduresItem({
  title,
  text,
  className,
  titleClassName,
}) {
  return (
    <div className={className ? className : ''}>
      <TextH4 text={title} style={titleClassName ? titleClassName : ''} />
      <p className="text-sm text-gr-600 tracking-wide leading-6 break-words">
        {text}
      </p>
    </div>
  );
}
