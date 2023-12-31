
export default function ProgressBar({percentage}) {
  
  return (
      <div className="relative w-60 h-2 bg-gr-100 rounded-full overflow-hidden">
          <div className={'bg-b-310 h-2'} style={{width: percentage+'%'}}></div>
      </div>
  )
}