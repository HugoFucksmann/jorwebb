const express = require('express');

const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
console.log('holaaaa');
async function ff(){
	fetch('https://datossf.santafe.gob.ar/metabase/bisalud/api/public/pivot/card/ecfb8735-79b9-472b-a80a-b9558cf03a52/query?parameters=%5B%5D&&')
        .then(res => res.json())
        .then((data) => console.log(data));
}
/* app.get('/', handler()); */
ff()
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
	console.log('server iniciado en puerto ', PORT);
});


