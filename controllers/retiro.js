const { response, request } = require('express');

const Retiro = require('../models/retiro');
const Cuenta = require('../models/cuenta');

const retirosGet = async (req, res = response) => {
    Retiro.find().then(
        retiros => res.json({ retiros })
    );
};

const retiroPost = async (req, res = response) => {
    const { monto } = req.body;
    const { rut, _id, saldo } = req.cuenta;
    const retiro = new Retiro({ cuenta: rut, monto });
    try {
        if (saldo >= monto) {
            const update = { saldo: saldo - monto };
            const cuenta = await Cuenta.findById(_id);
            if (cuenta) {
                await cuenta.updateOne(update);
                await retiro.save();
                res.json({
                    ok: true,
                    msg: "Retiro realizado con éxito",
                });
            }
        } else {
            res.json({
                ok: false,
                msg: "No cuentas con el saldo suficiente para realizar el retiro",
            });
        }
    } catch (e) {
        res.json({
            ok: false,
            msg: "No se pudo realizar el retiro",
        });
    }
}

module.exports = {
    retiroPost,
    retirosGet
};

