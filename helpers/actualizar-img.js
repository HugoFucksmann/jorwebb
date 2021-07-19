const fs = require('fs');
const Prensa = require('../models/prensa');

actualizarBucketImage = async (id, urlBucket, tipo) => {
	console.log(id);
	console.log('la url ', urlBucket);
	try {
		noticia = await Prensa.findById(id);
		console.log('nota db ', noticia);
		noticia.img = urlBucket;
		await noticia.save();
		return noticia;
	} catch (error) {
		console.log(error);
		return false;
	}
};

module.exports = {
	actualizarBucketImage,
};
