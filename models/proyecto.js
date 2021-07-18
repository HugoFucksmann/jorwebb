const { Schema, model } = require('mongoose');

const getFecha = () => {
	return new Date();
};

const proyectoSchema = Schema(
	{
		type: {
			type: String,
			require: true,
		},
		title: {
			type: String,
			required: true,
		},
		subtitle: {
			type: String,
		},
		text: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			default: '',
		},
		date: {
			type: Date,
			default: getFecha(),
			required: true,
		},
		usuarioCarga: {
			type: String,
		},
	},
	{ collection: 'proyectos' }
);
proyectoSchema.ensureIndexes;

proyectoSchema.method('toJSON', function () {
	const { __v, expire, ...Object } = this.toObject();

	return Object;
});
module.exports = model('Proyecto', proyectoSchema);
