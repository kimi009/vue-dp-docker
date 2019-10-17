let http = require('http')
let crypto = require('crypto')
const secret = '666666'
const sign = body => {
  return `sha1=${crypto
    .createHmac('sha1', secret)
    .update(body)
    .digest('hex')}`
}

let server = http.createServer((req, res) => {
  if (req.method == 'POST' && req.url == '/webhook') {
    let buffers = []
    req.on('data', buffer => {
      buffers.push(buffer)
    })
    req.on('end', buffer => {
      let body = Buffer.concat(buffers)
      //github传入的body要验证这个签名是否正确
      let event = req.headers['x-gitHub-event'] //github传入的事件的类型
      let signature = req.headers['x-hub-signature'] //签名
      if (signature !== sign(body)) {
        return res.end('not allowed')
      } else {
      }
    })
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: true }))
  } else {
    res.end('not found')
  }
})

server.listen(3010, () => {
  console.log('webhook 启动3010')
})
