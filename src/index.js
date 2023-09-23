const express =require('express');

//inizializaciones
const app = express();

require('dotenv').config()

//Ajustes del servidor
app.set('port', process.env.PORT || 4500);

//Configuracion de rutas
app.use(require('./routes'));//node automaticamente busca el index.js del modulo

//Iniciar el servidor

app.listen(app.get('port'),()=> {
    console.log('servidor iniciando en el puerto:', app.get('port'));
});