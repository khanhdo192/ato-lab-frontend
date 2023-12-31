

export default function TextH1({color, text, highliteText, xtra}) {

  return (
    <h1 className={(color ? color : 'text-gr-600') + ' mb-4 text-lg font-medium tracking-wide ' + xtra}>
      {text}<span className="text-b-500 font-semibold"> {highliteText}</span>
    </h1>
  )
}
