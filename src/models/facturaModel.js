const factura = (sequelize, type) => {
    return sequelize.define('factura', {
        idFactura: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de factura'
        },
        cantidad: {
            type: type.STRING,
            comment: 'cantidad de factura'
        },
        precioUnitario: {
            type: type.STRING,
            comment: 'precio de factura'
        }, 
        descuento: {
            type: type.STRING,
            comment: 'descuento de factura'
        },
        iva:{
            type: type.DECIMAL,
            comment: 'iva de la factura'
        },
        createFactura: {
            type: type.STRING,
            comment: 'crear de factura'
        },
        updateFactura: {
            type: type.STRING,
            comment: 'actuazlizar de factura'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de factura'
    })
}

module.exports = factura