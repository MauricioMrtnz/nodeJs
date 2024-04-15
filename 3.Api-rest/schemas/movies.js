const z = require('zod')

const movieSchema = z.object({

  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  year: z.number().int().positive().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().positive().min(0).max(10).default(0),
  poster: z.string().url(),
  genre: z.array(z.enum(
    ['action', 'comedy', 'drama', 'horror', 'romance', 'sci-fi', 'thriller', 'crime']
  ))
})

function validateMovie (data) {
  return movieSchema.safeParse(data)
}

function validatePartialMovie (data) {
  return movieSchema.partial().safeParse(data)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
// Path: 3.Api-rest/schemas/movies.js
