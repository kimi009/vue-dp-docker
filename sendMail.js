const nodeMailler = require('nodemailer')
let transporter = nodeMailler.createTransport({
  service: 'qq',
  port: 456, //SMTP 端口
  secureConnection: true, //使用ssl
  auth: {
    user: '444812002@qq.com',
    pass: '' //授权码
  }
})

function sendMail(message) {
  let mailOption = {
    from: '"444812002" <444812002@qq.com>',
    to: '444812002@qq.com',
    subject: '部署通知',
    html: message
  }
  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      return console.log(err)
    }
    console.log('message sent :%s', info.messageId)
  })
}

module.exports = sendMail
