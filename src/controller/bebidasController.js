const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql.js')
const bebidasCtl = {}

bebidasCtl.mandar = async (req, res) => {
    const {nombre, descripcion, precio, subCategoria, estado} = req.body;
    console.log("Datos recibidos")
    try {
        await sql.query(
            'INSERT INTO bebidas (nombre, descripcion, precio, subCategoria,  estado) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, subCategoria, estado]
        );
        res.status(200).send('Helado creado con exito');
    } catch (err) {
        console.error('Error al crear el helados', err)
        res.status(500).send('Hubo un error al crear el helados')
    }
}

bebidasCtl.mostrar = async(req, res) => {
    try {
        const listahelados = await sql.query('SELECT * FROM bebidas');
        res.status(200).json(listahelados)
    } catch (err) {
        console.error('Error al obtener el helados', err)
        res.status(500).send('Hubo un error al obtener el helados')
    }
}

bebidasCtl.actualizar = async (req, res) => {
    const { idBebida } = req.params;
    const { nombre, descripcion, precio, subCategoria, estado } = req.body;

    // Verificar que el id y los campos obligatorios están presentes
    if (!idBebida || !nombre || !descripcion || !precio || !subCategoria || !estado) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    try {
        // Realizar la consulta SQL para actualizar la bebida
        const result = await sql.query(
            'UPDATE bebidas SET nombre = ?, descripcion = ?, precio = ?, subCategoria = ?, estado = ? WHERE idBebida = ?',
            [nombre, descripcion, precio, subCategoria, estado, idBebida]
        );

        // Verificar si se actualizó alguna fila
        if (result.affectedRows > 0) {
            res.status(200).send('Bebida actualizada con éxito');
        } else {
            res.status(404).send('Bebida no encontrada');
        }
    } catch (error) {
        console.error("Error al actualizar la bebida:", error);
        res.status(500).send("Hubo un error al actualizar la bebida");
    }
};


bebidasCtl.listar = async (req, res) => {
    const { idBebida } = req.params;
    try {
        console.log("ID a buscar:", idBebida);

        // Realizar la consulta SQL
        const [rows] = await sql.query("SELECT * FROM bebidas WHERE idBebida = ?", [idBebida]);

        // Verificar si `rows` es un array y si contiene resultados
        if (rows.length === 0) {
            console.log("Bebida no encontrada.");
            return res.status(404).json({ message: 'Bebida no encontrada' });
        }
        // Devolver la bebida encontrada
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error al obtener la bebida:", error);
        res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
    }
};


module.exports = bebidasCtl;