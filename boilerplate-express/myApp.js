const express = require('express');
const app = express();
const logger = require('./middleware/logger')
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger);

console.log('Hello World');


app
	.route('/name')
	.get((req, res) => {
		const firstname = req.query.first;
		const lastname = req.query.last;
		res.json({
			name: `${firstname} ${lastname}`,
		});
	})
	.post((req, res) => {
		const firstname = req.body.first;
		const lastname = req.body.last;
		res.json({
			name: `${firstname} ${lastname}`,
		});
	});

app.get('/:word/echo', (req, res) => {
	res.json({ echo: req.params.word });
});

app.get(
	'/now',
	(req, res, next) => {
		req.time = Date().toString();
		next();
	},
	(req, res) => {
		res.json({
			time: req.time,
		});
	}
);

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
	const mySecret = process.env['MESSAGE_STYLE'];
	let msg = 'Hello json';
	if (mySecret == 'uppercase') {
		res.json({ message: msg.toUpperCase() });
	} else {
		res.json({ message: msg });
	}
	console.log(res.json);
});

filePath = __dirname + '/views/index.html';
app.get('/', (req, res) => {
	res.sendFile(filePath);
});

module.exports = app;
