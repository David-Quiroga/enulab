const empleados = (sequelize, type) => {
    return sequelize.define('empleados', {
        idEmpleado: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de empleados'
        },
        nombreCompleto: {
            type: type.STRING,
            comment: 'Nombre completo de empleados'
        },
        cedula: {
            type: type.DECIMAL,
            comment: 'cedula de empleados'
        }, 
        edadEmpleado: {
            type: type.DECIMAL,
            comment: 'edad de empleados'
        },
        genero:{
            type: type.STRING,
            comment: 'genero de empleados'
        },
        sueldo:{
            type: type.DECIMAL,
            comment: 'sueldo de empleados'
        },
        numeroContacto: {
            type: type.STRING,
            comment: 'contacto de empleado'
        },
        createUser: {
            type: type.STRING,
            comment: 'crear de empleado'
        },
        updateUser: {
            type: type.STRING,
            comment: 'actuazlizar de empleado'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de empleado'
    })
}
// ! Mirar la relacion
module.exports = empleados