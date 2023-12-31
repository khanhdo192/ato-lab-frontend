import ActiveArw from '@/components/activeArw'
import ResultsItem from '@/components/resultsItem'

export default function BtnTable({label, secondary, xtra, isActive, isDisable, onClick}) {

  return (

          <button disabled={isDisable} onClick={onClick} className={"relative text-sm lg:text-btn-action no-sel font-bold tracking-wide uppercase leading-none border border-p-500 px-4 py-3 lg:py-2.5 rounded-lg transition-transform transform lg:hover:scale-105 "
            + ((secondary && !isActive) ? "text-p-500 bg-white " : "text-white bg-p-500 " ) + ((isDisable || isActive) && 'cursor-default transform-none ')
            + (isDisable && 'opacity-40 ') + ' ' + (xtra && xtra)
          }>
                {/* active arw */}
                {isActive ? (<ActiveArw />) : null}
                <p>{label}</p>
          </button>

  )
}