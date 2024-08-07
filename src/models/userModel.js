const User = (sequelize, type) => {
    return sequelize.define('User', {
        idUsuario: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de usuario'
        },
        nombreCompleto: {
            type: type.STRING,
            comment: 'Nombre completp de usuario'
        },
        correoElectronico: {
            type: type.STRING,
            comment: 'correo de usuario'
        }, 
        password: {
            type: type.STRING,
            comment: 'contraseña de usuario'
        },
        rucUser:{
            type: type.STRING,
            comment: 'ruc de usuario'
        },
        numeroContacto: {
            type: type.STRING,
            comment: 'contacto de usuario'
        },
        createUser: {
            type: type.STRING,
            comment: 'crear de usuario'
        },
        updateUser: {
            type: type.STRING,
            comment: 'actuazlizar de usuario'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de usuarios'
    })
}

module.exports = User