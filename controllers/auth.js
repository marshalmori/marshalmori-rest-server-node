const { response, json } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario e/ou senha não estão corretos - correo",
      });
    }

    // Si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario e/ou senha não estão corretos - estado: false",
      });
    }
    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario e/ou senha não estão corretos - password",
      });
    }
    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Fale com o administrador do sistema.",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true,
      };

      usuario = new Usuario(data);

      await usuario.save();
    }

    //Se o usuário está cadastrado e está com estado: false
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Por favor entre em contato com o administrador.",
      });
    }

    // Gerar o JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Não foi possível verificar o token.",
    });
  }
};

module.exports = { login, googleSignIn };
