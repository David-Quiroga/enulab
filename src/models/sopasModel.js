const sopa = (sequelize, type) => {
    return sequelize.define('sopa', {
        idSopa: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de la sopa'
        },
        nombre: {
            type: type.STRING,
            comment: 'Nombre de la sopa'
        },
        descripcion: {
            type: type.STRING,
            comment: 'descripcion del plato'
        }, 
        precio: {
            type: type.STRING,
            comment: 'precio de la sopa'
        },
        porciones: {
            type: type.STRING,
            comment: 'Porciones de la sopa'
        },
        subCategoria: {
            type: type.STRING,
            comment: 'Sub Categoria de la sopas'
        },
        estado:{
            type: type.STRING,
            comment: 'estado de la sopa'
        },
        createSopas: {
            type: type.STRING,
            comment: 'crear de sopas'
        },
        updateSopas: {
            type: type.STRING,
            comment: 'actualizar de sopas'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de sopas'
    })
}

module.exports = sopa