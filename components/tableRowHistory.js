import { IcoSuccess, IcoError } from '../components/icons'

export default function TableRowHistory({data, success, onClick, isActive}) {

  const icoClass = "min-w-6 min-h-6 text-white fill-current"

  const commonDiv = ""
  const commonP = "truncate pr-0.5 "

  return (
      <div
        className={"relative grid grid-cols-hist-table md:grid-cols-hist-table-md gap-1.5 lg:gap-0  items-center text-sm  lg:text-xs text-gr-700 pt-10 pb-4 lg:py-2.5 border-t lg:border-t-0 lg:border-b border-b-200 cursor-pointer transition-transform transform lg:hover:scale-y-110 " + (isActive ? "bg-b-100" : "" )}
        onClick={onClick}
        >
          <div>
            <p className={commonP}>{data[0]}</p>
          </div>
          <div className={commonDiv}>
            <p className={commonP}>{data[1]}</p>
          </div>
          <div className={commonDiv + "flex justify-center"}>

              {/* pass / error */}
              <div className={"flex items-center justify-center w-5.5 h-5.5 rounded-full " + (success ? "bg-g-400" : "bg-r-400" )}>
                {
                  success ?  (<IcoSuccess className={icoClass} />) : (<IcoError className={icoClass} />)
                }
              </div>
          </div>
      </div>
  )
}