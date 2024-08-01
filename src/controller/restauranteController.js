const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql.js')
const restauranteCtl = {}

restauranteCtl.mandar = async (req, res) => {
    const { nombreRestaurante, ubicacion, tipoComida, objetivos, logo, descripcion } = req.body;
    console.log('Datos recibidos')
    try {
        await sql.query(
            'INSERT INTO restaurantes (nombreRestaurante, ubicacion, tipoComida, objetivos, logo, descripcion) VALUES (?, ?, ?, ?, ?, ?)', 
            [nombreRestaurante, ubicacion, tipoComida, objetivos, logo, descripcion]
        );
        res.status(200).send('Restaurante creado con éxito');
    } catch (error) {
        console.error('Error al crear el restaurante:', error);
        res.status(500).send('Hubo un error al crear el restaurante');
    }
};

restauranteCtl.mostrar = async (req, res) => {
    try {
        const listarestaurante = await sql.query('SELECT * FROM restaurantes');
        res.status(200).json(listarestaurante);
    } catch (error) {
        console.error('Error al obtener el restaurante:', error);
        res.status(500).send('Hubo un error al obtener el restaurante');
    }
};

restauranteCtl.actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombreRestaurante, ubicacion, tipoComida, objetivos, logo, descripcion } = req.body;

    // Verificar que el id y los campos obligatorios están presentes
    if (!id || !nombreRestaurante || !ubicacion || !tipoComida || !descripcion) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    try {
        const result = await sql.query(
            'UPDATE restaurantes SET nombreRestaurante = ?, ubicacion = ?, tipoComida = ?, objetivos = ?, logo = ?, descripcion = ? WHERE id = ?',
            [nombreRestaurante, ubicacion, tipoComida, objetivos, descripcion, id]
        );

        if (result.affectedRows > 0) {
            res.status(200).send('Restaurante actualizado con éxito');
        } else {
            res.status(404).send('Restaurante no encontrado');
        }
    } catch (error) {
        console.error("Error al actualizar el restaurante:", error);
        res.status(500).send("Hubo un error al actualizar el restaurante");
    }
};

restauranteCtl.listar = async(req, res) => {
    const { id } = req.params
    try {
        console.log("ID a buscar:", id);
        const rows = await sql.query(
          "SELECT * FROM restaurantes WHERE id = ?",
            [id]
        );
    
        if (rows.length === 0) {
            console.log("Restaurante no encontrado.");
            return res.status(404).json({ message: 'Restaurante no encontrado' });
        }
        res.status(200).json(rows[0]);
        } catch (error) {
        console.error("Error al obtener el restaurante:", error);
        res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
    }
}

module.exports = restauranteCtl;