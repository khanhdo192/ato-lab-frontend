import { IcoArwSort } from '../components/icons'

export default function StatusVariation({type, variation}) {

  let classDiv = "text-g-400 bg-g-100";

  (variation < 0 ? classDiv="text-r-400 bg-r-100" : "") 
  
  return (

         
        <div className={((variation != undefined) ? "flex " : "hidden ") + classDiv + " items-center text-sm font-medium tracking-widest px-1 rounded-md ml-3"}>
          { (variation > 0) ? "+" + variation : variation }

          <IcoArwSort className={"fill-current w-2 h-2 ml-0.5 transform" + ( (variation < 0) ? "" : " rotate-180 mt-px")} />
        </div>
  )
}