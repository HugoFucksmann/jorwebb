const { Schema } = require('mongoose');

const UsersAtrSchema = Schema(
	{
		proyecto: {
			type: String,
			default: '',
		},
		tematica: {
			type: String,
			default: '',
		},
		nombre: {
			type: String,
			default: '',
		},
		apellido: {
			type: String,
			default: '',
		},
		sexo: {
			type: String,
			default: '',
		},

		dni: {
			type: String,
			default: '',
		},
		edad: {
			type: String,
			default: '',
		},
		fechaNacimiento: {
			type: String,
			default: '',
		},
		telefono: {
			type: String,
			default: '342',
		},
		mail: {
			type: String,
			default: '',
		},
		calle: {
			type: String,
			default: '',
		},
		numeroCalle: {
			type: String,
			default: '',
		},
		departamento: {
			type: String,
			default: '',
		},
		cp: {
			type: String,
			default: '',
		},
		barrio: {
			type: String,
			default: '',
		},
		nacionalidad: {
			type: String,
			default: 'Argentina',
		},
		usuarioCarga: {
			type: String,
		},
		fotoDni: {
			type: String,
			default: '',
		},
	},
	{ collection: 'usersAtr' }
);

UsersAtrSchema.method('toJSON', function () {
	const { __v, ...Object } = this.toObject();

	return Object;
});

module.exports = UsersAtrSchema;
