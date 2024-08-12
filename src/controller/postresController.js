const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql.js')
const postresCtl = {}

postresCtl.mandar = async (req, res) => {
    const {nombre, descripcion, precio, subCategoria, estado} = req.body;
    console.log("Datos recibidos")
    try {
        await sql.query(
            'INSERT INTO postres (nombre, descripcion, precio, subCategoria, estado) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, subCategoria, estado]
        );
        res.status(200).send('Helado creado con exito');
    } catch (err) {
        console.error('Error al crear el helados', err)
        res.status(500).send('Hubo un error al crear el helados')
    }
}

postresCtl.mostrar = async(req, res) => {
    try {
        const listaPostre = await sql.query('SELECT * FROM postres');
        res.status(200).json(listaPostre);
    } catch (err) {
        console.error('Error al obtener los helados', err);
        res.status(500).send('Hubo un error al obtener los helados');
    }
}


postresCtl.actualizar = async (req,res) => {
    const { idPostres } = req.params;
    const { nombre, descripcion, precio, subCategoria, estado } = req.body;

    //Verificar que el id y los campos obligatorios están presentes
    if (!idPostres || !nombre || !descripcion || !precio || !subCategoria || !estado) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    try {
        const result = await sql.query('UPDATE postres SET nombre = ?, descripcion = ?, precio = ?, subCategoria = ?, estado = ? WHERE idPostres = ?',
            [nombre, descripcion, precio, subCategoria, estado, idPostres]);
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

postresCtl.listar = async (req, res) => {
    const { idPostres } = req.params;
    try {
        console.log("ID a buscar:", idPostres);
        const rows = await sql.query('SELECT * FROM postres WHERE idPostres = ?', [idPostres]);
        if (rows.length === 0) {
            console.log("Helado no encontrado.");
            return res.status(404).json({ message: 'Helado no encontrado' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el helado:', error);
        res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
    }
};


module.exports = postresCtl;