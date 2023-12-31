

export default function ContainerCol_1_2({children, xtra}) {

  return (
      <div className={"grid lg:grid-cols-1-2 gap-3 lg:gap-4 " + xtra}>
        {children}
      </div>
  )
}