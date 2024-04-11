const os = require('node:os')

console.log('Informacion del sistema operativo')
console.log('Nombre del sistema operativo: ', os.platform())
console.log('Version del sistema operativo: ', os.release())
console.log('CPUS: ', os.cpus().length)
console.log('Memoria total: ', os.totalmem() / 1024 / 1024  , 'bytes')
console.log('Memoria libre: ', os.freemem() / 1024 / 1024 , 'bytes')
console.log('uptime' , os.uptime() / 60 , 'minutos')
