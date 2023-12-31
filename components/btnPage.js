import { IcoArwPull } from '@/components/icons'

export default function BtnPage({label, isActive, isDisable}) {

  return (
        
      <div className={(isActive ? "border border-b-600 cursor-default" : "cursor-pointer") + " w-8 h-8 min-w-8 flex items-center justify-center leading-none text-sm text-b-600 font-medium rounded-full"}>
      
        <p className={((label!="left" && label!="right") ? "" : "hidden") + " relative pt-px"}>{label}</p>
        
        {/* arrows  */}
        
        <IcoArwPull className={((label!="left") ? "hidden" : "") + " w-2.5 h-2.5 text-b-600 fill-current transform rotate-90"} />
        <IcoArwPull className={((label!="right") ? "hidden" : "") + " w-2.5 h-2.5 text-b-600 fill-current transform -rotate-90"} />
      </div>
  )
}