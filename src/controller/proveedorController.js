const orm = require('../Database/dataBase.orm.js');
const proveedoresCtl = {};

// Método para crear un nuevo proveedor
proveedoresCtl.mandar = async (req, res) => {
    const { nombreProveedor, numContacto, emailContacto, direccion, ciudad, estado, tipoProducto } = req.body;
    console.log('Datos recibidos:', req.body); // Añade este log para verificar los datos
    try {
        await orm.proveedores.create({nombreProveedor,numContacto,emailContacto,direccion,ciudad,estado,tipoProducto});
        res.status(200).send('Proveedor creado con éxito');
    } catch (error) {
        console.error('Error al crear el proveedor:', error);
        res.status(500).send('Hubo un error al crear el proveedor');
    }
};

// Método para mostrar todos los proveedores
proveedoresCtl.mostrar = async (req, res) => {
    const { id } = req.params;
    if (id) {
      try {
        const proveedor = await orm.proveedores.findByPk(id);
        if (proveedor) {
          res.status(200).json(proveedor);
        } else {
          res.status(404).send('Proveedor no encontrado');
        }
      } catch (err) {
        console.error('Error al obtener proveedor', err);
        res.status(500).send('Hubo un error al obtener el proveedor');
      }
    } else {
      try {
        const listaProveedores = await orm.proveedores.findAll();
        res.status(200).json(listaProveedores);
      } catch (err) {
        console.error('Error al obtener proveedores', err);
        res.status(500).send('Hubo un error al obtener los proveedores');
      }
    }
  };

// Método para eliminar un proveedor
proveedoresCtl.eliminar = async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido para eliminar:', id); // Añade este log para verificar el ID
    try {
        const resultado = await orm.proveedores.destroy({
            where: {
                idProveedores: id
            }
        });
        if (resultado) {
            res.status(200).send('Proveedor eliminado con éxito');
        } else {
            res.status(404).send('Proveedor no encontrado');
        }
    } catch (error) {
        console.error('Error al eliminar el proveedor:', error);
        res.status(500).send('Hubo un error al eliminar el proveedor');
    }
};

// Método para actualizar un proveedor
proveedoresCtl.actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombreProveedor, numContacto, emailContacto, direccion, ciudad, estado, tipoProducto } = req.body;
    try {
        const resultado = await orm.proveedores.update({
            nombreProveedor,
            numContacto,
            emailContacto,
            direccion,
            ciudad,
            estado,
            tipoProducto
        }, {
            where: {
                idProveedores: id
            }
        });
        if (resultado[0]) {
            res.status(200).send('Proveedor actualizado con éxito');
        } else {
            res.status(404).send('Proveedor no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar el proveedor:', error);
        res.status(500).send('Hubo un error al actualizar el proveedor');
    }
};

module.exports = proveedoresCtl;
