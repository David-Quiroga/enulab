const MYSQLHOST = process.env.MYSQLHOST || 'localhost'
const MYSQLUSER = process.env.MYSQLUSER || 'root'
const MYSQLPASSWORD = process.env.MYSQLPASSWORD || ''
const MYSQLDATABASE = process.env.MYSQLDATABASE || 'digital'
const MYSQLPORT = process.env.MYSQLPORT || 3306
const MYSQL_URI = process.env.MYSQL_URI || ''

// Agregar la clave secreta para JWT
const JWT_SECRET = process.env.JWT_SECRET || '12345';


module.exports = {
    MYSQLHOST,
    MYSQLUSER,
    MYSQLPASSWORD,
    MYSQLDATABASE,
    MYSQLPORT,
    MYSQL_URI
}