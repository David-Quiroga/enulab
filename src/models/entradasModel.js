const entradas = (sequelize, type) => {
    return sequelize.define('entradas', {
        idEntrada: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único del entradas'
        },
        nombre: {
            type: type.STRING,
            comment: 'Nombre del entradas'
        },
        descripcion: {
            type: type.STRING,
            comment: 'Descripción del entradas'
        }, 
        precio: {
            type: type.STRING,
            comment: 'Precio del entradas'
        },
        porciones: {
            type: type.STRING,
            comment: 'Porciones del entradas'
        },
        subCategoria: {
            type: type.STRING,
            comment: 'Sub Categoría del entradas'
        },
        estado:{
            type: type.STRING,
            comment: 'Estado del entradas'
        },
        createEntrada: {
            type: type.STRING,
            comment: 'Creación de entradas'
        },
        updateEntrada: {
            type: type.STRING,
            comment: 'Actualización de entradas'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de entradas'
    });
}

module.exports = entradas;
