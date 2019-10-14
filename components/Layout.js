import Header from './Header'
import Head from 'next/head';

const metaDescription = (question) => {
  let description = "Questions and conversation starters for one-on-one meetings";

  if (question) {
    description = question.text;
  }

  return <meta name="og:description" content={description} />;
}

const Layout = (props) => (
  [ 
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/static/styles.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Vollkorn" rel="stylesheet" />

      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"/>
      <link rel="manifest" href="/static/site.webmanifest"/>
      <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#a55bd5"/>
      <link rel="shortcut icon" href="/static/favicon.ico"/>
      <meta name="msapplication-TileColor" content="#ffffff"/>
      <meta name="msapplication-config" content="/static/browserconfig.xml"/>
      <meta name="theme-color" content="#ffffff"/>
      <title>Birsual</title>
      <meta name="og:title" context="Birsual" />
      {metaDescription(props.question)}
    </Head>,
    <Header />,
    <main className="main">
      {props.children}
    </main>
  ]
)

export default Layout
