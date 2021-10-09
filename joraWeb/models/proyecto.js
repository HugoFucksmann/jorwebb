const { Schema } = require("mongoose");

const proyectoSchema = Schema(
  {
    eje: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      require: true,
    },
  },
  { collection: "proyectos" }
);
proyectoSchema.ensureIndexes;

proyectoSchema.method("toJSON", function () {
  const { __v, expire, ...Object } = this.toObject();

  return Object;
});
module.exports = proyectoSchema;
