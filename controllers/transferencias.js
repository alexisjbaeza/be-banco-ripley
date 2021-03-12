const { response, request } = require('express');

const Transferencia = require('../models/transferencia');
const Cuenta = require('../models/cuenta');


const transferenciasGet = async (req, res = response) => {
    Transferencia.find().then(
        transferencias => res.json({ transferencias })
    );
};

const transferenciaPost = async (req, res = response) => {
    const { cuenta_destino, monto } = req.body;
    const { rut, _id, saldo } = req.cuenta;
    const transferencia = new Transferencia({ cuenta_origen: rut, cuenta_destino, monto });
    try {
        if (rut == cuenta_destino) {
            return res.json({
                ok: false,
                msg: "No puedes transferir a tu misma cuenta",
            });
        }
        if (saldo < monto) {
            return res.json({
                ok: false,
                msg: "No cuentas con el saldo suficiente para realizar el transferencia",
            });
        }
        const cuenta_destino_bd = await Cuenta.findOne({ rut: cuenta_destino });
        if (!cuenta_destino_bd) {
            return res.json({
                ok: false,
                msg: "La cuenta de destino no existe en el sistema",
            });
        }
        const update_origen = { saldo: saldo - monto };
        const cuenta_origen_bd = await Cuenta.findById(_id);
        const cuenta_origen_bd_update = await cuenta_origen_bd.updateOne(update_origen);
        if (cuenta_origen_bd_update) {
            const cuenta_destino_bd = await Cuenta.findOne({ rut: cuenta_destino });
            if (cuenta_destino_bd) {
                const update_destino = { saldo: cuenta_destino_bd.saldo + monto };
                const cuenta_destino_bd_update = await cuenta_destino_bd.updateOne(update_destino);
                const transferencia_bd = await transferencia.save();
                res.json({
                    ok: true,
                    msg: "Transferencia realizado con éxito",
                });
            }
        }
    } catch (e) {
        res.json({
            ok: false,
            msg: "No se pudo realizar la trasanferencia",
        });
    }
}

module.exports = {
    transferenciaPost,
    transferenciasGet
};

