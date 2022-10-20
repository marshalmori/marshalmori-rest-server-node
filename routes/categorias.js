const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos } = require("../middlewares");

const { existeCategoriaPorId } = require("../helpers/db-validators");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
} = require("../controllers/categorias");

const router = Router();

/*
 {{url}}/api/categorias
*/

// Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// Obtener una categoria por id - publico
router.get("/:id", [existeCategoriaPorId], obtenerCategoria);

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
router.put("/:id", (req, res) => {
  res.json("put");
});

// Deletar uma categoria - Deve ser Admin
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
