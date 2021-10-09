const { response } = require('express');
const bcrypt = require('bcryptjs');

const { Usuario } = require('../../database/busCanConnection');
const { generarJWT } = require('../../helpers/jwt');

const getUsuarios = async (req, res) => {
	const notification = req.body.uid;

	try {
		const existeUsu = await Usuario.findOne({ notification });

		if (existeUsu) {
			return res.json({
				ok: true,
				usuario: existeUsu,
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			ok: false,
			msg: 'El usuario ya esta registrado',
		});
	}

	/* const desde = Number(req.query.desde) || 0;

  const [usuarios, total] = await Promise.all([
    Usuario.find({}, "nombre email telefono google img").skip(desde).limit(5),

    Usuario.countDocuments(),
  ]);

  res.json({
    ok: true,
    usuarios,
    total,
    
  }); */
};

const getAllNotificationTokens = async (req, res = response) => {
	try {
		const usuarios = await Usuario.find();
		const tokens = usuarios.map((mascota) => mascota.notification);
		console.log('gg');
		res.json({
			ok: true,
			tokens,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: false,
			msj: 'error :(',
		});
	}
};

const crearUsuario = async (req, res = response) => {
	const notification = req.body.notificationToken;
	
	try {
		const existeUsu = await Usuario.findOne({ notification });

		if (existeUsu) {
			return res.json({
				ok: true,
				user: existeUsu,
			});
		}

		const user = new Usuario({
			name: `usuario ${Math.random()}`, //todo: ver round y metodo
			img: '',
			google: false,
			notification: notification,
		});

		//* guarda usuario
		await user.save();

		//Generar TOKEN - JWT
		//const token = await generarJWT(usuario.id);

		res.json({
			ok: true,
			user,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado...',
		});
	}
};

const ActualizarNotificationToken = async (req, res = response) => {
	const uid = req.body.uid;
	const newtoken = req.body.newtoken;

	try {
		const usuarioDB = await Usuario.findById(uid);
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un usuario para ese id',
			});
		}

		const usuarioActualizado = await Usuario.findByIdAndUpdate(
			uid,
			{ notification: newtoken },
			{
				new: true,
			}
		);

		res.json({
			ok: true,
			usuario: usuarioActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperadoo',
		});
	}
};

const borrarUsuario = async (req, res = response) => {
	const uid = req.params.id;

	try {
		const usuarioDB = await Usuario.findById(uid);

		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un usuario para ese id',
			});
		}

		await Usuario.findByIdAndDelete(uid);

		res.json({
			ok: true,
			msg: 'usuario borrado',
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			ok: false,
			msg: 'error al elimiar usuario',
		});
	}
};

const actLocation = async (req, res) => {
	const ubi = req.body.ubi;
	const user = req.body.user;

	try {
		let usuarioDB = await Usuario.findById(user._id);

		if (!usuarioDB) {
			res.status(404).json({
				ok: false,
				msg: 'No existe un usuario para ese id',
			});
		}
		usuarioDB.location = ubi;
		//const usuario = { ...usuarioDB, location: ubi };

		const usuarioActualizado = await Usuario.findByIdAndUpdate(
			usuarioDB._id,
			usuarioDB,
			{
				new: true,
			}
		);

		res.json({
			ok: true,
			usuario: usuarioActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: false,
			msg: 'error !!!',
		});
	}

	return;
};

module.exports = {
	getUsuarios,
	crearUsuario,
	borrarUsuario,
	getAllNotificationTokens,
	actLocation,
	ActualizarNotificationToken,
};
