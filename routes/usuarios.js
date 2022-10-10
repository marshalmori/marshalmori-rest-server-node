const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, emailExiste } = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "O nome é obrigatório.").not().isEmpty(),
    check("password", "A senha deve ter 6 ou mais caracteres.").isLength({
      min: 6,
    }),
    check("correo", "Este email não é válido.").isEmail(),
    check("correo").custom(emailExiste),
    // check("rol", "Não é uma função válida.").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.put("/:id", usuariosPut);

router.patch("/", usuariosPatch);

router.delete("/", usuariosDelete);

module.exports = router;
