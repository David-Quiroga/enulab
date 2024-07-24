const horario = (sequelize, type) => {
    return sequelize.define('horario', {
        idHorario: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico del horario'
        },
        horaApertura: {
            type: type.TIME,
            comment: 'Hora de apertura'
        },
        horaCierre: {
            type: type.TIME,
            comment: 'Hora de cierre'
        }, 
        createHorario: {
            type: type.STRING,
            comment: 'crear de horario'
        },
        updateHorario: {
            type: type.STRING,
            comment: 'actuazlizar de horario'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de horarios'
    })
}

module.exports = horario