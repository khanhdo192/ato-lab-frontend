import { useEffect, useState } from 'react';

import BtnShow from '@/components/btnShow'
import ModalMain from '@/components/modalMain'
import { IcoSuccess, IcoError  } from '@/components/icons'

export default function ModalChallange ({ show, toggleShow, responseBody }) {

  const [width, setWidth] = useState(window.innerWidth / 4);
  const [height, setHeight] = useState(window.innerHeight * 0.7);

  const resize = () => {
    setWidth(window.innerWidth / 4);
    setHeight(window.innerHeight * 0.7);
  }

  window.addEventListener('resize', resize);

  const ChallengePage = () => {
    const html = document.createElement('html');
    html.innerHTML = responseBody;

    return (
      <iframe width={width} height={height} srcDoc={html.innerHTML} />
    );
  }

  return (
    <ModalMain isOpen={show} zIndex="50">
      <BtnShow ico="hide" label="HIDE CHALLENGE PAGE" onClick={toggleShow} textColor="text-white" />
      <div style={{ "pointerEvents": "none" }} className="mt-3">
        <ChallengePage />
      </div>
    </ModalMain>
  )
}
