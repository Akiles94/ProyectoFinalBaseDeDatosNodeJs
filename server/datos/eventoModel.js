/**
 * @author Oscar Vinueza
 */
var mongoose = require('mongoose'),
	Usuario = require('./usuarioModel');
	
var eventoSchema = new mongoose.Schema({
	title: {type: String, required: true},
	start: {type: String, required: true},
	end: String,
	uid: {type: mongoose.Schema.ObjectId, ref: "Usuario" , required: true}
});
var Evento = mongoose.model('Evento', eventoSchema);
module.exports = Evento;