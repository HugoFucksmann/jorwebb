const aws = require('aws-sdk');
const { comprimirImg } = require('../../helpers/compresorImg');
const { Prensa } = require('../../database/joraWebConnection');
const S3_BUCKET = process.env.S3_BUCKET_JOR;
aws.config.update({ region: 'us-east-2' });

const createBucket = async (req, res) => {
	console.log('joraaaaaa');
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			ok: false,
			msg: 'no hay ningun archivo subido',
		});
	}
	const file = req.files.imagen;
	const fileData = await comprimirImg(file.data);
	const nombreCortado = file.name.split('.');
	const extensionArchivo = nombreCortado[nombreCortado.length - 1];
	const extensionesValidas = ['png', 'jpg', 'jpeg'];
	if (!extensionesValidas.includes(extensionArchivo)) {
		return res.status(400).json({
			ok: false,
			msg: 'No es una extension valida',
		});
	}

	const s3 = new aws.S3();

	const fileName = `${req.params.id + '.' + extensionArchivo}`;
	const uploadParams = {
		Bucket: 'jorweb',
		Key: fileName,
		Body: fileData,
	};
	s3.upload(uploadParams, async function (err, data) {
		console.log('en upload data: ', data);
		if (err) {
			console.log('Error', err);
			res.status(400).json({
				ok: false,
				msj: 'error al cargar bucket',
			});
		}
		if (data) {
			let result = await actualizarBucketImage(
				req.params.id,
				data.Location
			);
			if (result) {
				res.json({
					ok: true,
					noticia: result,
				});
			}
		}
	});
};

const readBucket = (req, res) => {
	const fileName = req.params.id;

	const s3 = new aws.S3();
	s3.listBuckets(function (err, data) {
		if (err) {
			console.log('Error', err);
		} else {
			console.log('Success', data.Buckets);
		}
	});
	const s3Params = {
		Bucket: S3_BUCKET,
		Key: fileName,
		Expires: 3500,
		ContentType: `image/jpeg`,
		ACL: 'public-read',
	};
	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.log(err);
			return res.end();
		}

		const returnData = {
			signedRequest: data,
			url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
		};
		res.write(JSON.stringify(returnData));
		res.end();
	});
};

actualizarBucketImage = async (id, urlBucket, tipo) => {
	try {
		noticia = await Prensa.findById(id);

		noticia.img = urlBucket;
		await noticia.save();
		return noticia;
	} catch (error) {
		console.log(error);
		return false;
	}
};

module.exports = {
	readBucket,
	createBucket,
};
