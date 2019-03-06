import Header from './Header'
import Head from 'next/head';

const Layout = (props) => (
  <div>
    <Head>
      <link href="/static/styles.css" rel="stylesheet" />

    </Head>
    <Header />
    {props.children}
  </div>
)

export default Layout
