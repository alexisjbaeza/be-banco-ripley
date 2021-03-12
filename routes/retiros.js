const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
} = require('../middlewares');


const { esRoleValido, emailExiste, existeUsuarioPorId, rutExiste } = require('../helpers/db-validators');

const { retiroPost, retirosGet } = require('../controllers/retiro');

const router = Router();

router.get('/', retirosGet);

router.post('/', [
    validarJWT,
    check('monto', 'El monto es obligatorio').not().isEmpty(),
    check('monto', 'El monto no es válido').isNumeric(),
    validarCampos
], retiroPost);

module.exports = router;