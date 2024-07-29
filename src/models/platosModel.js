const plato = (sequelize, type) => {
    return sequelize.define('plato', {
        idPlato: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico del plato'
        },
        nombre: {
            type: type.STRING,
            comment: 'Nombre del plato'
        },
        descripcion: {
            type: type.STRING,
            comment: 'descripcion del plato'
        }, 
        precio: {
            type: type.STRING,
            comment: 'precio del plato'
        },
        estado:{
            type: type.DECIMAL,
            comment: 'estado del plato'
        },
        createPlatos: {
            type: type.STRING,
            comment: 'crear de platos'
        },
        updatePlatos: {
            type: type.STRING,
            comment: 'actuazlizar de platos'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de platos'
    })
}

module.exports = plato