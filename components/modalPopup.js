import Container from '../components/container';
import TextH1 from '../components/textH1';
import BtnPopClose from '../components/btnPopClose';

export default function ModalPopup({
  title,
  text,
  children,
  btnClose,
  color,
  fontSize,
}) {
  return (
    <Container xtra="relative w-full flex flex-col items-center text-center max-w-modal h-mt -mt-20 lg:-mt-6">
      {btnClose && <BtnPopClose />}

      <TextH1 text={title} color={color} fontSize={fontSize} xtra="mt-3" />

      <p className="mt-3 mb-6">{text}</p>

      {children}
    </Container>
  );
}
