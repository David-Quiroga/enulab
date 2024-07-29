const restaurante = (sequelize, type) => {
    return sequelize.define('restaurante', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de restaurante'
        },
        nombreRestaurante: {
            type: type.STRING,
            comment: 'Nombre completo del restaurante'
        },
        ubicacion: {
            type: type.STRING,
            comment: 'Ubicación del restaurante'
        }, 
        tipoComida: {
            type: type.STRING,
            comment: 'Tipo de comida del restaurante'
        },
        objetivos: {
            type: type.STRING,
            comment: 'Misión y visión del restaurante'
        },
        // logo:{
        //     type: type.STRING,
        //     comment: 'logo del restaurante'
        // },
        descripcion: {
            type: type.STRING,
            comment: 'Descripción del restaurante'
        },
        createRestaurante: {
            type: type.STRING,
            comment: 'Crear restaurante'
        },
        updateRestaurante: {
            type: type.STRING,
            comment: 'Actualizar restaurante'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de restaurantes'
    });
}

module.exports = restaurante;
