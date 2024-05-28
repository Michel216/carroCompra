const { productoController } = require("../controllers/producto")
const { Router } = require('express')
const productoRouter = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');

// const {productoHelper}=require('../helpers/producto')

productoRouter.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty().isString(),
    check('precio', 'El precio es obligatorio y debe ser un número').notEmpty().isNumeric(),
    check('stock', 'El stock es obligatorio y debe ser un número').notEmpty().isNumeric(),
    check('stockMinimo', 'El stock mínimo es obligatorio y debe ser un número').notEmpty().isNumeric(),
    validarCampos
], productoController.insertar)
productoRouter.get('/', [validarJWT,validarCampos], productoController.listarTodos);
productoRouter.get('/activos', [validarJWT,validarCampos], productoController.ListarActivos);
productoRouter.get('/inactivos', [validarJWT,validarCampos], productoController.ListarInactivos);
productoRouter.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], productoController.obtenerPorId);
productoRouter.get('/stock-minimo/:stockMinimo', [validarJWT,validarCampos], productoController.listarPorStockMinimo);
productoRouter.get('/precio-superior/:precio', [validarCampos], productoController.listarPorPrecioSuperiorA);
productoRouter.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], productoController.modificar);
productoRouter.put('/activar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], productoController.activar);
productoRouter.put('/desactivar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], productoController.desactivar);

module.exports = productoRouter 
