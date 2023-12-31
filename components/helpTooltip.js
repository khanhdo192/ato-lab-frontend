import React from 'react';
import { IcoSupport } from '../components/icons'

export default function HelpTooltip({text, alignX, alignY}) {
  
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
        
        <div className="absolute -top-7 -right-2 cursor-pointer z-40">
          
           {/*  Icon  */}
          <div onClick={toggleOpen} className="no-sel relative flex items-center justify-center w-6 h-6 bg-white rounded-full -mt-1 mr-2 shadow-icon">
            <IcoSupport className="no-sel w-5 h-5 text-p-500 fill-current transition-transform transform lg:hover:scale-110 " />
          </div>
          
          <div onClick={toggleOpen}  className={(!isOpen && "hidden") + " no-sel relative -top-5 anim-fade"}>
          
            {/*  Arrow  */}
             <div className={'absolute w-3.5 h-3.5 bg-gr-700 transform rotate-45 ' + ((alignY=='t') ? '-top-6 ' : 'top-8 ' )  + 'right-3.5'}></div>
            
            {
              /* 
              alignX l = left
              alignY t = top
              */
            }
            
            {/*  Paragraph  */}
            <div className={'absolute flex w-64 max-w-md ' + ((alignY=='t') ? 'bottom-full pb-3.5 ' : 'top-9 ' )  + ((alignX=='l') ? '-left-2' : 'right-2')}>
              <p className="relative w-full bg-gr-700 rounded-lg text-white tracking-wide leading-relaxed p-4">
               { text }
              </p>
            </div>
            
          </div>
        </div>
  )
}