const { response, request } = require('express');

const Carga = require('../models/carga');
const Cuenta = require('../models/cuenta');

const cargaPost = async (req, res = response) => {

    const { monto } = req.body;
    const { rut, _id, saldo } = req.cuenta;
    const carga = new Carga({ cuenta: rut, monto });
    try {
        const update = { saldo: saldo + monto };
        const cuenta = await Cuenta.findById(_id);
        if (cuenta) {
            await cuenta.updateOne(update);
            await carga.save();
            res.json({
                ok: true,
                msg: "Carga de fondos realizada con éxito",
                ...update
            });
        }
    } catch (e) {
        res.json({
            ok: false,
            msg: "No se pudo realizar la carga de fondos",
        });
    }
}
module.exports = {
    cargaPost
}