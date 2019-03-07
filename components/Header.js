import Link from 'next/link'

const Header = () => (
  <div className="nav-position">
    <nav>
      <Link href="/">
        <a className="link">One Question</a>
      </Link>
      <Link href="/about">
        <a className="link">About</a>
      </Link>
    </nav>
  </div>
)

export default Header
