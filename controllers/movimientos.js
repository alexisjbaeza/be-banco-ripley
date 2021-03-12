const { response, request } = require('express');

const Carga = require('../models/carga');
const Cuenta = require('../models/cuenta');
const Retiro = require('../models/retiro');
const Transferencia = require('../models/transferencia');


const movimientosGet = async (req, res = response) => {
    const { rut } = req.cuenta;
    var promises = [];
    promises.push(Carga.find({ cuenta: rut }).lean().exec());
    promises.push(Retiro.find({ cuenta: rut }).lean().exec());
    promises.push(Transferencia.find({ cuenta_origen: rut }).lean().exec());
    promises.push(Transferencia.find({ cuenta_destino: rut }).lean().exec());
    Promise.all(promises).then(results => {
        const movimientos = mapearMovimientos(results);
        res.json({
            movimientos
        });
    }).catch(err => {
        res.json({ msg: "No se pudieron obtener los movimietnos del cliente" })
    })
};

function mapearMovimientos(results) {
    var movimientos = [];
    results[0].forEach(element => {
        element.tipo = "Carga de fondos";
        movimientos.push(element);
    });
    results[1].map(element => {
        element.tipo = "Retiro de fondos";
        movimientos.push(element);
    });
    results[2].map(element => {
        element.tipo = "Transferencia emitida";
        movimientos.push(element);
    });
    results[3].map(element => {
        element.tipo = "Transferencia recibida";
        movimientos.push(element);
    });
    movimientos.sort(function (a, b) {
        var c = new Date(a.fecha);
        var d = new Date(b.fecha);
        return d - c;
    });
    return movimientos;
}


module.exports = {
    movimientosGet
};
