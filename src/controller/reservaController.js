const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql.js')

const reservaCtl = {}

reservaCtl.mandar = async (req, res) =>{
    const {name, date, time, people, notes} = req.body;
    console.log("datos recibidos")
    try {
        await sql.query(
            'INSERT INTO reservas (name, date, time, people, notes) VALUES (?, ?, ?, ?, ?)',
            [name, date, time, people, notes]
        )
        res.status(200).send('Reserva guardada')
    } catch (error) {
        console.error('Error', error)
        res.status(500).send('Hubo un error')
    }
}

reservaCtl.mostrar = async(req, res) => {
    try {
        const listaRserva = await sql.query('SELECT * FROM reservas')
        res.status(200).json(listaRserva)
    } catch (error) {
        console.error('Error al obtener la reserva', error)
        res.status(500).send('Hubo un error al obtener el resultado')
    }
}

reservaCtl.listar = async(req, res) =>{
    const {idReserva} = req.params;
    try {
        console.log("ID a buscar", idReserva)
        const rows = await sql.query("SELECT * FROM reservas WHERE idReserva = ?", [idReserva])
        if(rows.length === 0){
            console.log("reserva no encontrada")
            return res.status(404).json({message: 'Rserva no encontrado'})
        }
    } catch (error) {
        console.error("Error al obtener el comentario", error)
        res.status(500).json({ message: 'Error interno del servidor: ' + error.message });    }
}

module.exports = reservaCtl