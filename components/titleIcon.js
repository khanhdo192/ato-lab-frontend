import { IcoUserManage, IcoAddUser, IcoEdit  } from '../components/icons'

export default function TitleIcon({ico}) {
  
  const classIco="w-5 h-5 text-b-600 fill-current"

  return (
    <div className={"flex items-center justify-center w-8 h-8 bg-white rounded-full -mt-5 mr-2.5 shadow-icon"}>
      {
        {
          'manage': <IcoUserManage className={classIco} />,
          'add-user': <IcoAddUser className={classIco} />,
          'edit': <IcoEdit className={classIco} />,
        } [ico]
      }

    </div>
  )
}
