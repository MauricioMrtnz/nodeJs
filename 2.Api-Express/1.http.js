const htttp = require('node:http')
const fs = require('node:fs')
const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8 ')

  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h1>Pagina de inicio</h1>')
  } else if (req.url === '/saludo') {
    res.statusCode = 200
    res.end('<h1>Hola mundo</h1>')
  } else if (req.url === '/index') {
    fs.readFile('2.Api-Express/index.html', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>Internal Server Error</h1>')
      } else {
        res.statusCode = 200
        res.end(data)
      }
    })
  } else if (req.url === '/imagen') {
    fs.readFile('2.Api-Express/oso-panda.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>Internal Server Error</h1>')
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.end('<h1>Not Found</h1>')
  }
}

const server = htttp.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server running on port http://localhost:${desiredPort}`)
})
