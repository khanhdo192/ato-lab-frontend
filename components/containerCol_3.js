export default function ContainerCol_3({ xtra, children }) {
  return (
    <div className={'grid xl:grid-cols-3 gap-3 lg:gap-4 ' + xtra}>
      {children}
    </div>
  );
}
