const helado = (sequelize, type) => {
    return sequelize.define('helado', {
        idHelado: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico del helado'
        },
        nombre: {
            type: type.STRING,
            comment: 'Nombre del helado'
        },
        descripcion: {
            type: type.STRING,
            comment: 'descripcion del helado'
        }, 
        precio: {
            type: type.STRING,
            comment: 'precio del helado'
        },
        estado:{
            type: type.STRING,
            comment: 'estado del helado'
        },
        createSopas: {
            type: type.STRING,
            comment: 'crear de helados'
        },
        updateSopas: {
            type: type.STRING,
            comment: 'actualizar de helados'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de helados'
    })
}

module.exports = helado