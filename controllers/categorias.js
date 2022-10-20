const { response, request } = require("express");

const Categoria = require("../models/categoria");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    categorias,
  });
};

// obtenerCategoria - populate {}
const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id);

  // if (!categoria) {
  //   return res.status(400).json({
  //     msg: "Não existe categoria para este ID.",
  //   });
  // }

  res.json(categoria);
};

// Criar categoria
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

// actualizarCategoria

// borrarCategoria  - estado:false

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
};
