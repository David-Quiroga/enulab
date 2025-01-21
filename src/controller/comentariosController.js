const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql.js')

const comentatiosCtl = {}

comentatiosCtl.mandar = async (req, res) => {
    const {estrellas, comentario, fechaValoracion} = req.body
    console.log("Datos recibidos")
    try {
        await sql.query(
            'INSERT INTO valoracions (estrellas, comentario, fechaValoracion) VALUES (?, ?, ?)',
            [estrellas, comentario, fechaValoracion]
        )
        res.status(200).send('Comentario guardado')
    } catch (err) {
        console.error('Error', err)
        res.status(500).send('Hubo un error')
    }
}

comentatiosCtl.mostrar = async(req, res) => {
    try {
        const listaComentario = await sql.query('SELECT * FROM valoracions');
        res.status(200).json(listaComentario)
    } catch (error) {
        console.error('Error al obtener el comentario', error)
        res.status(500).send('Hubo un error al obtener el comentario')
    }
}

comentatiosCtl.listar = async(req, res) => {
    const { idValoracion} = req.params;
    try {
        console.log("ID a buscar:", idValoracion)
        const rows = await sql.query("SELECT * FROM valoracions WHERE idValoracion = ?", [idValoracion])
        if(rows.length === 0){
            console.log("comentario no encontrado")
            return res.status(404).json({message: 'Comentario no encontrado'})
        }
        res.status(200).json(rows[0]);
    } catch (error){
        console.error("Error al obtener el comentario", error)
        res.status(500).json({ message: 'Error interno del servidor: ' + error.message });

    }
}
module.exports = comentatiosCtl;