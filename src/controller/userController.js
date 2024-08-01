const sql = require('../Database/dataBase.sql');
const bcrypt = require('bcrypt');

const usuarioController = {};

// Función para hashear datos
const hashData = async (data) => {
    const saltRounds = 8;
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
}

// Crear usuario
usuarioController.crear = async (req, res) => {
    const { nombreCompleto, correoElectronico, password, rucUser, numeroContacto } = req.body;
    try {
        const hashedNombreCompleto = await hashData(nombreCompleto);
        const hashedCorreoElectronico = await hashData(correoElectronico);
        const hashedPassword = await hashData(password);
        const hashedRucUser = await hashData(rucUser);
        const hashedNumeroContacto = await hashData(numeroContacto);

        await sql.query(
            "INSERT INTO users (nombreCompleto, correoElectronico, password, rucUser, numeroContacto) VALUES (?, ?, ?, ?, ?)",
            [hashedNombreCompleto, hashedCorreoElectronico, hashedPassword, hashedRucUser, hashedNumeroContacto]
        );
        res.status(200).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        console.error('Error al crear el usuario', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

// Iniciar sesión
usuarioController.login = async (req, res) => {
    const { correoElectronico, password } = req.body;
    try {
        const users = await sql.query('SELECT * FROM users');

        // Buscar y comparar los datos hasheados
        let user = null;
        for (const u of users) {
            const isMatch = await bcrypt.compare(correoElectronico, u.correoElectronico);
            if (isMatch) {
                user = u;
                break;
            }
        }

        if (!user) {
            return res.status(400).json({ error: 'Credenciales incorrectas' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Credenciales incorrectas' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error en la autenticación', error);
        res.status(500).json({ error: 'Error en la autenticación' });
    }
}

module.exports = usuarioController;
