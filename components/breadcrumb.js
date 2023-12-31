export default function Breadcrumb({ children }) {
  return (
    <div className="breadcrumb hidden lg:flex items-center text-b-600 font-medium text-xl">
      {children}
    </div>
  );
}
