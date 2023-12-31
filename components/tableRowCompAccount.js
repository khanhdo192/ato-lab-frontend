import BtnAction from '../components/btnAction'

export default function TableRowCompAccount({data}) {
  
  const commonDiv="flex "
  const commonP="truncate pl-1 pr-0.5 "
    
  return (
      <div className="relative grid grid-cols-2 lg:grid-cols-comp-account gap-1.5 lg:gap-0  items-center text-sm  lg:text-xs text-gr-700 pt-10 pb-4 lg:py-2.5 
          border-t lg:border-t-0 lg:border-b border-b-200">
          
          <div className={commonDiv}>
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
          
          <div className={commonDiv}>
            <p className={commonP}>{data[4]}</p>
          </div>
          
          <div className={commonDiv}>
            <p className={commonP}>{data[5]}</p>
          </div>
          
          <div className={commonDiv}>
            <p className={commonP}>{data[6]}</p>
          </div>
          
          <div className={commonDiv}>
            <p className={commonP}>{data[7]}</p>
          </div>
          
          <div className={commonDiv}>
            <p className={commonP}>{data[8]}</p>
          </div>
          
          <div className={commonDiv}>
            <p className={commonP}>{data[9]}</p>
          </div>

          <div className="flex lg:justify-end">
            <BtnAction ico="edit" color="bg-p-500" />
          </div>
      </div>
  )
}