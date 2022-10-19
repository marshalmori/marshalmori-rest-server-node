const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria } = require("../controllers/categorias");
const { validarJWT, validarCampos } = require("../middlewares");

const router = Router();

/*
 {{url}}/api/categorias
*/

router.get("/", (req, res) => {
  res.json("get - id");
});

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
