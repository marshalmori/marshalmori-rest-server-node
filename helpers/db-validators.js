const Role = require("../models/role");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`A função ${rol} não está registrada no banco de dados.`);
  }
};

module.exports = { esRoleValido };
