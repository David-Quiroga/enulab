const orm = require('../Database/dataBase.orm.js');
const sql = require('../Database/dataBase.sql.js')

const proveedoresCtl = {};

// Método para crear un nuevo proveedor
proveedoresCtl.mandar = async (req, res) => {
    const { nombreProveedor, numContacto, emailContacto, direccion, ciudad, estado, tipoProducto } = req.body;
    console.log('Datos recibidos')
    try {
        await sql.query(
            'INSERT INTO proveedores (nombreProveedor, numContacto, emailContacto, direccion, ciudad, tipoProducto, estado) VALUES ( ?, ?, ? ,? ,? ,? ,? )',
            [nombreProveedor, numContacto, emailContacto, direccion, ciudad, estado, tipoProducto]
        )
        res.status(200).send('Proveedor creado con éxito');
    } catch (error) {
        console.error('Error al crear el proveedor:', error);
        res.status(500).send('Hubo un error al crear el proveedor');
    }
};

// Método para mostrar todos los proveedores
proveedoresCtl.mostrar = async(req, res) => {
    try {
        const listaProveedores = await sql.query('SELECT * FROM proveedores')
        res.status(200).json(listaProveedores)
    } catch (error) {
        console.error('Error al obtener los datos', error)
        res.status(500).send('Hubo un error al obtener el restaurante')
    }
}

// Método para actualizar un proveedor
proveedoresCtl.actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombreProveedor, numContacto, emailContacto, direccion, ciudad, estado, tipoProducto } = req.body;
    try {
        const resultado = await orm.proveedores.update({
            nombreProveedor,
            numContacto,
            emailContacto,
            direccion,
            ciudad,
            estado,
            tipoProducto
        }, {
            where: {
                idProveedores: id
            }
        });
        if (resultado[0]) {
            res.status(200).send('Proveedor actualizado con éxito');
        } else {
            res.status(404).send('Proveedor no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar el proveedor:', error);
        res.status(500).send('Hubo un error al actualizar el proveedor');
    }
};

// Actualiza la función listar
proveedoresCtl.listar = async (req, res) => {
    const { id } = req.params; // Usa 'id' en lugar de 'idProveedores'
    try {
        console.log('ID a buscar:', id);
        const rows = await sql.query('SELECT * FROM proveedores WHERE idProveedores = ?', [id]);
        
        if (rows.length === 0) {
            console.log('Proveedor no encontrado');
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el proveedor', error);
        res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
    }
};

// Actualiza la función actualizar
proveedoresCtl.actualizar = async (req, res) => {
    const { id } = req.params; // Usa 'id' en lugar de 'idProveedores'
    const { nombreProveedor, numContacto, emailContacto, direccion, ciudad, estado, tipoProducto } = req.body;
        
    if(!id || !nombreProveedor || !numContacto || !emailContacto || !direccion || !ciudad || !estado || !tipoProducto){
        return res.status(400).send('Faltan campos obligatorios');
    }
    try {
        const result = await sql.query(
            'UPDATE proveedores SET nombreProveedor = ?, numContacto = ?, emailContacto = ?, direccion = ?, ciudad = ?, estado = ?, tipoProducto = ? WHERE idProveedores = ?',
            [nombreProveedor, numContacto, emailContacto, direccion, ciudad, estado, tipoProducto, id] // Incluye 'id' al final
        );
        if(result.affectedRows > 0) {
            res.status(200).send('Proveedor actualizado con éxito');
        } else {
            res.status(404).send('Proveedor no encontrado');
        }
    } catch (err) {
        console.error('Error al actualizar el proveedor', err);
        res.status(500).send('Hubo un error al actualizar el proveedor');
    }
};

module.exports = proveedoresCtl;
