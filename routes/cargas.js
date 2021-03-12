const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
} = require('../middlewares');


const { montoEsPositivo } = require('../helpers/db-validators');

const { cargaPost, cargasGet } = require('../controllers/carga');

const router = Router();

router.post('/', [
    validarJWT,
    check('monto', 'El monto es obligatorio').not().isEmpty(),
    check('monto', 'El monto no es válido').isNumeric(),
    check('monto', 'El monto debe ser positivo').custom(montoEsPositivo),
    validarCampos
], cargaPost);

module.exports = router;