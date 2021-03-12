const Cuenta = require('../models/cuenta');


const emailExiste = async (correo = '') => {

    // Verificar si el correo existe
    const existeEmail = await Cuenta.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
};

const rutExiste = async (rut = '') => {

    // Verificar si el rut existe
    const existeRut = await Cuenta.findOne({ rut });
    if (existeRut) {
        throw new Error(`El rut: ${rut}, ya está registrado`);
    }
};

const montoEsPositivo = (monto => {
    var esPositivo = monto > 0 ? true : false;
    return esPositivo;
}
);


module.exports = {
    rutExiste,
    emailExiste,
    montoEsPositivo
}

