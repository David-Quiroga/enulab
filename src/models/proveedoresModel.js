const proveedores = (sequelize, type) => {
    return sequelize.define('proveedores', {
        idProveedores: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de usuario'
        },
        nombreProveedor: {
            type: type.STRING,
            comment: 'Nombre del proveedor'
        },
        numContacto: {
            type: type.STRING,
            comment: 'numero del proveedor'
        }, 
        emailContacto: {
            type: type.STRING,
            comment: 'correo del proveedor'
        },
        direccion:{
            type: type.DECIMAL,
            comment: 'direccion del proveedor'
        },
        ciudad: {
            type: type.STRING,
            comment: 'ciudad del proveedor'
        },
        provincia: {
            type: type.STRING,
            comment: 'provincia del provincia'
        },
        tipoProducto: {
            type: type.STRING,
            comment: 'tipo de producto'
        },
        createProveedores: {
            type: type.STRING,
            comment: 'crear de proveedor'
        },
        updateProveedores: {
            type: type.STRING,
            comment: 'actuazlizar de proveedor'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de proveedores'
    })
}

module.exports = proveedores