const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Cuenta = require('../models/cuenta');

const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req, res = response) => {

    const { rut, password } = req.body;

    try {

        // Verificar si el email existe
        const cuenta = await Cuenta.findOne({ rut });
        if (!cuenta) {
            return res.json({
                msg: 'Cuenta / Password no son correctos - rut',
                ok: false
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, cuenta.password);
        if (!validPassword) {
            return res.json({
                msg: 'Cuenta / Password no son correctos - password',
                ok: false
            });
        }

        // Generar el JWT
        const token = await generarJWT(cuenta.id);

        res.json({
            cuenta,
            token,
            ok: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador',
            ok: false
        });
    }

}



module.exports = {
    login
}
