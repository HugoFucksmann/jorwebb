const { Router } = require("express");

const {
  getVacunasDepartamento,
  getVacunasUltimoDia,
  getVacunasTotal,
} = require("../controllers/vacunas");

const router = Router();

router.get("/pordepartamento", getVacunasDepartamento);
router.get("/ultimodia", getVacunasUltimoDia);
router.get("/totales", getVacunasTotal);
module.exports = router;
