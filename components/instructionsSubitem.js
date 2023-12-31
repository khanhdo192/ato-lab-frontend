
import { IcoArwSort  } from '../components/icons'

export default function InstructionsSubitem({text}) {

  return (
    <div className="flex mt-6 lg:pl-2">
      <div className="flex items-center justify-center w-3 h-3 min-w-3 mt-0.5 mr-2">
        <IcoArwSort className="w-2.5 h-2.5 text-b-310 fill-current transform -rotate-90" />
      </div>
      <p className="text-sm text-gr-600 break-all md:break-words" >
        {text}
      </p>
    </div>
    
  )
}
