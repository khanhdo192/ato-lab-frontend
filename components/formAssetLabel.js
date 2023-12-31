
export default function FormLabel({id, label}) {

  return (
    <label htmlFor={id} className={(label ? 'block' : 'hidden')  + " relative text-xs font-medium lg:font-semibold text-gr-600 tracking-wide pb-1.5"}>{label}</label>
  )
}
