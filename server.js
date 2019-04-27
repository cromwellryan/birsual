const express = require('express')
const next = require('next')
const enforceSSL = require('express-force-ssl');

const dev = process.env.NODE_ENV !== 'production'
const production = process.env.NODE_ENV === 'production';

const app = next({ dev })
const handle = app.getRequestHandler()


app
  .prepare()
  .then(() => {
    const server = express()

    if(production) {
      server.enable('trust proxy');
      server.set('forceSSLOptions', { trustXFPHeader: true });
      server.use(enforceSSL);
    }

    server.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = { id: req.params.id } 
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    const port = process.env.PORT || 3000;

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
