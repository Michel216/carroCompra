const express = require('express');
const { clienteController } = require("../controllers/cliente")
const clienteRouter = express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');


clienteRouter.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('documento', 'El documento es obligatorio').not().isEmpty(),
    validarCampos
], clienteController.insertar);
clienteRouter.get('/', [validarJWT,validarCampos], clienteController.listarTodos);
clienteRouter.get('/activos', [validarJWT,validarCampos], clienteController.listarActivos);
clienteRouter.get('/inactivos', [validarJWT,validarCampos], clienteController.listarInactivos);
clienteRouter.get('/:id', [validarJWT, check('id', 'No es un ID válido').isMongoId(),validarCampos], clienteController.obtenerPorId);
clienteRouter.put('/:id', [validarJWT, check('id', 'No es un ID válido').isMongoId(),validarCampos],clienteController.modificar);
clienteRouter.put('/activar/:id', [ validarJWT, check('id', 'No es un ID válido').isMongoId(), validarCampos],clienteController.activar);
clienteRouter.put('/desactivar/:id', [ validarJWT, check('id', 'No es un ID válido').isMongoId(), validarCampos],clienteController.desactivar);
clienteRouter.get('/activos', [validarJWT,validarCampos], clienteController.listarActivos);
clienteRouter.get('/inactivos', [validarJWT,validarCampos], clienteController.listarInactivos);

module.exports = clienteRouter
