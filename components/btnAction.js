import React from 'react';
import {
  IcoCopy,
  IcoClose,
  IcoDownload,
  IcoPrint,
  IcoTest,
  IcoComplete,
  IcoReview,
  IcoSubmitted,
  IcoPlay,
  IcoStop,
  IcoRestore,
  IcoSave,
  IcoDelete,
  IcoManage,
  IcoEdit,
  IcoView,
} from '@/components/icons';
import Spinner from '@/components/spinner';

export default function BtnAction({
  ico,
  color,
  label,
  xtra,
  onClick,
  colorLabel,
  isDisable,
  secondary,
  isSelected,
  buttonStyle = 'bg-gr-100',
  buttonStyleSelected = 'bg-p-500',
}) {
  const [isCopy, setIsCopy] = React.useState(false);
  const toggleCopy = () => setIsCopy(!isCopy);

  const classIco = 'relative w-4 h-4 w-4.5 h-4.5 text-white fill-current';

  return (
    <button
      onClick={onClick}
      disabled={isDisable}
      className={
        'no-sel flex items-center ' +
        (label ? 'lg:min-w-btn-action rounded-lg h-9 ' : 'rounded-full h-8 ') +
        (isSelected ? buttonStyleSelected : buttonStyle) +
        ' p-1 ' +
        (ico ? ' lg:p-0.5 ' : ' px-1 ') +
        (xtra ? xtra : 'relative') +
        ' ' +
        (isDisable && ' transform-none cursor-default opacity-40')
      }
    >
      <div
        className={
          color +
          (ico ? ' flex' : ' hidden') +
          ' relative items-center justify-center w-6 h-6 min-w-6 lg:w-6.5 lg:h-6.5 lg:min-w-6.5 rounded-full'
        }
      >
        {
          {
            copy: <IcoCopy className={classIco} />,
            download: <IcoDownload className={classIco} />,
            print: <IcoPrint className={classIco} />,
            test: <IcoTest className={classIco} />,
            complete: <IcoComplete className={classIco} />,
            review: <IcoReview className={classIco} />,
            restore: <IcoRestore className={classIco} />,
            play: <IcoPlay className={classIco} />,
            stop: <IcoStop className={classIco} />,
            save: <IcoSave className={classIco} />,
            delete: <IcoDelete className={classIco} />,
            manage: <IcoManage className={classIco} />,
            edit: <IcoEdit className={classIco} />,
            view: <IcoView className={classIco} />,
            close: <IcoClose className={classIco} />,
            spinner: (
              <Spinner
                isLoading
                size={4}
                color={
                  secondary ? 'text-p-500 bg-white' : 'text-white bg-p-500'
                }
              />
            ),
          }[ico]
        }
      </div>
      {label && (
        <p
          className={
            (colorLabel
              ? colorLabel
              : isSelected
              ? 'text-white'
              : 'text-gr-550') +
            ' relative uppercase text-btn-action font-medium text-center w-full tracking-wider mt-0.5 mx-1.5 lg:mx-2 truncate'
          }
        >
          {label}
        </p>
      )}
      {/*   Feedback DEMO    
      <div
        className={
          'absolute w-full justify-center left-0 -top-10 animate-bounce ' +
          (isCopy ? 'flex' : 'hidden')
        }
      >
        <div className="relative flex items-center bg-gr-700 text-sm text-white font-medium tracking-wider pl-2 pt-2 pr-2.5 pb-1.5 rounded-lg">
          <div className="absolute w-full left-0 -bottom-1 flex justify-center">
            <div className="bg-gr-700 w-4 h-4 transform rotate-45"></div>
            <IcoSubmitted className="w-3 h-4 text-g-400 fill-current mr-1 -mt-0.5" />
            <div className="relative whitespace-nowrap">Done!</div>
          </div>
        </div>
        
      </div>
      */}
    </button>
  );
}
