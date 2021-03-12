const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT
} = require('../middlewares');



const { cuentasPost, cuentaGet } = require('../controllers/cuentas');

const router = Router();

router.get('/', [
    validarJWT
], cuentaGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    validarCampos
], cuentasPost);



module.exports = router;