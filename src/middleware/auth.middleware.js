const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys'); // Importar la clave secreta desde keys.js

const authMiddleware = (req, res, next) => {
    try {
        // Obtener el token del encabezado "Authorization"
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(403).json({ error: "Token no proporcionado. Asegúrate de enviar el token en el encabezado 'Authorization'" });
        }

        const token = authHeader.split(' ')[1]; // Espera el formato "Bearer <token>"
        if (!token) {
            return res.status(403).json({ error: "Formato de encabezado Authorization incorrecto. Usa 'Bearer <token>'" });
        }

        // Verificar el token usando la clave secreta desde keys.js
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: "El token ha expirado. Por favor, inicia sesión nuevamente" });
                }
                if (err.name === 'JsonWebTokenError') {
                    return res.status(403).json({ error: "Token inválido. Verifica que tu token sea correcto" });
                }
                return res.status(403).json({ error: "Error al procesar el token" });
            }

            // Si el token es válido, agrega los datos decodificados a la solicitud
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("Error en el middleware de autenticación:", error);
        return res.status(500).json({ error: "Error interno en el servidor" });
    }
};

module.exports = authMiddleware;
