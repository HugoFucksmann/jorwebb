const fetch = require("node-fetch");
const { Mascota, Usuario } = require("../../database/busCanConnection");
const AWS = require("aws-sdk");
const { conectDrive, uploadFile, generatePublicUrl } = require("../../helpers/google-drive");

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function distKM(A, B) {
  const R = 6371;
  let aLat = parseFloat(A.location.latitude);
  let aLon = parseFloat(A.location.longitude);
  let bLat = parseFloat(B.location.latitude);
  let bLon = parseFloat(B.location.longitude);

  var dLat = 2 * R * Math.sin(deg2rad(aLat - bLat) / 2);
  var dLon = 2 * R * Math.sin(deg2rad(aLon - bLon) / 2);
  var dist = Math.sqrt(dLat ** 2 + dLon ** 2);

  return dist;
}

const getMascota2 = async (req, res) => {
  let mascotas = await Mascota.find();

  try {
    if (mascotas.length === 0) {
      mascotas = false;
      res.json({
        ok: false,
        mascotas,
      });
    } else {
      res.json({
        ok: true,
        mascotas,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "error hable con el admin",
    });
  }
};

const getMascota = async (req, res) => {
  const id = req.params.idUser;

  let mascotas = await Mascota.find();
  const usuario = await Usuario.findById(id);

  try {
    if (mascotas.length === 0) mascotas = false;
    else
      await mascotas.sort((a, b) => {
        let dist2a = distKM(usuario, a);
        let dist2b = distKM(usuario, b);

        return dist2a - dist2b;
      });

    res.json({
      ok: true,
      mascotas,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "error hable con el admin",
    });
  }
};

const getMiMascota = async (req, res = response) => {
  const uid = req.params.id;

  const miMascota = await Mascota.findOne({ uid });

  try {
    res.json({
      ok: true,
      miMascota,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msj: "no tienes mascota perdida",
    });
  }
};

const crearMascota = async (req, res = response) => {
  let messages = [];
  const uid = req.body.uid; // se extrae del middleware validarToken
  const mascota = new Mascota({
    usuario: uid,
    notification: req.body.notification,
    ...req.body.perro,
  });

  try {
    const mascotaDB = await mascota.save();
    const usuarios = await Usuario.find();

    usuarios.map((usuario) => {
      let distancia = distKM(usuario, mascotaDB);

      if (usuario._id !== uid && distancia < 6) {
        messages.push({
          to: usuario.notification,
          sound: "default",
          title: "se perdio una mascota !!",
          body: "entra a ver para estar atento",
        });
      }
    });

    /* 	await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(messages),
		}); */

    res.json({
      ok: true,
      mascota: mascotaDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error inesperado, hable con el administrador",
    });
  }
};

const crearMascotaf = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msj: "no hay ningun archivo subido",
    });
  }

  const file = req.files.imgMascota;
  const fileData = await comprimirImg(file.data);

  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];
  const extensionesValidas = ["png", "jpg", "jpeg"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msj: "No es una extension valida, usa .png .jpg o .jpeg",
    });
  }
  const mid = req.body.perro.name;
  const fileName = `${mid + "." + extensionArchivo}`;
  const drive = conectDrive();
  const result = await uploadFile(fileName, fileData, extensionArchivo);

  if (!result) {
    return res.status(400).json({
      ok: false,
      msj: "error al cargar imagen",
    });
  }

  const url = await generatePublicUrl(drive, result.id);

  let messages = [];
  const uid = req.body.uid; // se extrae del middleware validarToken

  const mascota = new Mascota({
    usuario: uid,
    notification: req.body.notification,
    petPicture: url.webContentLink,
    ...req.body.perro,
  });

  try {
    const mascotaDB = await mascota.save();
    const usuarios = await Usuario.find();

    usuarios.map((usuario) => {
      let distancia = distKM(usuario, mascotaDB);

      if (usuario._id !== uid && distancia < 3) {
        messages.push({
          to: usuario.notification,
          sound: "default",
          title: "se perdio una mascota !!",
          body: "entra a ver para estar atento",
        });
      }
    });

    /* 	await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(messages),
		}); */

    res.json({
      ok: true,
      mascota: mascotaDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error inesperado, hable con el administrador",
    });
  }
};

const actualizarMascota = async (req, res = response) => {
  const mascotaId = req.params.id;

  const { dist, ...newM } = req.body;

  try {
    const mascotaDB = await Mascota.findById(mascotaId);

    if (!mascotaDB) {
      return res.status(404).json({
        ok: false,
        msg: "mascota no encontrada",
      });
    }

    const cambiosmascota = {
      ...newM,
    };

    const mascotaActualizado = await Mascota.findByIdAndUpdate(mascotaId, cambiosmascota, {
      new: true,
    });

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

const recargarMascota = async (req, res = response) => {
  const { mid } = req.params;

  try {
    const mascotaDB = await Mascota.findById(mid);

    if (!mascotaDB) {
      return res.status(404).json({
        ok: false,
        msg: "mascota no encontrada",
      });
    }

    const reports = {
      count: 0,
      userId: [],
    };

    const mascotaActualizado = await Mascota.findByIdAndUpdate(
      mid,
      { report: reports },
      { new: true }
    );

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

const borrarMascota = async (req, res = response) => {
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

    await s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
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
};

const getUserMascota = async (req, res) => {
  const userId = req.params.uidm;
  try {
    const usuario = await Usuario.findById(userId);

    if (usuario) {
      res.json({
        ok: true,
        userNoti: usuario.notification,
      });
    } else {
      res.status(400).json({
        ok: false,
        msj: "no hay usuario",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msj: "error ups",
    });
  }
};

const addReport = async (req, res) => {
  const { uid, mid } = req.body;

  try {
    const mascotaDB = await Mascota.findById(mid);

    if (!mascotaDB) {
      return res.status(404).json({
        ok: false,
        msg: "mascota no encontrado",
      });
    }

    let count = mascotaDB.report.count;
    let reporters = mascotaDB.report.userId;
    let valid = true;

    reporters.map((ids) => {
      if (ids === uid) valid = false;
    });

    if (valid === false)
      return res.json({
        ok: false,
        msg: "ya reportaste esta publicacion",
      });

    reporters.push(uid);
    count++;

    let newM = {
      report: {
        count: count,
        userId: reporters,
      },
    };

    await Mascota.findByIdAndUpdate(mid, newM, {
      new: true,
    });

    res.json({
      ok: true,
      msg: "ya se notifico tu reporte, gracais por realizarlo !!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error hsble con el admin",
    });
  }
};

const expireDelete = async (pets) => {
  const expire = pets.filter((pet) => pet.expire <= Date.now());
  if (expire.length > 0) expire.map((pet) => deleteExpirePet(pet));
};

const deleteExpirePet = (pet) => {};

module.exports = {
  getMascota,
  crearMascota,
  crearMascotaf,
  actualizarMascota,
  borrarMascota,
  getMiMascota,
  getMascota2,
  addReport,
  recargarMascota,
};
