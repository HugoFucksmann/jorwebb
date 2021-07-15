const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  // Leer el token
  const token = req.header("token");
  if (!token) {
    return res.status(400).json({
      ok: false,
      msg: "no se encontro token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    //req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
