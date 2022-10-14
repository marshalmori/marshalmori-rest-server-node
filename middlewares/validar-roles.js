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

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Está verificando o Role antes de validar o token.",
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `Este serviço requer um destes roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
