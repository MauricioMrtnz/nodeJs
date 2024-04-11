
const fs = require('node:fs') // node: is required for node modules node 16.0.0

//Leer achivos de manera asincrona de arriba hacia abajo
console.log('Leyendo el primer archivo')
const firstText = fs.readFileSync('./archivo.txt', 'utf-8') // utf-8 is the encoding
console.log(firstText)

console.log('---> Hacer cosas <---')

console.log('Leyendo el Segundo archivo')
const secondtText = fs.readFileSync('./archivo2.txt', 'utf-8') // utf-8 is the encoding
console.log(secondtText)

//Leer achivos de manera sincrona cuando se necesite
console.log('Leyendo el primer archivo')
fs.readFile('./archivo.txt', 'utf-8' , (err, text) => {
    console.log(text)
}) 
console.log('---> Hacer cosas <---') // Se ejecuta antes de que se lea el archivo

console.log('Leyendo el Segundo archivo')
fs.readFile('./archivo2.txt', 'utf-8' , (err, text) => {
    console.log(text)
}) 



