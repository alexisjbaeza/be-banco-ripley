const { Schema, model } = require('mongoose');

const RetiroSchema = Schema({
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

RetiroSchema.methods.toJSON = function () {
    const { __v, _id, ...retiro } = this.toObject();
    return retiro;
}

module.exports = model('Retiro', RetiroSchema);
