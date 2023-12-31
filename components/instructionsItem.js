
import { IcoArwSort  } from '../components/icons'

export default function InstructionsItem({text, children}) {

  return (
    <div className="flex border-b border-b-200 pb-6 my-6">
                      
      <div className="flex items-center justify-center w-2 h-2 min-w-2 mt-1.5 mr-2 lg:mr-3 rounded-full bg-b-310"></div>
      
      <div>
        <p className="text-base text-gr-500 mt-px break-all md:break-words">
          {text}
        </p>
        
        {children}
        
      </div>
      
    </div>
  )
}
