import Link from 'next/link'
import Head from 'next/head';

const Header = () => (
  <div>
    <Head>
      <link href="/static/styles.css" rel="stylesheet" />

    </Head>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/about">
      <a>About</a>
    </Link>
  </div>
)

export default Header
