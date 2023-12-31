

export default function HomeTableSages({stageId, minimal}) {
  
  const labels=['PROFILE REVIEW', 'RESULTS REVIEW', 'APPROVAL']
  const tx_color=['text-b-310', 'text-y-400', 'text-r-400']
  const bg_color=['bg-b-100', 'bg-y-100', 'bg-r-100']
    
  return (
      <div className={'font-semibold rounded-xl w-mt max-w-full ' + tx_color[stageId] + (minimal ? ' bg-transparent px-0 py-0' : ' '+bg_color[stageId] + ' px-3 py-2') }>
        <p className='text-xxs leading-none tracking-wide truncate'>{labels[stageId]}</p>
      </div>
  )
}