const fs = require('node:fs') // node: is required for node modules node 16.0.0

const stats = fs.statSync('./archivo.txt')

console.log(
    stats.isFile(), // Si es un archivo
    stats.isDirectory(), // Si es un directorio
    stats.isSymbolicLink(), // Si es un enlace simbólico
    stats.size, // Tamaño en bytes
)