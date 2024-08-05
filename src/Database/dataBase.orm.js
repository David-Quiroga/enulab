const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI, } = require("../keys");

const sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
	host: MYSQLHOST,
	port: MYSQLPORT,
	dialect: 'mysql'
});

sequelize.authenticate()
	.then(() => {
		console.log("conectado");
	})
	.catch((err) => {
		console.log("no se conecto");
	});

sequelize.sync({ force: false })
	.then(() => {
		console.log("tablas sincronizadas");
	});

//extracionModelos
const userModel = require('../models/userModel');
const restauranteModel = require('../models/restauranteModel')
const empleadosModel = require('../models/empleadosModel')
//const horariosModel = require('../models/horarioModel')
const bebidasModel = require('../models/bebidasModel')
const facturaModel = require('../models/facturaModel')
const inventarioModel = require('../models/inventarioModel')
const mPagosModel = require('../models/metodosPagosModel')
const platosModel = require('../models/platosModel')
const postresModel = require('../models/postresModel')
const proveedoresModel = require('../models/proveedoresModel')
const sopasModel = require('../models/sopasModel')
const heladosModel = require('../models/heladosModel')
const entradaModel = require('../models/entradasModel')
//zincronia tablas
const user = userModel(sequelize, Sequelize)
const restaurante = restauranteModel(sequelize, Sequelize)
const empleados = empleadosModel(sequelize, Sequelize)
//const horarios = horariosModel(sequelize, Sequelize)
const bebidas = bebidasModel(sequelize, Sequelize)
const factura = facturaModel(sequelize, Sequelize)
const inventario = inventarioModel(sequelize, Sequelize)
const mPagos = mPagosModel(sequelize, Sequelize)
const platos = platosModel(sequelize, Sequelize)
const postres = postresModel(sequelize, Sequelize)
const proveedores = proveedoresModel(sequelize, Sequelize)
const sopas = sopasModel(sequelize, Sequelize)
const helado = heladosModel(sequelize, Sequelize)
const entradas = entradaModel(sequelize, Sequelize)
//relaciones

user.hasMany(restaurante, {foreignKey: "idUsuario"});
restaurante.belongsTo(user, {foreignKey: "idUsuario"})

restaurante.hasMany(empleados, {foreignKey: "idRestaurante"})
empleados.belongsTo(restaurante, {foreignKey: "idRestaurante"})

// Restaurante y Bebidas
restaurante.hasMany(bebidas, {foreignKey: "idRestaurante"});
bebidas.belongsTo(restaurante, {foreignKey: "idRestaurante"});

// Restaurante y Platos
restaurante.hasMany(platos, {foreignKey: "idRestaurante"});
platos.belongsTo(restaurante, {foreignKey: "idRestaurante"});

// Restaurante y Postres
restaurante.hasMany(postres, {foreignKey: "idRestaurante"});
postres.belongsTo(restaurante, {foreignKey: "idRestaurante"});

// Definición de relaciones
restaurante.hasMany(sopas, { foreignKey: 'idRestaurante' });
sopas.belongsTo(restaurante, { foreignKey: 'idRestaurante' });

restaurante.hasMany(helado, { foreignKey: 'idRestaurante' });
helado.belongsTo(restaurante, { foreignKey: 'idRestaurante' });

restaurante.hasMany(entradas, { foreignKey: 'idRestaurante' });
entradas.belongsTo(restaurante, { foreignKey: 'idRestaurante' });
// Restaurante y Factura
restaurante.hasMany(factura, {foreignKey: "idRestaurante"});
factura.belongsTo(restaurante, {foreignKey: "idRestaurante"});


factura.belongsToMany(mPagos, { through: 'FacturaMetodosPagos', foreignKey: 'idFactura' });
mPagos.belongsToMany(factura, { through: 'FacturaMetodosPagos', foreignKey: 'idMetodoPago' });


restaurante.hasMany(proveedores, {foreignKey: "idRestaurante"});
proveedores.belongsTo(restaurante, {foreignKey: "idRestaurante"});


restaurante.hasMany(inventario, {foreignKey: "idRestaurante"});
inventario.belongsTo(restaurante, {foreignKey: "idRestaurante"});

sequelize.sync({ alter: true }) // alter will update the database schema to match the model
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });

// Exportar el objeto sequelize
module.exports = {
    bebidas,
	empleados,
	factura,
	inventario,
	mPagos,
	platos,
	postres,
	proveedores,
	restaurante,
	user
};