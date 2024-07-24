const restaurante = (sequelize, type) => {
    return sequelize.define('restaurante', {
        idRestaurante: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de restaurante'
        },
        nombreRestaurante: {
            type: type.STRING,
            comment: 'Nombre completp de restaurante'
        },
        ubicacion: {
            type: type.STRING,
            comment: 'Ubicacion del restaurante'
        }, 
        objetivos: {
            type: type.STRING,
            comment: 'mision y vision del restaurante'
        },
        logo: {
            type: type.STRING,
            comment: 'logo del restaurante'
        },
        descripcion: {
            type: type.STRING,
            comment: 'descripcion del  restaurante'
        },
        createRestaurante: {
            type: type.STRING,
            comment: 'crear de restaurante'
        },
        updateRestaurante: {
            type: type.STRING,
            comment: 'actuazlizar de restaurante'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de restaurantes'
    })
}

module.exports = restaurante