
import ActiveArw from '@/components/activeArw'
import Spinner from '@/components/spinner'
import { IcoView, IcoEdit, IcoReview, IcoSubmit , IcoSubmitted, IcoTest, IcoAddUser, IcoUserManage , IcoDownload, IcoSave } from '@/components/icons'

export default function Btn({ico, label, secondary, xtra, isDisable, isActive, onClick}) {

  let classIco = 'w-4 h-4 fill-current ' + (secondary ? 'text-white' : 'text-p-500') ;

  return (
      <button className={'relative flex items-center justify-center no-sel text-sm font-bold tracking-wider uppercase leading-none border border-p-500 rounded-lg transition-transform transform lg:hover:scale-103 '
          + (ico ? 'pt-3 pb-2.5 pl-5.5 pr-7 ' : 'pt-3.5 pb-3 px-8 ')
          + (secondary ? 'text-p-500 bg-white' : 'text-white bg-p-500') + ' ' + xtra + (isDisable ? ' opacity-40 cursor-default' : ' ' ) + ((isActive || isDisable) && ' transform-none cursor-default')}
        onClick={onClick ? onClick : null}
        disabled={isDisable}
      >

        {/* active arw */}
        {isActive && <ActiveArw />}

        <div className={(ico ? "flex" : "hidden") + " items-center justify-center w-6 h-6 min-w-6 rounded-full mr-3 " + (secondary ? "bg-p-500" : "bg-white")}>
          {
              {
                'edit': <IcoEdit className={classIco} />,
                'review': <IcoReview className={classIco} />,
                'submit': <IcoSubmit className={classIco} />,
                'submitted': <IcoSubmitted className={classIco} />,
                'test': <IcoTest className={classIco} />,
                'view': <IcoView className={classIco} />,
                'add-user': <IcoAddUser className={classIco} />,
                'user-manage': <IcoUserManage className={classIco} />,
                'download': <IcoDownload className={classIco} />,
                'save': <IcoSave className={classIco} />,
                'spinner': <Spinner isLoading color={secondary ? "text-p-500 bg-white" : "text-white bg-p-500"} />,
              } [ico]
            }
        </div>
        <p className="pt-0.5">{label}</p>

      </button>
  )
}