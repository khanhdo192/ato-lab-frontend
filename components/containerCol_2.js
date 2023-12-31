

export default function ContainerCol_2({children,xtra}) {

  return (
    <div className={"lg:grid lg:grid-cols-2 gap-x-3 lg:gap-x-4 " + xtra}>
      {children}
    </div>
  )
}