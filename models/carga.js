const { Schema, model } = require('mongoose');

const CargaSchema = Schema({
    cuenta: {
        type: String,
        required: [true, 'La cuenta es obligatoria']
    },
    monto: {
        type: Number,
        required: [true, 'El monto a depositar es obligarorio'],
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

CargaSchema.methods.toJSON = function () {
    const { __v, _id, ...carga } = this.toObject();
    return carga;
}

module.exports = model('Carga', CargaSchema);
