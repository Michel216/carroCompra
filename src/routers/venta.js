// const express = require('express');
const { ventaController } = require("../controllers/venta")
const { Router } = require('express')
const ventaRouter = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');

ventaRouter.get('/', [validarJWT,validarCampos], ventaController.listarTodos);
ventaRouter.get('/activos', [validarJWT,validarCampos], ventaController.listarActivos);
ventaRouter.get('/inactivos', [validarJWT,validarCampos], ventaController.listarInactivos);
ventaRouter.get('/total-descuento', [validarJWT,validarCampos], ventaController.totalDescuento);
ventaRouter.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], ventaController.obtenerPorId);
ventaRouter.get('/cliente/:clienteId', [
    validarJWT,
    check('clienteId', 'No es un ID válido').isMongoId(),
    validarCampos
], ventaController.listarPorClienteId);
ventaRouter.post('/', [
    validarJWT,
    check('cliente', 'El Id del cliente no es valido ').isMongoId(),
    check('detalle', 'El Id de detalle Venta no es valido ').isMongoId(),
    check('fecha', 'La fecha es obligatorio').not().isEmpty(),
], ventaController.insertar);
ventaRouter.put('/:id', [validarJWT,validarCampos], ventaController.modificar);
ventaRouter.put('/activar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], ventaController.activar);
ventaRouter.put('/desactivar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], ventaController.desactivar);
ventaRouter.post('/entre-fechas', [validarJWT,validarCampos], ventaController.listarEntreFechas);
ventaRouter.get('/valor-superior/:valor', [validarJWT,validarCampos], ventaController.listarValorSuperiorA);
ventaRouter.post('/total-entre-fechas', [validarJWT,validarCampos], ventaController.totalVentasEntreFechas);

module.exports = ventaRouter

