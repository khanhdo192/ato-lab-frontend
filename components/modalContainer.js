export default function ModalContainer({
  children,
  w = 'w-full md:w-11/12',
  h = 'h-full',
}) {
  return (
    <div
      className={`relative h-mt overflow-y-auto px-3 py-4 lg:p-6 lg:pt-7 bg-white rounded-xl ${w} ${h}`}
    >
      {children}
    </div>
  );
}
