const express = require('express')
const app = express()
const dittoJSSON = require('./pokemon/ditto.json')

const PORT = process.env.PORT || 1234

app.disable('x-powered-by')

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // Solo llegan las peticiones POST con Content-Type: application/json

  let body = ''
  req.on('data', (chunk) => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = new Date().toISOString()
    // Mutar la request y meter la información en el body
    res.body = data
    next()
  })
})

app.post('/pokemon', (req, res) => {
  res.status(200).json(res.body)
})
app.get('/', (req, res) => {
//   res.status(200).send('<h1>Express</h1>')
  res.status(200).json(JSON.stringify(dittoJSSON))
})

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
