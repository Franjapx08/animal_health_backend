const express = require('express')
const cors = require('cors');
//const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');
const { createServer } = require('http');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer( this.app );
        //this.io     = require('socket.io')(this.server)

        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        }
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

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
        
        // Directorio publico
        this.app.use( express.static('public') );

        /* this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        })); */

    }

    routes(){
        //this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios.js'));
        //this.app.use( this.paths.categorias, require('../routes/categorias.js'));
        //this.app.use( this.paths.productos, require('../routes/productos.js'));
        //this.app.use( this.paths.buscar, require('../routes/buscar.js'));
        //this.app.use( this.paths.uploads, require('../routes/uploads.js'));
    }

    sockets() {
        this.io.on('connection', ( socket ) => socketController(socket, this.io ) )
    }

    listen(){
        this.server.listen(this.port, () =>{
            console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;