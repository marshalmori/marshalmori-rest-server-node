const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");

const {
  existeProductoPorId,
  existeCategoriaPorId,
} = require("../helpers/db-validators");

const router = Router();

//Obtener todos os productos - público
router.get("/", obtenerProductos);
// Obtener un producto por id - público
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);
// Crear producto - privado - Token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "O nome do produto é obrigatório.").not().isEmpty(),
    check("categoria", "Não é um id do Mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

// Atualizar producto - privado - Token válido
router.put(
  "/:id",
  [
    validarJWT,
    check("categoria", "Não é um id do Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);
// Deletar un producto - Token válido - Deve ser Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "Não é um id válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);
module.exports = router;
