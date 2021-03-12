const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Cuenta = require('../models/cuenta');

const cuentaGet = async (req, res = response) => {
    const { rut, saldo, nombre } = req.cuenta;
    if (rut) {
        res.json({
            ok: true,
            cuenta: {
                rut,
                saldo,
                nombre
            }
        });
    } else {
        res.json({
            ok: false
        });
    }
}
const cuentasPost = async (req, res = response) => {

    const { nombre, correo, password, rut } = req.body;
    const cuenta = new Cuenta({ nombre, correo, password, rut });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    cuenta.password = bcryptjs.hashSync(password, salt);

    const existeRut = await Cuenta.findOne({ rut });
    if (existeRut) {
        return res.json({
            ok: false,
            msg: "Ya existe una cuenta asociada al rut"
        });
    }
    const existeEmail = await Cuenta.findOne({ correo });
    if (existeEmail) {
        return res.json({
            ok: false,
            msg: "Este mail ya está asociado a una cuenta"
        });
    }

    await cuenta.save();

    res.json({
        ok: true,
        cuenta
    });
}

module.exports = {
    cuentasPost,
    cuentaGet
}