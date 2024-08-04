const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql.js')
const sopasCtl = {}

sopasCtl.mandar = async (req, res) => {
    const {nombre, descripcion, precio, estado} = req.body;
    console.log("Datos recibidos")
    try {
        await sql.query(
            'INSERT INTO sopas (nombre, descripcion, precio, estado) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, precio, estado]
        );
        res.status(200).send('Sopa creada con exito');
    } catch (err) {
        console.error('Error al crear la sopa', err)
        res.status(500).send('Hubo un error al crear la sopa')
    }
}

sopasCtl.mostrar = async(req, res) => {
    try {
        const listasopas = await sql.query('SELECT * FROM sopas');
        res.status(200).json(listasopas)
    } catch (err) {
        console.error('Error al obtener la sopa', err)
        res.status(500).send('Hubo un error al obtener la sopa')
    } 
}

sopasCtl.actualizar = async (req,res) => {
    const { idSopa } = req.params;
    const {nombre, descripcion, precio, estado} = req.body;

    //Verificar que el id y los campos obligatorios están presentes
    if (!idSopa || !nombre || !descripcion || !precio || !estado) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    try {
        const result = await sql.query('UPDATE sopas SET nombre = ?, descripcion = ?, precio = ?, estado = ? WHERE idSopa= ?',
            [nombre, descripcion, precio, estado, idSopa]);
        if (result.affectedRows > 0) {
            res.status(200).send('Sopa actualizada con éxito');
        } else {
            res.status(404).send('Sopa no encontrada');
        }
    } catch (error) {
        console.error("Error al actualizar la sopa:", error);
        res.status(500).send("Hubo un error al actualizar la sopa");
    }
}

sopasCtl.listar = async (req, res) => {
    const { idSopa } = req.params;
    try {
        console.log("ID a buscar:", idSopa);
        const rows = await sql.query("SELECT * FROM sopas WHERE idSopa = ?", [idSopa]);
        if (rows.length === 0) {
            console.log("Sopa no encontrada.");
            return res.status(404).json({ message: 'Sopa no encontrada' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error al obtener la sopa:", error);
        res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
    }
};

module.exports = sopasCtl;