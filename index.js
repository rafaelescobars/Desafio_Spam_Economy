const enviar = require('./mailer')
const url = require('url')
const http = require('http')
const axios = require('axios')
const fs = require('fs')


http.createServer((req, res) => {

    if (req.url == '/') {
      res.setHeader('content-type', 'text/html')
      fs.readFile('index.html', 'utf8', (err, data) => {
        res.write(data)
        res.end()
      })
    }

    if (req.url.startsWith('/mailing')) {

      let {
        correos,
        asunto,
        contenido
      } = url.parse(req.url, true).query

      enviar(correos, asunto, contenido)
        .then(data => {
          res.write('Correos enviados con éxito.')
          res.end()
        })
        .catch(err => {
          res.write(`Algo salió mal. Correos no enviados.`, () => {
            res.end()
          })
        })
    }
  })
  .listen(3000, () => console.log('Escuchando el puerto 3000'))