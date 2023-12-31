export default function UserMenuItem({label, children, onClick}) {
  return (
    <div onClick={!!onClick ? () => onClick() : null} className="group flex items-center py-1 cursor-pointer">
      {children}
      <p className="mt-1.5 group-hover:text-white transition duration-300">{label}</p>
    </div>
  )
}
