const { usuarioController } = require('../controllers/usuario')
const { check } = require('express-validator');
const { Router } = require('express')
const usuarioRouter = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');

usuarioRouter.get('/', [validarJWT,validarCampos], usuarioController.listarTodos);
usuarioRouter.get('/activos', [validarJWT,validarCampos], usuarioController.ListarActivos);
usuarioRouter.get('/desactivos', [validarJWT,validarCampos], usuarioController.ListarDesactivos);
usuarioRouter.get('/:id', [validarJWT, check('id', 'No es un ID válido').isMongoId(), validarCampos], usuarioController.buscarPorId);
usuarioRouter.post('/insertar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    // check('email', 'El email no es valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], usuarioController.insertar);
usuarioRouter.post('/login', [
    check('email', 'El email es obligatorio y debe tener un formato válido').notEmpty().isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], usuarioController.login);
usuarioRouter.post('/cambiar-contrasena/:id', [
    validarJWT,
    check('password', 'La contraseña es obligatoria y debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('newPassword', 'La nueva contraseña es obligatoria y debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], usuarioController.cambiarContrasena);
usuarioRouter.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], usuarioController.modificar);
usuarioRouter.put('/activar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], usuarioController.activar);
usuarioRouter.put('/desactivar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], usuarioController.desactivar);


module.exports = usuarioRouter 