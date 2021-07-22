const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./databaseConfig');
const app = express();
dbConnection();
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.use('/api/prensa', require('./routes/prensa'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/sumate', require('./routes/sumate'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
	console.log('server iniciado en puerto ', PORT);
});
