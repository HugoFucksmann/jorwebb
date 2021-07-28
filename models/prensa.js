const { Schema, model } = require('mongoose');

const getFecha = () => {
	return new Date();
};

const PrensaSchema = Schema(
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
		txtsub1: {
			type: String,
		},
		txtsub2: {
			type: String,
		},
		text: {
			type: String,
			required: true,
		},
		txtsub3: {
			type: String,
		},
		img: {
			type: String,
			default: '',
		},
		date: {
			type: Date,
			default: getFecha(),
		},
		color: {
			type: String,
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
