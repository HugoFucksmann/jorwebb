const { getUserData, saveRoww } = require("../../helpers/google_sheet");
async function getDatosForm(req, res) {
  const { umail } = req.params;

  const [usuRow, header] = await getUserData(umail);

  if (usuRow.length === 1) {
    let obj = {};

    header.map((key, i) => {
      if (usuRow[0][key] !== undefined) {
        obj = { ...obj, [key]: usuRow[0][key] };
      }
    });

    return res.send({ ok: true, data: obj });
  }

  return res.status(400).json({
    ok: false,
    msg: "error al obtener datos",
  });
}

async function saveRow(req, res) {
  const datos = req.body;
  const { umail } = req.params;

  const result = await saveRoww(datos, umail);
  if (result) {
    return res.status(200).json({ ok: true, msg: "cargado con exito" });
  }

  return res.status(400).json({ ok: false, msg: "error al cargar" });
}

module.exports = {
  getDatosForm,
  saveRow,
};
