const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "Este email não é válido.").isEmail(),
    check("password", "A senha é obrigatória").not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
