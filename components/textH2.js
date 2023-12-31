import { IcoInfo  } from '../components/icons'

export default function TextH2({text, style, isInfo}) {

  return (
    <div className={'flex text-b-600 ' + style}>
      <div className={(isInfo ? 'flex' : 'hidden') + ' items-center justify-center w-6 h-6 bg-white rounded-full -mt-1 mr-2 shadow-icon'}>
        <IcoInfo className="w-5 h-5 text-b-600 fill-current" />
      </div>
      <h2 className="text-sm">{text}</h2>
    </div>
  )
}
