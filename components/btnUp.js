import React, { useEffect, useState } from 'react';
import { IcoArwPull } from '../components/icons';

export default function BtnUp({}) {
  let [opacity, setOpacity] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', btUpScroll);

    function btUpScroll() {
      window.scrollY >= 100 ? setOpacity(1) : setOpacity(0);
    }

    return () => {
      window.removeEventListener('scroll', btUpScroll);
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollUp}
      className={`${
        opacity ? 'fixed' : 'hidden'
      } flex items-center justify-center w-12 h-12 bg-white opacity-60 shadow-md rounded-full bottom-4 right-4 cursor-pointer`}
    >
      <IcoArwPull className="w-4 h-4 text-b-600 fill-current transform rotate-180" />
    </button>
  );
}
