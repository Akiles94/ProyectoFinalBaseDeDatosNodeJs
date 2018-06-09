/**
 * @author Oscar Vinueza
 */
var bodyParser = require('body-parser'),
	http = require('http'),
	express = require('express'),
	session = require('express-session'),
	rutaLogin = require('./usuarios/rutas.js'),
	rutaEvents = require('./eventos/rutas.js');

var PORT = 3000,
	app = express(),
	Server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
	secret: "sessionPruebaFinal",
	resave: false,
	saveUninitialized: false
}));
app.use('/login', rutaLogin);
app.use('/events', rutaEvents);
app.use(express.static('client'));
Server.listen(PORT, () => {
	console.log('Server is listening on port: '+PORT);
});