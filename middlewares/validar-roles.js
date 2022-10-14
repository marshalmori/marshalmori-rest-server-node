const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Está verificando o Role antes de validar o token.",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} não é ADMIN.`,
    });
  }

  next();
};

module.exports = {
  esAdminRole,
};
