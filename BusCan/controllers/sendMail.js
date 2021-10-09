const nodemailer = require('nodemailer');

exports.sendEmail = function ({ usuario, mascota }) {
	console.log('datoos ', usuario, ' y ', mascota);
	// Definimos el transporter
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.MAIL_BUSCAN,
			pass: process.env.PASS_MAIL_BUSCAN,
		},
	});
	// Definimos el email
	var mailOptions = {
		from: process.env.MAIL_BUSCAN,
		to: 'hugoffuksmann@gmail.com', //mascota.mail,
		subject: 'Solicitud de adopcion',
		text: `usuario: ${usuario.name} /n email: ${usuario.email} /n mascota: ${mascota.name}`,
	};
	// Enviamos el email
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			return;
		} else {
			console.log('Email sent');
			return;
		}
	});
};
