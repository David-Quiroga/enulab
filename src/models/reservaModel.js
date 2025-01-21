const Reserva = (sequelize, type) => {
    return sequelize.define('Reserva', {
        idReserva: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo único de identificación para la reserva'
        },
        name: {
            type: type.STRING,
            comment: 'Nombre del cliente que realiza la reserva'
        },
        date: {
            type: type.DATEONLY, // Si solo se necesita la fecha sin hora
            comment: 'Fecha de la reserva'
        },
        time: {
            type: type.TIME,
            comment: 'Hora de la reserva'
        },
        people: {
            type: type.INTEGER,
            comment: 'Número de personas para la reserva'
        },
        notes: {
            type: type.STRING,
            allowNull: true,
            comment: 'Notas adicionales para la reserva'
        },
        createReserva: {
            type: type.STRING,
            allowNull: true,
            comment: 'Usuario que creó la reserva'
        },
        updateReserva: {
            type: type.STRING,
            allowNull: true,
            comment: 'Usuario que actualizó la reserva'
        }
    }, {
        timestamps: false, // Desactivar el uso de createdAt y updatedAt si usas campos personalizados
        tableName: 'Reservas', // Nombre de la tabla en plural
        comment: 'Tabla de reservas realizadas por los clientes'
    });
}

module.exports = Reserva;
