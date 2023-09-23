const mysql = require('mysql2');
const { promisify } = require('util');
const {database} = require('./Keys');
const {CONSTANTS} = require('../utils/utils');

const pool = mysql.createPool(database);//se crea el pool de conexiones

//iniciando conexion con la base de datos
pool.getConnection((error, conexion) =>{
    //validar si la conexion tiene algun tipo de error
    if(error){
        //validando codigos de error mas comunes
        switch(error.code){
            case CONSTANTS.PROTOCOL_CONNECTIONS_LOST:
                //indica que la conexion con la base de datos esta perdida
                console.error('DATABASE CONNECTION WAS CLOSED');
                break;
                //indica que existen demasiadas conexiones
                case CONSTANTS.ER_CON_COUNT_ERROR:
                    console.error('DATABASE HAS TO MANY CONNECTIONS');
                    break;
                    //indica que la conexion fue rechazada
                    case CONSTANTS.ECONNREFUSED:
                        console.error('DATABASE CONNECTION WAS REFUSED');
                        break;
                        //indica que el acceso esta denegado
                        case CONSTANTS.ER_ACCESS_DENIED_ERROR:
                            console.error('ACCESS DENIED FOR USER');
                            break;
                            default:
                                console.error('Error de base de datos no encontrado');
                                break;
        }
    }

    //si la conexion es exitosa imprimir un mensaje indicandolo
    if(conexion){
        console.log('Conexion establecida con la base de datos');
        conexion.release();
    }
    return;
}
);
//Configurando PROMISY para permitir en cada consulta un async/await (promesas)
pool.query = promisify(pool.query);
module.exports = pool;