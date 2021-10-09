const { Talleres, UserTaller } = require('../../database/mgConnection');

const fs = require('fs');

const borrarImagen = (path) => {
	if (fs.existsSync(path)) {
		//borrar la img anterior
		fs.unlinkSync(path);
	}
};

const getUserTalleres = async (req, res) => {
	try {
		const userTalleres = await UserTaller.find();
		//const total = await UserTaller.countDocuments();

		res.json({
			ok: true,
			userTalleres,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: false,
			msj: 'error al obtener talleres',
		});
	}
};

const getTalleres = async (req, res) => {
	try {
		const talleres = await Talleres.find();

		const total = await Talleres.countDocuments();

		res.json({
			ok: true,
			talleres,
			total,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: false,
			msj: 'error al obtener talleres',
		});
	}
};

const getUserPorTaller = async (req, res) => {
	const taller = req.params.taller;
	let userPorTaller;
	try {
		const userTalleres = await UserTaller.find();
		//const total = await UserTaller.countDocuments();
		if (taller === 'todos') userPorTaller = userTalleres;
		else userPorTaller = userTalleres.filter((user) => user.taller === taller);

		if (userPorTaller.length < 1) {
			res.json({
				ok: false,
				talleres: userPorTaller,
				total: userPorTaller.length,
			});
		} else {
			res.json({
				ok: true,
				talleres: userPorTaller,
				total: userPorTaller.length,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: false,
			msj: 'error al obtener talleres',
		});
	}
};

const crearTaller = async (req, res) => {
	const userTaller = new UserTaller({
		...req.body,
	});

	try {
		const userTallerDB = await userTaller.save();

		res.json({
			ok: true,
			msj: 'inscipcion realizada con exito',
			userTaller: userTallerDB,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msj: 'error al realizar inscripcion',
		});
	}
};

const searchAll = async (req, res) => {
	let obj = {};
	const filtro = req.params.filtro;
	const busqueda = req.params.busqueda;
	const regex = new RegExp(busqueda, 'i');
	obj[filtro] = regex;

	try {
		let resultado = await UserTaller.find(obj);

		res.json({
			ok: true,
			resultado: resultado,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: false,
			msj: 'ocurrio un error al buscar!',
		});
	}
};

const eliminarInscriptoTaller = async (req, res) => {
	const idInsc = req.params.id;

	try {
		await UserTaller.findByIdAndDelete(idInsc);
		res.json({
			ok: true,
			msj: 'se elimino correctamente',
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msj: 'ocurrio un error',
		});
	}
};

module.exports = {
	crearTaller,
	getUserTalleres,
	getTalleres,
	getUserPorTaller,
	searchAll,
	eliminarInscriptoTaller,
};
