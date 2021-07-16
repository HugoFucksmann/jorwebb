const { Schema, model } = require('mongoose');

const getFecha = () => {
	return new Date();
};

const PrensaSchema = Schema(
	{
		title: {
			type: String,
			required: true,
		},
		subTitle: {
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
		proyectType: {
			type: String,
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
	{ collection: 'prensa' }
);
PrensaSchema.ensureIndexes;

PrensaSchema.method('toJSON', function () {
	const { __v, expire, ...Object } = this.toObject();

	return Object;
});
module.exports = model('Prensa', PrensaSchema);
