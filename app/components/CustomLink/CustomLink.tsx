
import Link from 'next/link'

interface CustomLinkProps {
  href: string,
  children: React.ReactNode
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', textTransform: 'none', color: 'inherit' }}
    >
      {children}
    </Link>
  )
}
export default CustomLink
