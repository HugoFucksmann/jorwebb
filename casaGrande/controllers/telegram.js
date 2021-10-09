const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const chatid = process.env.CHAT_ID;
const sendMsj = async (req, res) => {
	const data = req.body;

	try {
		await bot.telegram.sendMessage(
			chatid,
			`Nombre: ${data.nombre} \n cel: ${data.telefono} \n Msj: ${data.msj}`
		);

		res.json({
			ok: true,
			msj: 'mensaje enviado con exito',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			ok: false,
			msg: 'error al enviar el mensaje',
		});
	}
};

module.exports = {
	sendMsj,
};
