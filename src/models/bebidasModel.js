const bebidas = (sequelize, type) => {
    return sequelize.define('bebidas', {
        idBebidas: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de bebidas'
        },
        nombre: {
            type: type.STRING,
            comment: 'Nombre de bebidas'
        },
        descripcion: {
            type: type.STRING,
            comment: 'descripcion de bebidas'
        }, 
        precio: {
            type: type.STRING,
            comment: 'precio de bebidas'
        },
        estado:{
            type: type.DECIMAL,
            comment: 'estado de la bebida'
        },
        createBebidas: {
            type: type.STRING,
            comment: 'crear de bebidas'
        },
        updateBebidas: {
            type: type.STRING,
            comment: 'actuazlizar de bebidas'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de bebidas'
    })
}

module.exports = bebidas