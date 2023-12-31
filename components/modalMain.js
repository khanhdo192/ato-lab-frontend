export default function ModalMain({
  children,
  isOpen,
  zIndex = '10',
  className,
}) {
  return (
    <div
      className={`${
        isOpen ? 'fixed' : 'hidden'
      } modal-bg top-0 left-0 flex flex-col w-full overflow-y-auto h-screen items-center justify-center p-2 md:p-4 z-${zIndex} ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  );
}
