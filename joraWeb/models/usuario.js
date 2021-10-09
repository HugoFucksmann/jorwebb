const { Schema } = require("mongoose");

const UsuarioSchema = Schema(
  {
    usuario: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "usuarios" }
);

UsuarioSchema.method("toJSON", function () {
  const { __v, _id, password, ...Object } = this.toObject();

  Object.uid = _id;
  return Object;
});

module.exports = UsuarioSchema;
