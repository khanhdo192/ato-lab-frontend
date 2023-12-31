
import TextH4 from '../components/textH4'

export default function SwitchGroup({title, xtra, children}) {
  
  return (
    <div className={xtra}>
      <TextH4 text={title} />
      
      {children}
    </div>
  )
}