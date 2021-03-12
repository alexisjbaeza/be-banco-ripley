
const { Schema, model } = require('mongoose');

const CuentaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    rut: {
        type: String,
        unique: true,
        required: [true, 'El rut es obligatorio']
    },
    saldo: {
        type: Number,
        default: 0
    },
    fecha_apertura: {
        type: Date,
        default: Date.now
    }
});



CuentaSchema.methods.toJSON = function () {
    const { __v, password, _id, ...cuenta } = this.toObject();
    cuenta.uid = _id;
    return cuenta;
}

module.exports = model('Cuenta', CuentaSchema);
