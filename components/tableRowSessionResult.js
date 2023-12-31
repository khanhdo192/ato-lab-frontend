import { IcoSuccess, IcoError, IcoNa  } from '../components/icons'

export default function TableRowSessionResult({data, result, isActive, onClick}) {
  const commonDiv = "flex"
  const commonP = "truncate pl-1 pr-0.5 "
  const icoClass = "min-w-6 min-h-6 text-white fill-current"

  const icos = [<IcoError className={icoClass} />, <IcoSuccess className={icoClass} />, <IcoNa className={icoClass} />]
  const bg_color = ["bg-r-400", "bg-g-400", "bg-gr-400"]

  return (
      <div
        className={"relative grid grid-cols-2 lg:grid-cols-test-result gap-1.5 lg:gap-0  items-center text-sm  lg:text-xs text-gr-700 pt-12 pb-4 lg:py-2.5 border-t lg:border-t-0 lg:border-b border-b-200 cursor-pointer transition-transform transform lg:hover:scale-y-110 " + (isActive ? "bg-b-100" : "" )}
        onClick={onClick}
        >
          <div>
            <a className={commonP + " cursor-pointer text-p-500 font-medium"}>{data[0]}</a>
          </div>
          <div className={commonDiv}>
            <p className={commonP}>{data[1]}</p>
          </div>
          <div className={commonDiv}>
            <p className={commonP}>{data[2]}</p>
          </div>
          <div className={commonDiv}>
            <p className={commonP}>{data[3]}</p>
          </div>
          <div className={commonDiv + " absolute lg:relative top-4 left-1.5 lg:top-0 lg:left-0 lg:justify-center"}>

              {/* pass / error */}
              <div className={"flex items-center justify-center w-5.5 h-5.5 rounded-full " + (bg_color[result])}>
                {
                  icos[result]
                }
              </div>
          </div>
      </div>
  )
}