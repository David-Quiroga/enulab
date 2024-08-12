const postre = (sequelize, type) => {
    return sequelize.define('postres', {
        idPostres: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de postres'
        },
        nombre: {
            type: type.STRING,
            comment: 'Nombre de postres'
        },
        descripcion: {
            type: type.STRING,
            comment: 'descripcion de postres'
        }, 
        precio: {
            type: type.STRING,
            comment: 'precio de postres'
        },
        estado:{
            type: type.STRING,
            comment: 'estado de la postres'
        },
        subCategoria:{
            type: type.STRING,
            comment: 'subcategoria'
        },
        createPostres: {
            type: type.STRING,
            comment: 'crear de postres'
        },
        updatePostres: {
            type: type.STRING,
            comment: 'actuazlizar de postres'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de postres'
    })
}

module.exports = postre