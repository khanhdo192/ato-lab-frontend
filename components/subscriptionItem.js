import Btn from '../components/btn'
import Divider from '../components/divider'

export default function SubscriptionItem({invoice, activated, until, percentageExpended, isEmpty, service, subscriptionCode, onClick}) {
  const dotClass="w-2 h-2 bg-b-300 rounded-full mr-2.5"

  let varColor="bg-g-400"
  let isExpire= false

  if (percentageExpended>=100){
    varColor="bg-r-400"; isExpire=true;
  }else if(percentageExpended>=75){
    varColor="bg-y-400"
  }

  return (
    <div className={(isEmpty ? 'bg-b-200 hidden lg:block' : 'subs-grad') + ' rounded-xl p-2 pt-4 mb-3 lg:mb-4'}>
        {/* Title  */}
        <div className={(isEmpty && 'opacity-0') + ' my-1 ml-2 text-white uppercase'}>
          <div className="text-btn-action font-medium tracking-wider mb-1">Subscription Code: </div>
          <div className="text-3xl md:text-2xl font-medium tracking-wide mb-2.5">{(subscriptionCode ? subscriptionCode : "-")}</div>
        </div>

        {/* Content  */}
        <div className="p-3 pt-4 bg-white rounded-lg">
          <div className={(isEmpty && 'opacity-0 cursor-default')} >
            <div className="text-gr-500 mb-2 text-base tracking-wider truncate">
              Activated: <span className="text-b-310 font-semibold">{activated}</span>
            </div>

            <div className={(isExpire ? 'text-r-400' : 'tx-gr-500') + ' text-btn-action tracking-wider uppercase -mb-1.5'}>Valid until: {until}</div>

            <Divider />

            <div className="text-sm text-gr-600 tracking-wide leadin-none -mt-2 mb-6">

              <div className="flex items-center">
                <div className={dotClass}></div>
                <div className="mt-0.5 truncate">{service} Self-Testing Service</div>
              </div>

              <div className="flex items-center">
                <div className={dotClass}></div>
                <div className="mt-0.5 truncate">Invoice # <span className="text-b-300">{invoice}</span></div>
              </div>

            </div>

            {/* Progress Bar  */}
            <div className="relative w-full h-2 bg-gr-100 rounded-full overflow-hidden">
                <div className={varColor + ' h-2'} style={{width: percentageExpended +'%'}}></div>
            </div>

            <Btn label="download" ico="download" secondary xtra="w-full mt-6" onClick={onClick ? onClick : null } isDisable={isEmpty} />
          </div>
        </div>
    </div>
  )
}
