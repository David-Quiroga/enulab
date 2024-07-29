const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql.js')
const restauranteCtl = {}

restauranteCtl.mandar = async (req, res) => {
    const { nombreRestaurante, ubicacion, tipoComida, objetivos, descripcion } = req.body;
    console.log('Datos recibidos')
    try {
        await sql.query(
            'INSERT INTO restaurantes (nombreRestaurante, ubicacion, tipoComida, objetivos, descripcion) VALUES (?, ?, ?, ?, ?)', 
            [nombreRestaurante, ubicacion, tipoComida, objetivos, descripcion]
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

module.exports = restauranteCtl;