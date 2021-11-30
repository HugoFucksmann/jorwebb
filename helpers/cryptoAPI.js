const CoinGecko = require('coingecko-api');
const fetch = require('node-fetch');

const CoinGeckoClient = new CoinGecko();

func = async () => {
	let mana = await CoinGeckoClient.coins.fetch('decentraland');
	let uni = await CoinGeckoClient.coins.fetch('uniswap');
	//let bitcoint = await CoinGeckoClient.coins.fetch('bitcoin');
	/* let bitcointPorcentage =
		bitcoint.data.market_data.price_change_percentage_24h; */
	let manaPorcentage =
		mana.data.market_data.price_change_percentage_24h;
	let manaPrice = mana.data.market_data.current_price.usd;
	let uniPrice = uni.data.market_data.current_price.usd;
	let uniPorcentage =
		uni.data.market_data.price_change_percentage_24h;
	/* console.log(uniPorcentage);
	console.log(manaPorcentage); */
	//let data = await CoinGeckoClient.coins.all();
	/* console.log('manaPrice: ', manaPrice);
	console.log('uniPrice: ', uniPrice);
	console.log('bitcointPrice: ', bitcointPrice); */
	//console.log('listt ', data);
	/* 	console.log(uniPorcentage, uniPrice);
	console.log(manaPorcentage, manaPrice); */

	if (manaPrice > 5.1 || manaPorcentage > 9.7) {
		let messages = {
			to: 'ExponentPushToken[JeLK8FG-aFry8L8mG1nzmN]',
			sound: 'default',
			title: 'mana sube ++',
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
	} else if (manaPrice < 4.6) {
		let messages = {
			to: 'ExponentPushToken[JeLK8FG-aFry8L8mG1nzmN]',
			sound: 'default',
			title: 'mana baja --',
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
	} else if (uniPrice < 20.2) {
		let messages = {
			to: 'ExponentPushToken[JeLK8FG-aFry8L8mG1nzmN]',
			sound: 'default',
			title: 'uniswap baja --',
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
	} else if (uniPrice > 21 || uniPorcentage > 9.7) {
		let messages = {
			to: 'ExponentPushToken[JeLK8FG-aFry8L8mG1nzmN]',
			sound: 'default',
			title: 'uniswap sube ++',
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
	} /* else if (bitcointPorcentage > 5.4) {
		let messages = {
			to: 'ExponentPushToken[JeLK8FG-aFry8L8mG1nzmN]',
			sound: 'default',
			title: 'sube bitcoint ++',
			body: `precio de uni ${bitcointPrice}`,
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
	} */
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
