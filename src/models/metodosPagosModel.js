const mPagos = (sequelize, type) => {
    return sequelize.define('mPagos', {
        idMPagos: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de pagos'
        },
        nombre: {
            type: type.STRING,
            comment: 'Nombre de pagos'
        },
        estado:{
            type: type.DECIMAL,
            comment: 'estado de la pagos'
        },
        createMPagos: {
            type: type.STRING,
            comment: 'crear de pagos'
        },
        updateMPagos: {
            type: type.STRING,
            comment: 'actuazlizar de pagos'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de pagos'
    })
}

module.exports = mPagos