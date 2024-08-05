const { error } = require('winston');
const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql.js')
const inventarioCtl = {}

inventarioCtl.mandar = async (req,res) =>{
    const { nombreProductos, cantidad,  categoria, descripcion, estado } = req.body;
    console.log('Datos recibidos')
    try {
        await sql.query('INSERT INTO inventarios (nombreProductos, cantidad,  categoria, descripcion, estado ) VALUES (?, ?,?,?,?)', 
            [ nombreProductos, cantidad,  categoria, descripcion, estado ]);
        res.status(200).send('Item creado con exito');
    } catch (error) {
        console.error('Error al crear el restaurante:', error);
        res.status(500).send('Hubo un error al crear el item');
    }
};

inventarioCtl.mostrar = async (req,res) =>{
    try {
        const listaInventario = await sql.query('SELECT * FROM inventarios');
        res.status(200).json(listaInventario);
    } catch (error) {
        console.error('Error al obtener el Inventraio:', error);
        res.status(500).send('Hubo un error al obtener el inventario');
    }
};

inventarioCtl.actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombreProductos, cantidad, categoria, descripcion, estado } = req.body;
    
    if (!id || !nombreProductos || !cantidad || !categoria || !descripcion || !estado) {
        return res.status(400).send('Faltan campos obligatorios');
    }
    try {
        const result = await sql.query('UPDATE inventarios SET nombreProductos = ?, cantidad = ?, categoria = ?, descripcion = ?, estado = ? WHERE idInventario = ?',
            [nombreProductos, cantidad, categoria, descripcion, estado, id]);
        if (result.affectedRows > 0) {
            res.status(200).send('Inventario actualizado');
        } else {
            res.status(404).send('Inventario no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar', error);
        res.status(500).send('Hubo un error al actualizar el inventario');
    }
};

inventarioCtl.listar = async(req, res) => {
    const { id } = req.params
    try {
        console.log('ID a buscar', id)
        const rows = await sql.query('SELECT * FROM inventarios WHERE idInventario = ?', [id])
        if(rows.length === 0){
            console.log('Inventario no encontrado')
            return res.status(404).json({message: 'Inventario no encontrado;' + error.message})
        }
        res.status(200).json(rows[0])
    } catch (error) {
        console.error('Error al obtener el inventario', error)
        res.status(500).json({message: 'Error interno del servidor' + error.message})
    }
}
module.exports= inventarioCtl;