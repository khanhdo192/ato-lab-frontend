export default function ContainerCol_4({ xtra, children }) {
  return (
    <div
      className={`grid lg:grid-cols-4 gap-x-3 lg:gap-x-4 mb-4 ${
        xtra ? xtra : ''
      }`}
    >
      {children}
    </div>
  );
}
