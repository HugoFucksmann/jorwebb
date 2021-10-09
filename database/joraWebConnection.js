const mongoose = require("mongoose");

const conn = mongoose.createConnection(process.env.BD_CNN_JORAWEB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  //useFindAndModify: false,
});
const Prensa = conn.model("Prensa", require("../joraWeb/models/prensa"));
const Proyecto = conn.model("Proyecto", require("../joraWeb/models/proyecto"));
const Sumate = conn.model("Sumate", require("../joraWeb/models/sumate"));
const Usuario = conn.model("Usuario", require("../joraWeb/models/usuario"));

module.exports = {
  Usuario,
  Sumate,
  Proyecto,
  Prensa,
};
