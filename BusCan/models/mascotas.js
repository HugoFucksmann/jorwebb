const { Schema } = require('mongoose');

const getFecha = () => {
	return new Date().getTime();
};

const MascotaSchema = Schema(
	{
		petName: {
			type: String,
		},
		report: {
			count: {
				type: Number,
				default: 0,
			},
			userId: {
				type: [String],
				default: [],
			},
		},
		notification: {
			type: String,
			required: true,
		},
		petPicture: {
			type: String,
		},
		petSize: {
			type: String,
		},
		petSex: {
			type: String,
		},
		petDescription: {
			type: String,
		},
		petType: {
			type: String,
		},
		location: {
			longitude: {
				type: Number,
			},
			latitude: {
				type: Number,
			},
		},
		usuario: {
			type: String,
			require: true,
		},
		date: {
			type: String,
			default: getFecha(),
			required: true,
		},
		expire: {
			type: Date,
			default: getFecha(),
			index: { expireAfterSeconds: 518400 },
		},
	},
	{ collection: 'mascotas' }
);
MascotaSchema.ensureIndexes;

MascotaSchema.method('toJSON', function () {
	const { __v, expire, ...Object } = this.toObject();

	return Object;
});

module.exports = MascotaSchema;
