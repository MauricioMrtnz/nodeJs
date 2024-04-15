const express = require('express')
const crypto = require('node:crypto')
const moviesJson = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:8081',
  'https://myapp.com'
]

app.get('/movies', (req, res) => {
  const origin = req.headers.origin
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', '*')
  }

  const { genre } = req.query
  if (genre) {
    const filterMovies = moviesJson.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.json(filterMovies)
  }
  res.json(moviesJson)
})

app.get('/movies/:id', (req, res) => { // path-to-regexp
  const { id } = req.params
  const movie = moviesJson.find(movie => movie.id === id)
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  res.json(movie)
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ message: result.error.errors })
  }

  const newMovie = {
    id: crypto.randomUUID(), // UUID V4
    ...result.data
  }

  moviesJson.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(400).json({ message: result.error.errors })
  }

  const { id } = req.params

  const movieIndex = moviesJson.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updatedMovie = {
    ...moviesJson[movieIndex],
    ...result.data
  }

  moviesJson[movieIndex] = updatedMovie

  return res.json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params

  const movieIndex = moviesJson.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  moviesJson.splice(movieIndex, 1)

  res.status(204).send()
})

app.options('/movies/:id', (req, res) => {
  const origin = req.headers.origin

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'PATCH, OPTIONS', 'DELETE')
  }
  res.send(200)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
