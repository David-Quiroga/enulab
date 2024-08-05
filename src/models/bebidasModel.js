const bebidas = (sequelize, type) => {
    return sequelize.define('bebidas', {
        idBebida: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de bebidas'
        },
        nombre: {
            type: type.STRING,
            comment: 'Nombre de la bebida'
        },
        descripcion: {
            type: type.STRING,
            comment: 'Descripción de la bebida'
        }, 
        precio: {
            type: type.STRING,
            comment: 'Precio de la bebida'
        },
        subCategoria: {
            type: type.STRING,
            comment: 'Subcategoría de la bebida'
        },
        estado: {
            type: type.STRING,
            comment: 'Estado de la bebida'
        },
        createBebida: {
            type: type.DATE,
            comment: 'Fecha de creación de la bebida'
        },
        updateBebida: {
            type: type.DATE,
            comment: 'Fecha de última actualización de la bebida'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de bebidas'
    });
}

module.exports = bebidas;
