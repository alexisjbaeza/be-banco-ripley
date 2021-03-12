const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Cuenta = require('../models/cuenta');


const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const cuenta = await Cuenta.findById(uid);

        if (!cuenta) {
            return res.status(401).json({
                msg: 'Token no válido - cuenta no existe DB'
            })
        }
        req.cuenta = cuenta;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validarJWT
}