const { Schema, model } = require('mongoose');

const TalleresSchema = Schema(
	{
		nombre: {
			type: String,
			requered: true,
		},
		tallerista: {
			type: String,
			required: true,
		},
		horario: {
			type: Array,
		},
		contacto: {
			type: String,
			required: true,
		},
		img: {
			type: String,
		},
	},
	{ collection: 'talleres' }
);

TalleresSchema.method('toJSON', function () {
	const { __v, ...Object } = this.toObject();

	return Object;
});

module.exports = TalleresSchema;
