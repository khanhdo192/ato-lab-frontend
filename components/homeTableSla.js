

export default function HomeTableSla({statusId, minimal}) {

    return (
        <div className={'font-semibold rounded-xl w-mt max-w-full text-' + statusId[2] + (minimal ? ' bg-transparent px-0 py-0' : ' bg-' + statusId[1] + ' px-3 py-2') }>
          <p className='text-xxs leading-none tracking-wide truncate uppercase'>{statusId[0]}</p>
        </div>
    )
  }