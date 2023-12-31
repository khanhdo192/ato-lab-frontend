
import TextH1 from '../components/textH1'

import Divider from '../components/divider'

export default function Instructions({ title, children, xtra }) {

  return (
    <div className={"" + xtra}>
                      
      <TextH1 text={title} />
      
      <Divider />
      
      {children}
      
    </div>
  )
}
