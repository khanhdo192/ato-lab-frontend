import TextH5 from '../components/textH5'

export default function TableRowSwitchs3({title, children}) {

  return (
      <div className="relative grid grid-cols-3 lg:grid-cols-switchs-3 gap-0 items-center text-sm lg:text-xs text-gr-700 pt-18 pb-5 lg:py-5 border-t lg:border-t-0 lg:border-b border-b-200">
          <div className="absolute lg:relative top-6 lg:top-auto">
            <TextH5 highliteText={title} xtra="m-n" />
          </div>
          {children}
      </div>
  )
}