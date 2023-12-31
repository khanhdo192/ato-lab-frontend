

export default function TextRole({label}) {

  return (
    <div className="flex items-center">
      <div className="w-1.5 h-1.5 bg-b-600 rounded-full -mt-0.5 mr-1.5"></div>
      <p className="text-xxs uppercase tracking-wider font-semibold text-b-600">{label}</p>
    </div>
  )
}
