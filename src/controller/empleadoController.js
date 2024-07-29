const orm = require('../Database/dataBase.orm.js')
const sql = require('../Database/dataBase.sql.js')
const employeeCtl = {}

employeeCtl.mandar = async (req, res) => {
    const {nombreCompleto, cedula, edadEmpleado, genero, sueldo, numeroContacto} = req.body;
    console.log("Datos recibidos")
    try {
        await sql.query(
            'INSERT INTO empleados (nombreCompleto, cedula, edadEmpleado, genero, sueldo, numeroContacto) VALUES (?, ?, ?, ?, ?, ? )',
            [nombreCompleto, cedula, edadEmpleado, genero, sueldo, numeroContacto]
        );
        res.status(200).send('Empleado con exito');
    } catch (err) {
        console.error('Error al crear el restaurante', err)
        res.status(500).send('Hubo un error al crear el empleado')
    }
}

employeeCtl.mostrar = async(req, res) => {
    try {
        const listaEmployee = await sql.query('SELECT * FROM empleados');
        res.status(200).json(listaEmployee)
    } catch (err) {
        console.error('Error al obtener el empleado', err)
        res.status(500).send('Hubo un error al obtener el empleado')
    }
}
module.exports = employeeCtl;