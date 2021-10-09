const { Schema } = require('mongoose');

const UserTallerSchema = Schema(
	{
		taller: {
			type: String,
			require: true,
		},
		nombre: {
			type: String,
			requered: true,
		},
		apellido: {
			type: String,
			required: true,
		},
		fotoDni: {
			type: String,
			default: '',
		},
		dni: {
			type: String,
			required: true,
		},
		edad: {
			type: String,
			required: true,
		},
		fechaNacimiento: {
			type: String,
		},
		telefono: {
			type: String,
			require: true,
		},
		calle: {
			type: String,
		},
		numeroCalle: {
			type: String,
		},
		ciudad: {
			type: String,
		},
	},
	{ collection: 'usertalleres' }
);

UserTallerSchema.method('toJSON', function () {
	const { __v, ...Object } = this.toObject();

	return Object;
});

module.exports = UserTallerSchema;
