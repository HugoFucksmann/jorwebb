const fetch = require('node-fetch');
const { Usuario } = require('../../database/busCanConnection');

const mascotaChat = async (req, res) => {
	let tokens = req.body.chatTokens;
	const uId = req.body.uIdMascota;
	const mascota = req.body.mascota;
	try {
		const userMascota = await Usuario.findById(uId);
		tokens = [...tokens, userMascota.notification];
		finalNotification = tokens.filter((noti, index) => {
			return tokens.indexOf(noti) === index;
		});

		const messages = finalNotification.map((notification) => {
			return {
				to: notification,
				sound: 'default',
				title: 'enviaron un mensaje al chat !!',
				data: mascota,
			};
		});

		let lolo = await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(messages),
		}).then((res) => res.json());

		res.json({
			ok: true,
			msj: 'notificacion enviada',
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: false,
			msj: 'error al enviar noti',
		});
	}
};

const misChats = async (req, res) => {
	// const chats = req.body
};

module.exports = {
	mascotaChat,
	misChats,
};
