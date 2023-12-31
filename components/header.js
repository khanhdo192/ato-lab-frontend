import { IcoMenu } from '../components/icons';

export default function Header({ setStatus, children }) {
  return (
    <header className="sticky lg:relative z-20 top-0 p-2 pb-4 bg-b-100">
      <div className="flex justify-between items-center">
        <div
          onClick={() => setStatus(true)}
          className="flex items-center bg-white w-12 h-12 lg:hidden rounded-full cursor-pointer"
        >
          <IcoMenu className="m-auto w-8 h-8 text-b-500 fill-current" />
        </div>
        {children}
      </div>
    </header>
  );
}
