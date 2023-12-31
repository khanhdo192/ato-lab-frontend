import Link from 'next/link';

export default function BreadcrumbItem({
  isFirst,
  label,
  link,
  color = 'text-b-800',
  fontSize = 'text-2xl',
}) {
  return (
    <div className={`flex items-center cursor-pointer ${fontSize}`}>
      <div
        className={
          (isFirst ? 'hidden ' : '') +
          'w-1 h-1 bg-gr-400 rounded-full mx-2 -mt-0.5 '
        }
      ></div>
      {link ? (
        <Link href={link ? link : ''}>{label}</Link>
      ) : (
        <p className={`${color} font-medium`}>{label}</p>
      )}
    </div>
  );
}
