import { IcoMin, IcoPlus } from '../components/icons'
import FormItemCheckbox from '../components/formItemCheckbox'

export default function FormItemExpandCheck({id, checkId, checkName, checkValue, label, children, isExpanded, isChecked}) {
  
  const icoClass="w-4.5 h-4.5 min-w-4.5 text-p-500 fill-current"
  
  return (
    <div>
      <div className="flex items-center">
        <a className="cursor-pointer -mt-0.5">
          { isExpanded ? ( <IcoMin className={icoClass} /> ) :  ( <IcoPlus className={icoClass} /> ) }
        </a>
       <FormItemCheckbox id="c1" name="c" value="1" label={label} xtra="m-n" />
      </div>
      <div className="pl-6 mt-2.5">
          { isExpanded && children }
      </div>
    </div>
  )
}
