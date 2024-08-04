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
        res.status(200).send('Empleado creado con exito');
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

employeeCtl.actualizar = async (req,res) => {
    const { idEmpleado } = req.params;
    const {nombreCompleto, cedula, edadEmpleado, genero, sueldo, numeroContacto} = req.body;

    //Verificar que el id y los campos obligatorios están presentes
    if (!idEmpleado || !nombreCompleto || !cedula || !edadEmpleado || !sueldo || !numeroContacto) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    try {
        const result = await sql.query('UPDATE empleados SET nombreCompleto = ?, cedula = ?, edadEmpleado = ?, genero = ?, sueldo = ? , numeroContacto = ? WHERE idEmpleado = ?',
            [nombreCompleto, cedula, edadEmpleado, genero, sueldo, numeroContacto, idEmpleado]);
        if (result.affectedRows > 0) {
            res.status(200).send('Empleado actualizado con éxito');
        } else {
            res.status(404).send('Empleado no encontrado');
        }
    } catch (error) {
        console.error("Error al actualizar el empleado:", error);
        res.status(500).send("Hubo un error al actualizar el empleado");
    }
}

employeeCtl.listar = async (req, res) => {
    const { idEmpleado } = req.params;
    try {
        console.log("ID a buscar:", idEmpleado);
        const rows = await sql.query("SELECT * FROM empleados WHERE idEmpleado = ?", [idEmpleado]);
        if (rows.length === 0) {
            console.log("Empleado no encontrado.");
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error al obtener el empleado:", error);
        res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
    }
};

module.exports = employeeCtl;