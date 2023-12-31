

export default function TableRowSessionHistory({data, isActive, onClick}) {

  const commonDiv = "flex"
  const commonP = "truncate pl-1 pr-0.5 "

  return (
      <div
        className={"relative grid grid-cols-test-session gap-0items-center text-sm lg:text-xs text-gr-700 py-2.5 border-t lg:border-t-0 lg:border-b border-b-200 cursor-pointer transition-transform transform lg:hover:scale-y-110 " + (isActive ? "bg-b-100" : "" )}
        onClick={onClick}
        >
          <div>
            <a className={commonP + " cursor-pointer text-p-500 font-medium"}>{data[0]}</a>
          </div>
          <div className={commonDiv}>
            <p className={commonP}>{data[1]}</p>
          </div>
          <div className={commonDiv + " justify-center text-center"}>
            <p className={commonP}>{data[2]}</p>
          </div>
      </div>
  )
}