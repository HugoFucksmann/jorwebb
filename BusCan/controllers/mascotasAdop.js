const { Telegraf } = require("telegraf");
const { MascotaAdop, Usuario } = require("../../database/busCanConnection");

const { sendEmail } = require("./sendMail");

const bot = new Telegraf(process.env.BOT_BUSCAN_TOKEN);
const chatid = process.env.CHAT_BUSCAN_ID;

const getMascotaAdop = async (req, res) => {
  try {
    let mascotasAdop = await MascotaAdop.find();

    res.json({
      ok: true,
      mascotasAdop: mascotasAdop,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "error hable con el admin",
    });
  }
};

const crearMascotaAdop = async (req, res = response) => {
  try {
    const mascota = new MascotaAdop({
      ...req.body,
    });

    const mascotaDB = await mascota.save();

    res.json({
      ok: true,
      mascotaAdop: mascotaDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error inesperado, hable con el administrador",
    });
  }
};

const actualizarMascotaAdop = async (req, res = response) => {
  const mascotaId = req.params.id;

  const newM = req.body;

  try {
    const mascotaDB = await MascotaAdop.findById(mascotaId);

    if (!mascotaDB) {
      return res.status(404).json({
        ok: false,
        msg: "mascota no encontrado",
      });
    }

    const mascotaActualizado = await Mascota.findByIdAndUpdate(mascotaId, newM, { new: true });

    res.json({
      ok: true,
      mascota: mascotaActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error hsble con el admin",
    });
  }
};

/* const borrarMascotaAdop = async (req, res = response) => {
  const mascotaId = req.params.id;
  const s3 = new AWS.S3();
  try {
    const mascotaDB = await Mascota.findById(mascotaId);
    if (!mascotaDB) {
      return res.status(404).json({
        ok: false,
        msg: "mascota no encontrado",
      });
    }
    const params = {
      Bucket: "buscan",
      Key: mascotaDB.petPicture.slice(42),
    };

    await s3.deleteObject(params, (err, data) => {
      if (data) console.log(data);
      else console.log(err);
    });
    await s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
    });

    await Mascota.findByIdAndDelete(mascotaId);

    res.json({
      ok: true,
      msg: "mascota eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error hsble con el admin",
    });
  }
}; */

const adoptar = async (req, res) => {
  const { mid, uid } = req.params;

  try {
    const mascotaAdop = MascotaAdop.findById(mid);

    if (!mascotaAdop) {
      return res.status(400).json({
        ok: false,
        msj: "no hay mascota con ese id :(",
      });
    }

    const newUser = await Usuario.findByIdAndUpdate(uid, { adopAuth: true }, { new: true });

    const mascotaActualizado = await MascotaAdop.findByIdAndUpdate(
      mid,
      { estado: false, usuario: newUser },
      {
        new: true,
      }
    );

    sendEmail(newUser, mascotaActualizado);
    /* await bot.telegram.sendMessage(
			chatid,
			`nombre: ${newUser.name} \n mail: ${newUser.mail} \n mascota: ${mascotaActualizado.nombre} `
		); */

    res.json({
      ok: true,
      msj: "mensaje enviado con exito",
    });

    res.json({
      ok: true,
      msj: "Felicitaciones !! ya notificamos a la institucion, estate atento al correo !!",
      mascota: mascotaActualizado,
      usuario: newUser,
    });
  } catch (error) {
    console.log(e);
    return res.status(400).json({
      ok: false,
      msj: "error :(",
    });
  }
};

module.exports = {
  crearMascotaAdop,
  actualizarMascotaAdop,
  getMascotaAdop,
  adoptar,
};
