import { IcoSubmit  } from '../components/icons'
import HomeTableStatus from '../components/homeTableStatus'

export default function TableRowProjectLogStep1({data, statusId}) {

  const commonDiv=""
  const commonP="truncate pr-0.5 "
  const icoClass="w-3.5 h-3.5 min-w-3.5 min-h-3.5 text-white fill-current"

  return (
      <div className="relative grid grid-cols-2 lg:grid-cols-log-table-step-1 gap-1.5 lg:gap-0  items-center text-sm  lg:text-xs text-gr-700 pt-10 pb-4 lg:py-2.5
          border-t lg:border-t-0 lg:border-b border-b-200">
          <div>
            <p className={commonP}>{data[0]}</p>
          </div>
          <div className={commonDiv}>
            <p className={commonP}>{data[1]}</p>
          </div>
          <div className={commonDiv}>
            <p className={commonP}>{data[2]}</p>
          </div>
          <div className={commonDiv + " absolute lg:relative lg:justify-center top-5 lg:top-0"}>
              <HomeTableStatus statusId={statusId} minimal />
          </div>
          <div className={commonDiv}>
            <p className={commonP}>{data[3]}</p>
          </div>
      </div>
  )
}