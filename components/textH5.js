

export default function TextH5({color, text, highliteText, xtra}) {

  return (
    <h5 className={(color ? color : 'text-gr-600') + ' mb-4 text-sm font-medium tracking-wide ' + xtra}>
      {text}<span className='text-b-500 font-semibold'> {highliteText}</span>
    </h5>
  )
}
