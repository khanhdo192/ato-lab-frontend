import { IcoClose } from '../components/icons';

export default function BtnPopClose({ onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="absolute top-2 right-2 z-10 shadow-icon lg:shadow-none flex justify-center items-center w-8 h-8 bg-white rounded-full cursor-pointer "
    >
      <IcoClose className="w-5.5 h-5.5 text-p-500 fill-current" />
    </button>
  );
}
