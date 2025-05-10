const express = require('express')
const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')

const viewPath =  path.resolve(__dirname, './../templates/views/')
const partialsPath = path.resolve(__dirname, './../templates/partials')

const sendMail = async ({to, template, url, name}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  })

  transporter.use('compile', hbs({
    viewEngine: {
      //extension name
      extName: '.handlebars',
      // layout path declare
      layoutsDir: viewPath,
      defaultLayout: false,
      //partials directory path
      partialsDir: partialsPath,
      express
    },
    //View path declare
    viewPath: viewPath,
    extName: '.handlebars',
  }))

  let subject = ''
  switch(template) {
    case 'register':
      subject = 'Verificar endereço de e-mail'
      break;
  }

  const mailOptions = {
    from: `"Encurtaki" <${process.env.MAIL_USERNAME}>`,
    to,
    subject,
    template,
    context: {
      name, // use {{name}}
      url // use {{url}}
    },
  //   attachments: [
  //     { filename: 'abc.png', path: path.resolve(__dirname, './../public/images/web_server.png')}
  //  ]
  }

  const info = await transporter.sendMail(mailOptions)
  // console.log("Message sent id: %s", info.messageId)
  // console.log("Message sent response: %s", info.response)
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}

module.exports = sendMail