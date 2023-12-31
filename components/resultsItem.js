import { useState } from 'react';
import BtnShow from '@/components/btnShow';
import ModalChallange from '@/components/testCase/modalChallange';
import {
  IcoTestPanelCheck,
  IcoTestPanelCross,
  IcoTestPanelNsnc,
} from '@/components/icons';

export default function ResultItem({
  title,
  isPass,
  description,
  req,
  correctValue,
  responseBody,
  errorMessage,
}) {
  const icoClass = 'min-w-6 min-h-6 text-white fill-current';

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  let testLog = {};

  const canShowChallange =
    correctValue == 'HTML' && isPass && testLog && responseBody;

  return (
    <div className="grid grid-cols-8.5-auto border-b border-b-200 pb-6 my-6 border border-gray-900 rounded-lg p-4 bg-gray-200">
      <div
        className={'flex items-center justify-center w-5.5 h-5.5 rounded-full '}
      >
        {
          (isPass = null ? (
            <IcoTestPanelNsnc className={icoClass} />
          ) : isPass == 0 ? (
            <IcoTestPanelCross className={icoClass} />
          ) : (
            <IcoTestPanelCheck className={icoClass} />
          ))
        }
      </div>
      <div>
        <p className="text-base text-blue-500 mt-px break-all md:break-words">
          {title}
        </p>
        {description && (
          <p
            className={
              show
                ? 'text-sm text-gr-600 mt-4 break-all md:break-words font-medium'
                : 'hidden'
            }
          >
            {' '}
            {req}: {description}
          </p>
        )}
        {/* {errorMessage && (
          <p
            className={
              show
                ? 'text-sm text-gr-600 mt-4 break-all md:break-words'
                : 'hidden'
            }
          >
            {' '}
            {errorMessage}
          </p>
        )} */}

        {/* hide / show btn */}
        <div
          className={
            errorMessage || description || canShowChallange ? 'mt-4' : 'hidden'
          }
        >
          {show ? (
            <BtnShow
              ico="hide"
              label={
                (canShowChallange && 'HIDE CHALLENGE PAGE') ||
                ((description || errorMessage) && 'HIDE DESCRIPTIONS')
              }
              onClick={toggleShow}
            />
          ) : (
            <BtnShow
              ico="show"
              label={
                (canShowChallange && 'SHOW CHALLENGE PAGE') ||
                ((description || errorMessage) && 'SHOW DESCRIPTIONS')
              }
              onClick={toggleShow}
            />
          )}
        </div>
      </div>
      {canShowChallange && responseBody && (
        <ModalChallange
          show={show}
          toggleShow={toggleShow}
          responseBody={responseBody}
        />
      )}
    </div>
  );
}
