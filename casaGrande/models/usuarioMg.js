const { Schema } = require('mongoose');

const UsuarioSchema = Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		nombre: {
			type: String,
		},
		admin: {
			type: Boolean,
			default: false,
		},
	},
	{ collection: 'usuarios' }
);

UsuarioSchema.method('toJSON', function () {
	const { __v, _id, password, ...Object } = this.toObject();

	Object.uid = _id;
	return Object;
});
module.exports = UsuarioSchema;
