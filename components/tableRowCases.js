
export default function TableRowCases({data}) {
  
  const commonDiv=""
  const commonP="truncate pr-0.5 "

    
  return (
      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-1.5 lg:gap-0  items-center text-sm  lg:text-xs text-gr-700 pt-3 pb-3 lg:py-2.5 
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
          <div className={commonDiv}>
            <p className={commonP}>{data[3]}</p>
          </div>
      </div>
  )
}