const Sumate = require('../models/sumate');

const getSumate = async (req, res) => {
	const sumate = await Sumate.find();
	res.json({
		ok: true,
		sumate,
	});
};

const crearSumate = async (req, res) => {
	console.log('crear sumate');

	try {
		const sumate = new Sumate({
			...req.body,
		});
		const sumateDB = await sumate.save();

		res.json({
			ok: true,
			sumate: sumateDB,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'error inesperado, hable con el administrador',
		});
	}
};

const actualizarSumate = async (req, res) => {
	const sumateId = req.params.id;

	try {
		const sumateDB = await Sumate.findById(sumateId);
		if (!sumateDB) {
			return res.status(404).json({
				ok: false,
				msg: 'Proyecyo no encontrada',
			});
		}
		const cambiosSumate = {
			...req.body,
		};

		const sumateActualizado = await Sumate.findByIdAndUpdate(
			sumateId,
			cambiosSumate,
			{
				new: true,
			}
		);

		res.json({
			ok: true,
			sumate: sumateActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error hable con el admin',
		});
	}
};

const eliminarSumate = async (req, res) => {
	const sumateId = req.params.id;

	try {
		const sumateDB = await Sumate.findById(sumateId);

		if (!sumateDB) {
			return res.status(404).json({
				ok: false,
				msg: 'persona no encontrada',
			});
		}

		await Sumate.findByIdAndDelete(sumateId);

		res.json({
			ok: true,
			msg: 'persona eliminada',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error hable con el admin',
		});
	}
};

module.exports = {
	getSumate,
	crearSumate,
	actualizarSumate,
	eliminarSumate,
};
