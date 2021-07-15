const Prensa = require("../models/prensa");

const getNoticias = async (req, res) => {
  const noticias = await Prensa.find();
  res.json({
    ok: true,
    noticias,
  });
};

const crearNoticia = async (req, res) => {
  const noticias = new Prensa({
    ...req.body,
  });

  try {
    const noticiaDB = await noticias.save();

    res.json({
      ok: true,
      noticia: noticiaDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error inesperado, hable con el administrador",
    });
  }
};

const actualizarNoticia = async (req, res) => {
  const noticiaId = req.params.id;

  try {
    const noticiaDB = await Prensa.findById(noticiaId);
    if (!noticiaDB) {
      return res.status(404).json({
        ok: false,
        msg: "Noticia no encontrada",
      });
    }
    const cambiosNoticia = {
      ...req.body,
    };

    const noticiaActualizada = await Prensa.findByIdAndUpdate(noticiaId, cambiosNoticia, {
      new: true,
    });

    res.json({
      ok: true,
      noticiaActualizada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error hable con el admin",
    });
  }
};

const eliminarNoticia = async (req, res = response) => {
  const noticiaId = req.params.id;

  try {
    const noticiasDB = await Prensa.findById(noticiaId);

    if (!noticiasDB) {
      return res.status(404).json({
        ok: false,
        msg: "noticia no encontrada",
      });
    }

    await Prensa.findByIdAndDelete(noticiaId);

    res.json({
      ok: true,
      msg: "noticia eliminada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error hable con el admin",
    });
  }
};

module.exports = {
  getNoticias,
  crearNoticia,
  actualizarNoticia,
  eliminarNoticia,
};
