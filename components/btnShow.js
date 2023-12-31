
import { IcoPlus, IcoMin } from '../components/icons'

export default function Btn({ico, label, onClick, textColor = "text-p-500"}) {

  const classIco = "w-4.5 h-4.5 fill-current mr-1.5 transition-transform transform lg:group-hover:scale-110 "+ textColor;

  return (
      <button
        className="group flex items-center mt-6 no-sel"
        onClick={onClick}
        >
        {
          {
            'show': <IcoPlus className={classIco} />,
            'hide': <IcoMin className={classIco} />,
          } [ico]
        }
        <p className={"uppercase text-xxs font-semibold tracking-wider mt-0.5 " + textColor}>{label}</p>
      </button>
  )
}