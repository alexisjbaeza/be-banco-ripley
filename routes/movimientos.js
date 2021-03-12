const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
} = require('../middlewares');


const { esRoleValido, emailExiste, existeUsuarioPorId, rutExiste } = require('../helpers/db-validators');

const { movimientosGet } = require('../controllers/movimientos');

const router = Router();

router.get('/', [
    validarJWT
], movimientosGet);


module.exports = router;