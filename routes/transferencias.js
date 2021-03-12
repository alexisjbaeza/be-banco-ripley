const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
} = require('../middlewares');


const { esRoleValido, emailExiste, existeUsuarioPorId, rutExiste } = require('../helpers/db-validators');

const { transferenciaPost, transferenciasGet } = require('../controllers/transferencias');

const router = Router();

router.get('/', transferenciasGet);

router.post('/', [
    validarJWT,
    check('cuenta_destino', 'La cuenta de destino es obligatoria').not().isEmpty(),
    check('monto', 'El monto es obligatorio').not().isEmpty(),
    check('monto', 'El monto es válido').isNumeric(),
    validarCampos
], transferenciaPost);

module.exports = router;