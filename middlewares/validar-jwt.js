const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "Não ha token na requisição.",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "O token não é válido - usuário não existe no DB",
      });
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "O token não é válido - usuário com estado=false.",
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      msg: "O token não é válido.",
    });
  }
};

module.exports = {
  validarJWT,
};
