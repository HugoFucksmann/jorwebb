const { Schema, model } = require('mongoose');

const getFecha = () => {
	return new Date();
};

const sumateSchema = Schema(
	{
		nombre: {
			type: String,
			require: true,
		},
		apellido: {
			type: String,
			required: true,
		},
		dni: {
			type: String,
		},
		tel: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			require: true,
		},
		ayuda: {
			type: String,
			require: true,
		},
		date: {
			type: Date,
			default: getFecha(),
		},
	},
	{ collection: 'sumate' }
);
sumateSchema.ensureIndexes;

sumateSchema.method('toJSON', function () {
	const { __v, expire, ...Object } = this.toObject();

	return Object;
});
module.exports = model('Sumate', sumateSchema);
