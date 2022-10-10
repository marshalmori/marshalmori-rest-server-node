const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  rol: {
    type: String,
    required: [true, "A função é obrigatória"],
  },
});

module.exports = model("Role", RoleSchema);
