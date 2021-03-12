const { Schema, model } = require('mongoose');

const TransferenciaSchema = Schema({
    cuenta_origen: {
        type: String,
        required: [true, 'La cuenta de origen es obligatoria']
    },
    cuenta_destino: {
        type: String,
        required: [true, 'La cuenta de destino es obligatoria']
    },
    monto: {
        type: Number,
        required: [true, 'El monto a transferir es obligarorio'],
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

TransferenciaSchema.methods.toJSON = function () {
    const { __v, _id, ...transferencia } = this.toObject();
    return transferencia;
}

module.exports = model('Transferencia', TransferenciaSchema);
