const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../keys");

let sequelize;

// Usar URI de conexión si está disponible
if (MYSQL_URI) {
    sequelize = new Sequelize(MYSQL_URI);
} else {
    // Configuración para parámetros individuales
    sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 2,
            acquire: 30000,
            idle: 10000
        }
    });
}

// Autenticar y sincronizar
sequelize.authenticate()
    .then(() => {
        console.log("Conexión establecida con la base de datos");
    })
    .catch((err) => {
        console.error("No se pudo conectar a la base de datos:", err.message);
    });

sequelize.sync({ force: false })
    .then(() => {
        console.log("Tablas sincronizadas");
    })
    .catch((err) => {
        console.error("Error al sincronizar las tablas:", err.message);
    });

//extracionModelos
const userModel = require('../models/userModel');
const restauranteModel = require('../models/restauranteModel')
const empleadosModel = require('../models/empleadosModel')
const horariosModel = require('../models/horarioModel')
//zincronia tablas
const user = userModel(sequelize, Sequelize)
const restaurante = restauranteModel(sequelize, Sequelize)
const empleados = empleadosModel(sequelize, Sequelize)
const horarios = horariosModel(sequelize, Sequelize)
//relaciones

user.hasMany(restaurante, {foreignKey: "idUsuario"});
restaurante.belongsTo(user, {foreignKey: "idUsuario"})

restaurante.hasMany(empleados, {foreignKey: "idRestaurante"})
empleados.belongsTo(restaurante, {foreignKey: "idRestaurante"})

restaurante.hasMany(horarios,{foreignKey: "idRestaurante"})
horarios.belongsTo(restaurante, {foreignKey: "idRestaurante"})











sequelize.sync({ alter: true }) // alter will update the database schema to match the model
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });

// Exportar el objeto sequelize
module.exports = {
    
};