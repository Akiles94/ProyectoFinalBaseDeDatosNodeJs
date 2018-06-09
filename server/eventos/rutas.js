/**
 * @author Oscar Vinueza
 */
var express = require('express');
var BDAgenda = require('../datos/bdagenda.js'),
	Operaciones = require('../datos/eventosCRUD.js');
var Router = express.Router();

Router.post('/new', (req, res) => {
	data = {title: req.body.title, start: req.body.start, end: req.body.end, uid: req.session.userLogin._id};
	Operaciones.insertarEvento(data, (error, result) => {
		if(error) res.send(error);
		res.send(result);
	});
});

Router.get('/all', (req, res) => {
	Operaciones.consultarEventos(req.session.userLogin._id, (error, result) => {
		if(error) res.json(error);
		else {
			var leventos = [];
			result.forEach(function(item){
				colorEvento = "#" + (Math.round(Math.random() * 0XFFFFFF)).toString(16);
				leventos.push({id: item._id, title: item.title, start: item.start, end: item.end, color: colorEvento});
			});
			res.json(leventos);
		}
	});
});

Router.post('/update', (req, res) => {
	data = {start: req.body.start, end: req.body.end};
	Operaciones.actualizarEvento(req.body.id, data, (error, result) => {
		if(error) res.send(error);
		res.send(result);
	});
});

Router.post('/delete/:id', (req, res) => {
	Operaciones.eliminarEvento(req.body.id, (error, result) => {
		if(error) res.send(error);
		else res.send(result);
	});
});
module.exports = Router;