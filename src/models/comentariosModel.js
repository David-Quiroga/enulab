const Valoracion = (sequelize, type) => {
    return sequelize.define('Valoracion', {
        idValoracion: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de valoración'
        },
        estrellas: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'Puntuación en estrellas (1 a 5)'
        },
        comentario: {
            type: type.STRING,
            allowNull: true,
            comment: 'Comentario del cliente'
        },
        fechaValoracion: {
            type: type.DATE,
            defaultValue: type.NOW,
            comment: 'Fecha en la que se realizó la valoración'
        },
        createComentario: {
            type: type.STRING,
            allowNull: true,
            comment: 'Usuario que creó el registro'
        },
        updateComentario: {
            type: type.STRING,
            allowNull: true,
            comment: 'Usuario que actualizó el registro'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de valoraciones y comentarios de clientes'
    });
}

module.exports = Valoracion;
