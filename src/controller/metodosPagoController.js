const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql.js');
const mPagos = require('../models/metodosPagosModel.js');
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

metodosCtl.actualizar = async (req, res) => {
    const { id } = req.params;
    const{ nombre, estado } = req.body

    if(!id || !nombre || !estado){
        return res.status(400).send('Faltan campos obligatorios');
    }

    try {
        const result = await sql.query('UPDATE mpagos SET nombre = ?, estado = ? WHERE idMPagos = ?', 
            [nombre, estado, id])
        if (result.affectedRows > 0) {
            res.status(200).send('Helado actualizado con éxito');
        } else {
            res.status(404).send('Helado no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar el metodo', error)
        res.status(500).send("Hubo un error al actualizar el helado");
    }
};


metodosCtl.listar = async (req, res) => {
    const { id } = req.params
    try {
        console.log('ID a buscar', id)
        const rows = await sql.query('SELECT * FROM mpagos WHERE idMPagos = ?', [id])
        if (rows.length === 0) {
            console.log('Metodo no encontrado')
            return res.status(404).json({message: 'Metodo no encontrado'})
        }
        res.status(200).json(rows[0])
    } catch (error) {
        console.error('Error al obtener el inventario', error)
        res.status(500).json({message: 'Error interno del servidor' + message.error})
    }
}
module.exports = metodosCtl; 