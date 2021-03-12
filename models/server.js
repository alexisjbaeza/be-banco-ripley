const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = '/api/auth';
        this.cuentasPath = '/api/cuentas';
        this.cargasPath = '/api/cargas';
        this.retirosPath = '/api/retiros';
        this.transferenciasPath = '/api/transferencias';
        this.movimientosPath = '/api/movimientos';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.cuentasPath, require('../routes/cuentas'));
        this.app.use(this.cargasPath, require('../routes/cargas'));
        this.app.use(this.retirosPath, require('../routes/retiros'));
        this.app.use(this.transferenciasPath, require('../routes/transferencias'));
        this.app.use(this.movimientosPath, require('../routes/movimientos'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;
