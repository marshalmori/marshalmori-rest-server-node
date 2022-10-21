const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const { existeCategoriaPorId } = require("../helpers/db-validators");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");

const router = Router();

/*
 {{url}}/api/categorias
*/

// Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "Não é um ID válido para o Mongo").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear categoria - privado - qualquer pessoa com um token válido.
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "O nome da categoria é obrigatório.").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Atualizar - privado - qualquer com token válido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "O nome da categoria é obrigatório.").not().isEmpty(),
    check("id", "Não é um id válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

// Deletar uma categoria - Deve ser Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "Não é um id válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
