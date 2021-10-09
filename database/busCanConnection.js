const mongoose = require("mongoose");

const conn = mongoose.createConnection(process.env.BD_CNN_BUSCAN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  //useFindAndModify: false,
});
const Usuario = conn.model("Usuario", require("../BusCan/models/usuario"));
const Mascota = conn.model("Mascota", require("../BusCan/models/mascotas"));
const MascotaAdop = conn.model("MascotaAdop", require("../BusCan/models/mascotaAdop"));

module.exports = {
  Usuario,
  Mascota,
  MascotaAdop,
};
