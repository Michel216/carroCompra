const express = require('express');
const { detalleVentaController } = require("../controllers/detalleVenta")
const detalleVentaRouter = express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');


detalleVentaRouter.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], detalleVentaController.listarPorVentaId);
detalleVentaRouter.post('/', [
    validarJWT,
    check('producto', 'El Id del producto no es valido ').isMongoId(),
    validarCampos
], detalleVentaController.insertar);
detalleVentaRouter.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], detalleVentaController.modificar);

module.exports = detalleVentaRouter
