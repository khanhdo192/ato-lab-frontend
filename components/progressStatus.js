
export default function ProgressStatus({current, from}) {
  
  return (
      <p className="text-xs text-gr-600 my-4">{current} <span className="text-gr-300">/ {from}</span></p>
  )
}