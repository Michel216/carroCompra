const express = require('express');
const carritoController= require("../controllers/carrito")
const carritoRouter = express.Router();
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

carritoRouter.get('/cliente/:clienteId',[
    check('clienteId', 'No es un ID válido').isMongoId(),
    validarCampos
], carritoController.listarPorClienteId);
carritoRouter.post('/',[
    check('cliente', 'El Id del cliente no es valido ').isMongoId(),
    check('producto', 'El Id del producto no es valido ').isMongoId(),
validarCampos
], carritoController.insertar);
carritoRouter.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(), 
    validarCampos
], carritoController.eliminar);
carritoRouter.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(), 
    validarCampos
],carritoController.modificar);

module.exports = carritoRouter;
