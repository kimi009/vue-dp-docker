let http = require('http')
let crypto = require('crypto')
let { spawn } = require('child_process')
let sendMail = require('./sendMail')
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
      }
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: true }))
      if (event == 'push') {
        let payload = JSON.parse(body)
        //根据仓库的名字找到对应的shell脚本
        //为了不阻塞开启子进程
        let child = spawn('sh', [`/${payload.repository.name}.sh`])
        let buffers = []
        child.stdout.on('data', buffer => {
          buffers.push(buffer)
        })
        child.stdout.on('end', buffer => {
          let log = Buffer.concat(buffers).toString()
          // sendMail(`
          
          // `)
        })
      }
    })
  } else {
    res.end('not found')
  }
})

server.listen(3010, () => {
  console.log('webhook 启动3010')
})
