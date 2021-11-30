const mongoose = require("mongoose");

const conn = mongoose.createConnection(process.env.BD_CNN_ATRFORM, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  //useFindAndModify: false,
});
const Usuario = conn.model("Usuario", require("../atrForm/models/usuario"));

module.exports = {
  Usuario,
};
