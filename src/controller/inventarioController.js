const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql.js')
const inventarioCtl = {}

inventarioCtl.mandar = async (req,res) =>{
    const { nombreProductos, cantidad,  categoria, descripcion } = req.body;
    console.log('Datos recibidos')
    try {
        await sql.query('INSERT INTO inventarios (nombreProductos, cantidad,  categoria, descripcion ) VALUES (?,?,?,?)', [ nombreProductos, cantidad,  categoria, descripcion ]);
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

module.exports= inventarioCtl;