const http = require('node:http')
const dittoJSSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.writeHead(200, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify(dittoJSSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html: utf-8')
          return res.end('<h1>404 Not Found</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon':
          let body = ''
          req.on('data', (chunk) => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            data.timestamp = new Date().toISOString()
            return res.end(JSON.stringify(data))
          })
          break
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html: utf-8')
          return res.end('<h1>404 Not Found</h1>')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log('Server running on port http://localhost:1234')
})
