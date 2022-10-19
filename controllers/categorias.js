const { response } = require("express");

const Categoria = require("../models/categoria");

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `A categoria ${categoriaDB.nombre} já existe.`,
    });
  }

  // Gerar e guardar os dados
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);
  await categoria.save();

  res.status(201).json(categoria);
};

module.exports = {
  crearCategoria,
};
