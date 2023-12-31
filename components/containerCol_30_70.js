

export default function ContainerCol_30_70({children, xtra}) {

  return (
      <div className={"grid lg:grid-cols-30-70 gap-3 lg:gap-4 " + xtra}>
        {children}
      </div>
  )
}