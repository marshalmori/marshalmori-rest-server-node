const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

/*
 {{url}}/api/categorias
*/

router.get("/", (req, res) => {
  res.json("get - id");
});

// Crear categoria - privado - qualquer pessoa com um token válido.
router.post("/", (req, res) => {
  res.json("post");
});

// Atualizar - privado - qualquer com token válido
router.put("/:id", (req, res) => {
  res.json("put");
});

// Deletar uma categoria - Deve ser Admin
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
