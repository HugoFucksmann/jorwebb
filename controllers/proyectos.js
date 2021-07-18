const Proyecto = require('../models/proyecto');
const Usuario = require('../models/usuario');

const getProyectos = async (req, res) => {
	const proyecto = await Proyecto.find();
	res.json({
		ok: true,
		proyecto,
	});
};

const crearProyecto = async (req, res) => {
	const proyecto = new Proyecto({
		...req.body,
	});

	try {
		const proyectoDB = await proyecto.save();

		res.json({
			ok: true,
			proyecto: proyectoDB,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'error inesperado, hable con el administrador',
		});
	}
};

const actualizarProyecto = async (req, res) => {
	const proyectoId = req.params.id;

	try {
		const proyectoDB = await Proyecto.findById(proyectoId);
		if (!proyectoDB) {
			return res.status(404).json({
				ok: false,
				msg: 'Proyecyo no encontrada',
			});
		}
		const cambiosPRoyecto = {
			...req.body,
		};

		const proyectoActualizado = await Proyecto.findByIdAndUpdate(
			proyectoId,
			cambiosPRoyecto,
			{
				new: true,
			}
		);

		res.json({
			ok: true,
			proyecto: proyectoActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error hable con el admin',
		});
	}
};

const eliminarProyecto = async (req, res = response) => {
	const noticiaId = req.params.id;

	try {
		const noticiasDB = await Proyecto.findById(noticiaId);

		if (!noticiasDB) {
			return res.status(404).json({
				ok: false,
				msg: 'noticia no encontrada',
			});
		}

		await Proyecto.findByIdAndDelete(noticiaId);

		res.json({
			ok: true,
			msg: 'noticia eliminada',
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
	getProyectos,
	crearProyecto,
	actualizarProyecto,
	eliminarProyecto,
};
