const { MercadoPago } = require("../../helpers/mercadoPagoConfig");

const buildCompra = async (req, res) => {
  let taller = req.params.taller;

  let link = await MercadoPago(taller);

  try {
    res.json({
      ok: true,
      link,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "error al enviar el mensaje",
    });
  }
};

module.exports = {
  buildCompra,
};
