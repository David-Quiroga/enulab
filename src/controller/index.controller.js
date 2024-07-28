const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql')
const indexCtl = {}

indexCtl.mandar = async (req, res) => {
    const { nombreRestaurante, ubicacion, tipoComida, objetivos, logo, descripcion } = req.body;

    // Log de los valores que se envían
    console.log('Datos recibidos:');
    console.log('Nombre del Restaurante:', nombreRestaurante);
    console.log('Ubicación:', ubicacion);
    console.log('Tipo de Comida:', tipoComida);
    console.log('Objetivos:', objetivos);
    console.log('Logo:', logo);
    console.log('Descripción:', descripcion);

    try {
        await sql.query('INSERT INTO restaurantes (nombreRestaurante, ubicacion, tipoComida, objetivos, logo, descripcion) VALUES (?, ?, ?, ?, ?, ?)', [nombreRestaurante, ubicacion, tipoComida, objetivos, logo, descripcion]);
        res.status(200).send('Restaurante creado con éxito');
    } catch (error) {
        console.error('Error al crear el restaurante:', error);
        res.status(500).send('Hubo un error al crear el restaurante');
    }
};



indexCtl.mostrar = async (req, res) => {
    try {
        const [restaurantes] = await sql.query('SELECT * FROM restaurantes');
        res.status(200).json(restaurantes);
    } catch (error) {
        console.error('Error al obtener los restaurantes:', error);
        res.status(500).send('Hubo un error al obtener los restaurantes');
    }
};

module.exports = indexCtl;