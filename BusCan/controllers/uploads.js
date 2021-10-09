const fs = require("fs");
const path = require("path");
const aws = require("aws-sdk");
const { comprimirImg } = require("../../helpers/compresorImg");
const { MascotaAdop, Mascota } = require("../../database/busCanConnection");
const S3_BUCKET = process.env.S3_BUCKET_BUSCAN;
aws.config.update({ region: "us-east-2" });

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

const createBucket = async (req, res) => {
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

  const s3 = new aws.S3();
  const fileName = `${req.params.mid + "." + extensionArchivo}`;
  const uploadParams = { Bucket: "buscan", Key: fileName, Body: fileData };
  s3.upload(uploadParams, async function (err, data) {
    if (err) {
      console.log("Error", err);
      res.status(400).json({
        ok: false,
        msj: "error al cargar bucket",
      });
    }
    if (data) {
      let result = await actualizarBucketImage(req.params.mid, data.Location, req.params.tipo);

      if (result) {
        res.json({
          ok: true,
          mascota: result,
          msj: "mascota creada con exito",
        });
      }
    }
  });
};

actualizarBucketImage = async (idm, urlBucket, tipo) => {
  let mascota;
  try {
    if (tipo === "adop") {
      mascota = await MascotaAdop.findById(idm);
    } else mascota = await Mascota.findById(idm);

    mascota.petPicture = urlBucket;
    await mascota.save();
    return mascota;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const readBucket = (req, res) => {
  const fileName = req.params.mid;

  const s3 = new aws.S3();
  s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 3500,
    ContentType: `image/jpeg`,
    ACL: "public-read",
  };
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }

    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
};

module.exports = {
  //fileUploads,
  retornaImagen,
  readBucket,
  createBucket,
};
