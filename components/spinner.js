import { IcoSpinner } from '@/components/icons';

export default function Spinner({
  isLoading,
  color = 'text-b-310',
  size = '6',
  xtra,
}) {
  return (
    <div
      className={
        (isLoading ? 'flex' : 'hidden') +
        ' flex items-center justify-center ' +
        xtra
      }
    >
      <IcoSpinner
        className={`w-${size} h-${size} fill-current animate-spin ${color}`}
      />
    </div>
  );
}
