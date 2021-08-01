const fetch = require('node-fetch');

const getVacunasDepartamento = async (req, res) => {
	try {
		const vacunas = await fetch(
			'https://datossf.santafe.gob.ar/metabase/bisalud/api/public/pivot/card/ecfb8735-79b9-472b-a80a-b9558cf03a52/query?parameters=%5B%5D&&',
			{
				headers: {
					accept: 'application/json',
					'accept-language': 'es-ES,es;q=0.9',
					'content-type': 'application/json',
					'sec-ch-ua':
						'"Opera";v="77", "Chromium";v="91", ";Not A Brand";v="99"',
					'sec-ch-ua-mobile': '?0',
					'sec-fetch-dest': 'empty',
					'sec-fetch-mode': 'cors',
					'sec-fetch-site': 'same-origin',
					'x-metabase-embedded': 'true',
				},
				referrer:
					'https://datossf.santafe.gob.ar/metabase/bisalud/public/question/ecfb8735-79b9-472b-a80a-b9558cf03a52',
				referrerPolicy: 'strict-origin-when-cross-origin',
				body: null,
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			}
		)
			.then((res) => res.json())
			.then(({ data }) => data)
			.catch((e) => {console.log(e);return []})

		res.json({
			ok: true,
			vacunas: vacunas,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			ok: false,
			msg: 'Error al cargar vacunas...',
		});
	}
};

const getVacunasUltimoDia = async (req, res) => {
	try {
		const vacunas = await fetch(
			'https://datossf.santafe.gob.ar/metabase/bisalud/api/public/card/36d416af-cf37-4165-acd6-f9e91aa15c66/query?parameters=%5B%5D',
			{
				headers: {
					accept: 'application/json',
					'accept-language': 'es-ES,es;q=0.9',
					'content-type': 'application/json',
					'sec-ch-ua':
						'"Opera";v="77", "Chromium";v="91", ";Not A Brand";v="99"',
					'sec-ch-ua-mobile': '?0',
					'sec-fetch-dest': 'empty',
					'sec-fetch-mode': 'cors',
					'sec-fetch-site': 'same-origin',
					'x-metabase-embedded': 'true',
				},
				referrer:
					'https://datossf.santafe.gob.ar/metabase/bisalud/public/question/ecfb8735-79b9-472b-a80a-b9558cf03a52',
				referrerPolicy: 'strict-origin-when-cross-origin',
				body: null,
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			}
		)
		.then((res) => res.json())
		.then(({ data }) => data.rows)
		.catch((e) => {console.log(e);return []})


		const ultimodia = [{fecha: vacunas[0][0]}, {totaldia: vacunas[2][2]}]

		

		res.json({
			ok: true,
			vacunas: ultimodia,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			ok: false,
			msg: 'Error al cargar vacunas...',
		});
	}
};

const getVacunasTotal = async (req, res) => {
	try {
		const vacunas = await fetch(
			'https://datossf.santafe.gob.ar/metabase/bisalud/api/public/pivot/card/c91c36fa-2f8a-4cd6-a4ae-c6b1cba5423a/query?parameters=%5B%5D&&',
			{
				headers: {
					accept: 'application/json',
					'accept-language': 'es-ES,es;q=0.9',
					'content-type': 'application/json',
					'sec-ch-ua':
						'"Opera";v="77", "Chromium";v="91", ";Not A Brand";v="99"',
					'sec-ch-ua-mobile': '?0',
					'sec-fetch-dest': 'empty',
					'sec-fetch-mode': 'cors',
					'sec-fetch-site': 'same-origin',
					'x-metabase-embedded': 'true',
				},
				referrer:
					'https://datossf.santafe.gob.ar/metabase/bisalud/public/question/ecfb8735-79b9-472b-a80a-b9558cf03a52',
				referrerPolicy: 'strict-origin-when-cross-origin',
				body: null,
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			}
		)
		.then((res) => res.json())
		.then(({ data }) => data.rows)
		.catch((e) => {console.log(e);return []})
	
		const totales = [{totalAbsoluto: vacunas[11][3] }, {total1dosis: vacunas[6][3] }, {total2dosis: vacunas[7][3] },{ASTRAZENECA: vacunas[8][3] },{SINOPHARM: vacunas[9][3] },{SPUTNIK: vacunas[10][3] },]
		

		res.json({
			ok: true,
			totales: totales,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			ok: false,
			msg: 'Error al cargar vacunas...',
		});
	}
};

module.exports = {
	getVacunasDepartamento,
	getVacunasUltimoDia,
	getVacunasTotal,
};
