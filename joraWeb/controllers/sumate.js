const fetch = require("node-fetch");
const { Sumate } = require("../../database/joraWebConnection");

const getSumate = async (req, res) => {
  const sumate = await Sumate.find();
  res.json({
    ok: true,
    sumate,
  });
};

const crearSumate = async (req, res) => {
  const token = req.body.token;
  try {
    const verify = await verifyRecaptcha(token);

    if (!verify)
      return res.status(501).json({
        ok: false,
        msj: "ocurrio un error al verificar token :(",
      });

    const sumate = new Sumate({
      ...req.body.sumate,
    });

    const sumateDB = await sumate.save();

    res.json({
      ok: true,
      sumate: sumateDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error inesperado, hable con el administrador",
    });
  }
};

const actualizarSumate = async (req, res) => {
  const sumateId = req.params.id;

  try {
    const sumateDB = await Sumate.findById(sumateId);
    if (!sumateDB) {
      return res.status(404).json({
        ok: false,
        msg: "Proyecyo no encontrada",
      });
    }
    const cambiosSumate = {
      ...req.body,
    };

    const sumateActualizado = await Sumate.findByIdAndUpdate(sumateId, cambiosSumate, {
      new: true,
    });

    res.json({
      ok: true,
      sumate: sumateActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error hable con el admin",
    });
  }
};

const eliminarSumate = async (req, res) => {
  const sumateId = req.params.id;

  try {
    const sumateDB = await Sumate.findById(sumateId);

    if (!sumateDB) {
      return res.status(404).json({
        ok: false,
        msg: "persona no encontrada",
      });
    }

    await Sumate.findByIdAndDelete(sumateId);

    res.json({
      ok: true,
      msg: "persona eliminada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error hable con el admin",
    });
  }
};

const verifyRecaptcha = async (token) => {
  // Validate Human
  const isHuman = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    body: `secret=${process.env.RECAPTCHAKEY}&response=${token}`,
  })
    .then((res) => res.json())
    .then((json) => json.success)
    .catch((err) => {
      throw new Error(`Error in Google Siteverify API. ${err.message}`);
    });

  return isHuman;
};

module.exports = {
  crearSumate,
  getSumate,
};
