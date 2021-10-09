const { Schema } = require('mongoose');

const MascotaAdopSchema = Schema(
	{
		nombre: {
			type: String,
		},
		petPicture: {
			type: String,
			default: '',
		},
		tamaño: {
			type: String,
		},
		sexo: {
			type: String,
		},
		animal: {
			type: String,
		},
		descripcion: {
			type: String,
		},
		edad: {
			type: String,
		},
		refugio: {
			type: String,
		},
		mail: {
			type: String,
		},
		estado: {
			type: Boolean,
			default: true,
		},
		usuario: { type: Schema.Types.ObjectId, ref: 'usuarios' },
	},
	{ collection: 'mascotasAdop' }
);

MascotaAdopSchema.method('toJSON', function () {
	const { __v, expire, ...Object } = this.toObject();

	return Object;
});

module.exports = MascotaAdopSchema;
