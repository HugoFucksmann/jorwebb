const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../../helpers/jwt");

const crearUsuario = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const existeusuario = await Usuario.findOne({ usuario });

    if (existeusuario) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya esta registrado",
      });
    }

    const newusuario = new Usuario(req.body);

    //* Encriptar contrasegna
    const salt = bcrypt.genSaltSync(10);
    newusuario.password = bcrypt.hashSync(password, salt);

    await newusuario.save();

    //Generar TOKEN - JWT
    const token = await generarJWT(newusuario.id);

    res.json({
      ok: true,
      msg: "usuario creado",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado...",
    });
  }
};

module.exports = {
  crearUsuario,
};
