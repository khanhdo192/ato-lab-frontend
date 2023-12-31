
import ActiveArw from '@/components/activeArw'
import { IcoArwPull, IcoArwNext } from '@/components/icons'

export default function BtnNextCase({ico, isDisable, onClick}) {

  const classIco = "w-2.5 h-2.5 text-gr-600 fill-current transform " ;

  return (
      <button
        onClick={onClick}
        disabled={isDisable}
        className={'flex items-center justify-center w-8 h-8 bg-gr-200 rounded-lg no-sel ' + (isDisable ? 'cursor-default opacity-50' : 'transition-transform transform lg:hover:scale-110')}
        >
          {
            {
              'prev': <IcoArwPull className={classIco + "rotate-90"} />,
              'start': <IcoArwNext className={classIco} />,
              'end': <IcoArwNext className={classIco + "rotate-180"} />,
              'next': <IcoArwPull className={classIco + "-rotate-90"} />,
            } [ico]
            }
      </button>
  )
}