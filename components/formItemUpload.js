
import FormAssetLabel from '../components/formAssetLabel'
import FormAssetErrorP from '../components/formAssetErrorP'
import FormAssetErrorIco from '../components/formAssetErrorIco'
import BtnTable from '../components/btnTable'

export default function FormItemUpload({id, label, filename, btnLabel, error, errorMsg, isDisabled}) {

  return (

    <div className="relative px-1 lg:px-2 mb-8 z-0">

      <FormAssetLabel label={label} />

      <label htmlFor={id} className={'group relative form-input flex items-center justify-between w-full px-2 lg:px-3 pt-2.5 cursor-pointer focus:border-b-300 ' + (error ? "border-r-400" : "")}>

        <span id="spanFile" className="text-gr-300 truncate">{filename}</span>

        <BtnTable label={btnLabel} xtra="relative -z-1 lg:group-hover:scale-105" />

      </label>
       <FormAssetErrorP errorMsg={errorMsg} />
        {error ? (<FormAssetErrorIco />) : null}

       <input className="text-gr-300 py-5 md:py-0 md:ml-2 inputfile hidden" type="file" name="csv_file" id={id} required disabled={isDisabled} />
    </div>
  )
}
