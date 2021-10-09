const { Schema } = require('mongoose');

const UsuarioSchema = Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			default: '',
		},
		password: {
			type: String,
		},
		img: {
			type: String,
			default: '',
		},
		adopAuth: {
			type: Boolean,
			default: false,
		},
		google: {
			type: Boolean,
			default: false,
		},
		notification: {
			type: String,
			unique: true,
		},
		location: {
			longitude: {
				type: Number,
				default: 0,
			},
			latitude: {
				type: Number,
				default: 0,
			},
		},
	},
	{ collection: 'usuarios' }
);

//para cambiar algun parametro, config global (ej: _id por id)
UsuarioSchema.method('toJSON', function () {
	const { __v, password, ...Object } = this.toObject();

	return Object;
});

module.exports = UsuarioSchema;
