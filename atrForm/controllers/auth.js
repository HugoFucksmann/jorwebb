const { Usuario } = require("../../database/atrformConnection");
const { generarJWT } = require("../../helpers/jwt");
const { googleVerify } = require("../../helpers/googleVerify");

const googleSignIn2 = async (req, res) => {
  const googleToken = req.body.token;
  try {
    const { name, email, picture } = await googleVerify(googleToken);
    const userDB = await Usuario.findOne({ email: email });

    if (!userDB) {
      const usuario = new Usuario({
        name,
        img: picture,
        email,
      });
      await usuario.save();

      const token = await generarJWT(usuario._id);
      res.json({
        ok: true,
        usuario,
        token,
      });
    } else {
      const token = await generarJWT(userDB._id);
      res.status(401).json({
        ok: true,
        usuario: userDB,
        token,
      });
    }
  } catch (error) {
    res.status(401).json({
      ok: false,
      err: error,
      msj: "token no es correcto o...",
    });
  }
};

const renewToken = async (req, res) => {
  const _id = req.body.id;
  let userr;
  try {
    userr = await Usuario.findById(_id);

    if (!userr) {
      return res.status(400).json({
        ok: false,
        msg: "no existe usuario",
      });
    }
    const token = await generarJWT(_id);

    return res.json({
      ok: true,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      ok: false,
      msg: "error al generar retoken",
    });
  }
};

module.exports = {
  renewToken,
  googleSignIn2,
};
