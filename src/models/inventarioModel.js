const inventarrio = (sequelize, type) => {
    return sequelize.define('inventario', {
        idInventario: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de inventario'
        },
        nombreProductos: {
            type: type.STRING,
            comment: 'Nombre completp de inventario'
        },
        estado: {
            type: type.STRING,
            comment: 'Ubicacion del inventario'
        }, 
        cantidad: {
            type: type.STRING,
            comment: 'cantidad del inventario'
        },
        categoria: {
            type: type.STRING,
            comment: 'categoria del inventario'
        },
        descripcion: {
            type: type.STRING,
            comment: 'descripcion del  inventario'
        },
        createInventario: {
            type: type.STRING,
            comment: 'crear de inventario'
        },
        updateInventario: {
            type: type.STRING,
            comment: 'actuazlizar de inventario'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de inventario'
    })
}

module.exports = inventarrio