

export default function ContainerCol_40_60({children, xtra}) {

  return (
      <div className={"grid lg:grid-cols-40-60 gap-3 lg:gap-4 " + xtra}>
        {children}
      </div>
  )
}