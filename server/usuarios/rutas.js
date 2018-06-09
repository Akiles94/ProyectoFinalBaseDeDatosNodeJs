/**
 * @author Oscar Vinueza
 */
var express = require('express');
var BDAgenda = require('../datos/bdagenda.js'),
	Operaciones = require('../datos/usuariosCRUD.js');
var Router = express.Router();

Router.post('/', (req, res) => {
	Operaciones.consultarUsuario({user: req.body.user, pass: req.body.pass},(error, result) => {
		if(error) res.send(error);
		else {
			req.session.login = true;
			req.session.userLogin = result;
			res.send("Validado");
		}
	});
});

Router.get('/out',function(req,res){
	req.session.destroy(function(err) {
		if(err) console.log(err);
		else res.redirect('/');
	});
});


module.exports = Router;