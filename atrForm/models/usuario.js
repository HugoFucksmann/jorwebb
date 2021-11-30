const { Schema } = require("mongoose");

const UsuarioSchema = Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
    },
    img: {
      type: String,
      default: "",
    },
  },
  { collection: "participantes" }
);

//para cambiar algun parametro, config global (ej: _id por id)
UsuarioSchema.method("toJSON", function () {
  const { __v, password, ...Object } = this.toObject();

  return Object;
});

module.exports = UsuarioSchema;
