const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      categorias: "/api/categorias",
      productos: "/api/productos",
      usuarios: "/api/usuarios",
    };

    // Conectar base de dados
    this.conectarDB();

    // Middlewares
    this.middlewares();
    // Routes
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

    // Public directory (Lembre-se que por padrão o endpoint / é para o index)
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
