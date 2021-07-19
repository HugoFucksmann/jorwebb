const sharp = require('sharp');

function comprimirImg(imgFile) {
	return sharp(imgFile)
		.resize(760, 320)
		.toBuffer()
		.then((fichero) => {
			return fichero;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}

module.exports = {
	comprimirImg,
};
