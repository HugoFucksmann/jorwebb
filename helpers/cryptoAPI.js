const CoinGecko = require('coingecko-api');
const fetch = require('node-fetch');

const CoinGeckoClient = new CoinGecko();

func = async () => {
	let mana = await CoinGeckoClient.coins.fetch('decentraland');
	let uni = await CoinGeckoClient.coins.fetch('uniswap');
	let manaPrice = mana.data.market_data.current_price.usd;
	let uniPrice = uni.data.market_data.current_price.usd;
	console.log('manaPrice: ', manaPrice);
	console.log('uniPrice: ', uniPrice);
	if (manaPrice > 5.4 || manaPrice < 3.9) {
		let messages = {
			to: 'ExponentPushToken[JeLK8FG-aFry8L8mG1nzmN]',
			sound: 'default',
			title: 'mana cambio de valor',
			body: `precio de mana ${manaPrice}`,
		};
		await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(messages),
		});
	} else if (uniPrice > 20.9 || uniPrice < 17.9) {
		let messages = {
			to: 'ExponentPushToken[JeLK8FG-aFry8L8mG1nzmN]',
			sound: 'default',
			title: 'uniswap cambio de valor',
			body: `precio de uni ${uniPrice}`,
		};
		await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(messages),
		});
	}
};

alertaError = async () => {
	let messages = {
		to: 'ExponentPushToken[JeLK8FG-aFry8L8mG1nzmN]',
		sound: 'default',
		title: 'ocurrio un error',
		body: `se para cryptoAPI, reiniciar`,
	};
	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(messages),
	});
};

module.exports = {
	func,
	alertaError,
};
