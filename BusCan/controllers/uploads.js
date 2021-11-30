const fs = require("fs");
const path = require("path");
const { comprimirImg } = require("../../helpers/compresorImg");
const { MascotaAdop, Mascota } = require("../../database/busCanConnection");
const { uploadFile, generatePublicUrl, conect } = require("../../helpers/google-drive");

const retornaImagen = (req, res = response) => {
  const tipo = req.params.tipo;
  const nombre = req.params.nombre;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${nombre}`);

  //imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.png`);

    res.sendFile(pathImg);
  }
};

const driveUpload = async (req, res) => {
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
  const mid = req.params.mid;
  const fileName = `${mid + "." + extensionArchivo}`;

  const drive = await conect();

  const result = await uploadFile(drive, fileName, fileData, `image/${extensionArchivo}`);

  if (!result) {
    return res.status(400).json({
      ok: false,
      msj: "error al cargar imagen",
    });
  }

  const url = await generatePublicUrl(drive, result.id);

  const mascotaF = await actualizarImageBD(mid, url.webContentLink);

  res.json({
    ok: true,
    result: mascotaF,
  });
};

const actualizarImageBD = async (idm, urlDrive, tipo = "perdidos") => {
  let mascota;

  try {
    if (tipo === "adop") {
      mascota = await MascotaAdop.findById(idm);
    } else mascota = await Mascota.findById(idm);

    mascota.petPicture = urlDrive;
    await mascota.save();
    return mascota;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  retornaImagen,
  driveUpload,
};
