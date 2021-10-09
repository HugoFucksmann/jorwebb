const mongoose = require("mongoose");

const conn = mongoose.createConnection(process.env.BD_CNN_MG, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  //useFindAndModify: false,
});
const Usuario = conn.model("Usuario", require("../casaGrande/models/usuarioMg"));
const Talleres = conn.model("Talleres", require("../casaGrande/models/talleres"));
const UserTaller = conn.model("UserTaller", require("../casaGrande/models/userTaller"));
const UsersAtr = conn.model("UsersAtr", require("../casaGrande/models/usersAtr"));
module.exports = {
  Usuario,
  Talleres,
  UserTaller,
  UsersAtr,
};
