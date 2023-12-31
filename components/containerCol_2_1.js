

export default function ContainerCol_2_1({children, xtra}) {

  return (
      <div className={"grid lg:grid-cols-2-1 gap-3 lg:gap-4 " + xtra}>
        {children}
      </div>
  )
}