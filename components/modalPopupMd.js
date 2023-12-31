import Container from '../components/container'
import TextH1 from '../components/textH1'
import TextH2 from '../components/textH2'
import Divider from '../components/divider'

  
export default function ModalPopupMd({title, text, children}) {

  return (
      <Container xtra="w-full relative flex flex-col items-center max-w-modal-md h-mt -mt-20 lg:-mt-6">
          <div className="text-center">
            <TextH1 text={title} />
           
            <TextH2 text={text} />
          </div>
  
          <Divider />
          
          <div className="w-full">
            {children}
          </div>
      </Container>
  )
}