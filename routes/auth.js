const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');


const { login } = require('../controllers/auth');


const router = Router();

router.post('/login', [
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);



module.exports = router;