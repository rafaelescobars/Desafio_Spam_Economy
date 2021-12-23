const fs = require('fs');
const axios = require('axios');
const nodemailer = require('nodemailer');
const {
  v4: uuidv4
} = require('uuid')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: 'adl2022test@gmail.com',
    pass: '1234Aa@.'
  },
  tls: {
    rejectUnauthorized: false
  }
})

const enviar = async (to, subject, html) => {

  return new Promise((resolve, reject) => {

    axios.get('https://mindicador.cl/api').then(res => {
      // console.log(res.data.dolar.valor);

      const data = res.data

      const dolar = data.dolar.valor
      const euro = data.euro.valor
      const uf = data.uf.valor
      const utm = data.utm.valor

      const template =
        `<p>El valor del dólar el día de hoy es: ${dolar}</p>
        <p>El valor del euro el día de hoy es: ${euro}</p>
        <p>El valor de la uf el día de hoy es: ${uf}</p>
        <p>El valor de la utm el día de hoy es: ${utm}<p>`


      let mailOptions = {
        from: 'adl2022test@gmail.com',
        to,
        subject,
        html: `${html}\n${template}`
      }

      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          reject(err)
        } else {

          fs.writeFile(`correos/${uuidv4().slice(-6)}`, template, 'utf8', (err, data) => {})

          resolve()
        }
      })
    })
  })
}

module.exports = enviar