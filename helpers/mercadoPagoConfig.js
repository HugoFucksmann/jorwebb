// SDK de Mercado Pago
const mercadopago = require('mercadopago');
mercadopago.configure({
	access_token: process.env.MERCADOPAGO_TOKEN_PRODUCTION,
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET,
	sandbox: true,
});

function MercadoPago(descTaller) {
	let preference = {
		items: [
			{
				title: `Taller: ${descTaller}`,
				quantity: 1,
				currency_id: 'ARS',
				unit_price: 100,
			},
		],
		payment_methods: {
			installments: 6,
		},
		back_urls: {
			success: 'https://casagrandecultura.com.ar/inscripcionesTalleres',
			failure: 'https://casagrandecultura.com.ar/inscripcionesTalleres',
			pending: 'https://casagrandecultura.com.ar/inscripcionesTalleres',
		},
		auto_return: 'approved',
	};

	let link = mercadopago.preferences
		.create(preference)
		.then(function (response) {
			return response.body.id;
		})
		.catch(function (error) {
			console.log(error);
		});

	return link;
}

module.exports = {
	MercadoPago,
};
