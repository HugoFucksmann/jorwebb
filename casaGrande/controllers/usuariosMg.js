const bcrypt = require('bcryptjs');
const { Usuario } = require('../../database/mgConnection');
const { generarJWT } = require('../../helpers/jwt');

const crearUsuario = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existeEmail = await Usuario.findOne({ email });

		if (existeEmail) {
			return res.status(400).json({
				ok: false,
				msg: 'El correo ya esta registrado',
			});
		}

		const usuario = new Usuario(req.body);

		//* Encriptar contrasegna
		const salt = bcrypt.genSaltSync(10);
		usuario.password = bcrypt.hashSync(password, salt);

		await usuario.save();

		//Generar TOKEN - JWT
		const token = await generarJWT(usuario.id);

		res.json({
			ok: true,
			usuario,
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado...',
		});
	}
};

const getMyUsuario = async (req, res) => {
	const uid = req.uid;

	try {
		const myUser = Usuario.findById(uid);

		res.json({
			ok: true,
			miUsuario: myUser,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: false,
			msj: 'error al buscar usuario',
		});
	}
};

module.exports = {
	crearUsuario,
	getMyUsuario,
};
