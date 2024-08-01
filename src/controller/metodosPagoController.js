const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql.js')
const metodosCtl = {}

metodosCtl.mandar = async (req,res) => {
    const { nombre, estado } = req.body;
    console.log('Datos recibidos')
    try {
        await sql.query('INSERT INTO mpagos (nombre, estado) VALUES (?,?)', [ nombre, estado]);
        res.status(200).send('Metodo de pago creado con exito');
    } catch (error) {
        console.log('Error al crear el metodo de pago', error);
        res.status(500).send('Hubo un error al crear el metodo de pago')
    }
};

metodosCtl.mostrar = async (req,res) => {
    try {
        const listaMetodos = await sql.query('SELECT * FROM mpagos');
        res.status(200).json(listaMetodos)
    } catch (error) {
        console.error('Error al obtener el metodo de pago:', error);
        res.status(500).send('Hubo un error al obtener el metodo de pago');
    }
};

module.exports = metodosCtl;