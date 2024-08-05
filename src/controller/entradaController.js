const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql.js')
const entradasCtl = {}

entradasCtl.mandar = async (req, res) => {
    const {nombre, descripcion, precio, porciones, subCategoria, estado} = req.body;
    console.log("Datos recibidos")
    try {
        await sql.query(
            'INSERT INTO entradas (nombre, descripcion, precio, porciones, subCategoria,  estado) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, porciones, subCategoria, estado]
        );
        res.status(200).send('Helado creado con exito');
    } catch (err) {
        console.error('Error al crear el helados', err)
        res.status(500).send('Hubo un error al crear el helados')
    }
}

entradasCtl.mostrar = async(req, res) => {
    try {
        const listahelados = await sql.query('SELECT * FROM entradas');
        res.status(200).json(listahelados)
    } catch (err) {
        console.error('Error al obtener el helados', err)
        res.status(500).send('Hubo un error al obtener el helados')
    }
}

entradasCtl.actualizar = async (req,res) => {
    const { idEntrada } = req.params;
    const { nombre, descripcion, precio, porciones, subCategoria, estado } = req.body;

    //Verificar que el id y los campos obligatorios están presentes
    if (!idEntrada || !nombre || !descripcion || !precio || !porciones || !subCategoria || !estado) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    try {
        const result = await sql.query('UPDATE entradas SET nombre = ?, descripcion = ?, precio = ?, porciones = ?, subCategoria = ?, estado = ? WHERE idEntrada = ?',
            [nombre, descripcion, precio, porciones, subCategoria, estado, idEntrada]);
        if (result.affectedRows > 0) {
            res.status(200).send('Helado actualizado con éxito');
        } else {
            res.status(404).send('Helado no encontrado');
        }
    } catch (error) {
        console.error("Error al actualizar el helado:", error);
        res.status(500).send("Hubo un error al actualizar el helado");
    }
}

entradasCtl.listar = async (req, res) => {
    const { idEntrada } = req.params;
    try {
        console.log("ID a buscar:", idEntrada);
        const rows = await sql.query("SELECT * FROM entradas WHERE idEntrada = ?", [idEntrada]);
        if (rows.length === 0) {
            console.log("Helado no encontrado.");
            return res.status(404).json({ message: 'Helado no encontrado' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error al obtener el helado:", error);
        res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
    }
};

module.exports = entradasCtl;