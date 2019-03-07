import Header from './Header'
import Head from 'next/head';

const Layout = (props) => (
  [ 
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/static/styles.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Vollkorn" rel="stylesheet" />

    </Head>,
    <Header />,
    <main className="main">
      {props.children}
    </main>
  ]
)

export default Layout
