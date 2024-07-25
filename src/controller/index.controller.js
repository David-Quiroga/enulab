const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql')
const indexCtl = {}

indexCtl.mandar = async (req, res) => {
    const { nombreRestaurante, ubicacion, objetivos, logo, descripcion, idUsuario } = req.body;

    try {
        await sql.query('INSERT INTO restaurantes (nombreRestaurante, ubicacion, objetivos, logo, descripcion, idUsuario) VALUES (?, ?, ?, ?, ?, ?)', [nombreRestaurante, ubicacion, objetivos, logo, descripcion, idUsuario]);        res.status(200).send('Restaurante creado con éxito');
    } catch (error) {
        console.error('Error al crear el restaurante:', error);
        res.status(500).send('Hubo un error al crear el restaurante');
    }
};

indexCtl.mostrar = async (req, res) => {
    const idRestaurante = req.params.id;

    try {
        const [listarestaurante] = await sql.query('SELECT * FROM restaurantes WHERE idRestaurante = ?', [idRestaurante]);
        res.status(200).json(listarestaurante);
    } catch (error) {
        console.error('Error al obtener el restaurante:', error);
        res.status(500).send('Hubo un error al obtener el restaurante');
    }
};

module.exports = indexCtl;