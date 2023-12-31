

export default function FormItemRadio({id, name, value, label, xtra, isDisabled, isActive, isChequed}) {
  const onChangeHandler = () =>{
    
  }
  return (
      <div className={"flex items-center relative px-1 lg:px-2 mb-6 " + (isDisabled ? "opacity-40" : "cursor-pointer") + " " + xtra}>
        <input className="no-sel-input w-5 h-5 cursor-pointer" type="radio" id={id} name={name} value={value} checked={isChequed} disabled={isDisabled} onChange={onChangeHandler} />

        <label htmlFor={id} className="block text-xs tracking-wide font-medium pl-3 truncate cursor-pointer">{label}</label>
      </div>
  )
}
