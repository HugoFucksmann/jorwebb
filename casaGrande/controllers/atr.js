const { UsersAtr } = require('../../database/mgConnection');
const fs = require('fs');

const borrarImagen = (path) => {
	if (fs.existsSync(path)) {
		//borrar la img anterior
		fs.unlinkSync(path);
	}
};

const getUsersAtr = async (req, res) => {
	try {
		const userAtr = await UsersAtr.find();
		const total = await UsersAtr.countDocuments();

		res.json({
			ok: true,
			usuario: userAtr,
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

const crearUserAtr = async (req, res) => {
	const userAtr = new UsersAtr({
		...req.body,
	});

	try {
		const userAtrDB = await userAtr.save();

		res.json({
			ok: true,
			msj: 'persona cargada con exito',
			userAtr: userAtrDB,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msj: 'error al realizar inscripcion',
		});
	}
};

const editarUserAtr = async (req, res) => {
	const id = req.body._id;
	const newUserAtr = new UsersAtr({
		...req.body,
	});
	try {
		const userAtr = await UsersAtr.findByIdAndUpdate(id, newUserAtr, {
			new: true,
		});

		res.json({
			ok: true,
			persona: userAtr,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msj: 'error ',
		});
	}
};

const searchUsersAtr = async (req, res) => {
	const filtro = req.params.filtro;
	const busqueda = req.params.busqueda;
	try {
		const usersAtr = await UsersAtr.find();
		const regex = new RegExp(busqueda, 'i');
		const result = usersAtr.filter((user) => user[`${filtro}`] === regex);
		if (result.length < 1) {
			res.json({
				ok: false,
				msj: 'no hay coincidencia',
			});
		} else {
			res.json({
				ok: true,
				usersAtr: result,
				total: result.length,
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

const borrarUserAtr2 = async (req, res) => {
	const userAtrId = req.params.id;
	const s3 = new AWS.S3();
	try {
		const userAtrDB = await UsersAtr.findById(userAtrId);
		if (!userAtrDB) {
			return res.status(404).json({
				ok: false,
				msg: 'usuario no encontrado',
			});
		}
		const params = {
			Bucket: 'buscan',
			Key: userAtrDB.fotoDni.slice(42),
		};

		await s3.deleteObject(params, function (err, data) {
			if (err) console.log(err, err.stack);
			// an error occurred
			else console.log(data); // successful response
		});

		await UsersAtr.findByIdAndDelete(userAtrId);

		res.json({
			ok: true,
			msg: 'persona eliminada',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error hsble con el admin',
		});
	}
};

const borrarUserAtr = async (req, res) => {
	let id = req.params.id;

	try {
		await UsersAtr.findByIdAndDelete(id);

		res.json({
			ok: true,
			msj: 'eliminado con exito',
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: false,
			msj: 'errror',
		});
	}
};

module.exports = {
	crearUserAtr,
	getUsersAtr,
	searchUsersAtr,
	editarUserAtr,
	borrarUserAtr,
};
