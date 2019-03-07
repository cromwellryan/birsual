import Header from './Header'
import Head from 'next/head';

const Layout = (props) => (
  [ 
    <Head>
      <link href="/static/styles.css" rel="stylesheet" />

    </Head>,
    <Header />,
    props.children
  ]
)

export default Layout
