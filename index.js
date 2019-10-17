let http = require('http')
let server = http.createServer((req,res)=>{
  if(req.method == 'POST' && req.url == '/webhook'){
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify({ok:true}))
  }else{
    res.end('not found')
  }
})

server.listen(3010,()=>{
  console.log('webhook 启动3010')
})
