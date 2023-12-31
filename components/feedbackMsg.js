import { IcoError, IcoWarn, IcoSuccess, IcoInfo } from '../components/icons';

export default function FeedbackMsg({ type, text, link, linkText, important }) {
  const style_color = {
    error: 'text-r-400 border-r-400 ',
    warn: 'text-y-450 border-y-400 ',
    success: 'text-g-450 border-g-400 ',
    info: 'text-b-500 border-b-500 ',
  };
  const style_bg = {
    error: 'bg-r-100 ',
    warn: 'bg-y-100 ',
    success: 'bg-g-100 ',
    info: 'bg-b-100 ',
  };
  const style_bg_ico = {
    error: 'bg-r-400 ',
    warn: 'bg-y-400 ',
    success: 'bg-g-400 ',
    info: 'bg-b-500 ',
  };
  let color = style_color[type];
  let bg = style_bg[type];
  let bgIco = style_bg_ico[type];

  let classIco =
    'h-5 w-5 min-w-5 fill-current ' + (important ? 'text-white' : '');

  return (
    <div
      className={
        'w-full relative flex text-sm tracking-wide border rounded-md overflow-hidden p-3 pt-4  my-3 ' +
        color +
        (important ? 'bg-white pl-18' : bg + 'pl-14')
      }
    >
      <div
        className={
          'absolute flex items-center justify-center w-14 h-full top-0 left-0 ' +
          (important ? bgIco : 'transparent')
        }
      >
        {
          {
            error: <IcoError className={classIco} />,
            warn: <IcoWarn className={classIco} />,
            success: <IcoSuccess className={classIco} />,
            info: <IcoInfo className={classIco} />,
          }[type]
        }
      </div>
      <p className="relative">
        {text}
        <a
          href={link}
          className={
            (link ? 'inline' : 'hidden') +
            ' relative font-medium underline ml-2'
          }
          hrefLang="link"
        >
          {linkText}
        </a>
      </p>
    </div>
  );
}
