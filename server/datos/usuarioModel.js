/**
 * @author Oscar Vinueza
 */
var mongoose = require('mongoose');  
var usuarioSchema = new mongoose.Schema({
	nombre: {type: String, required: true},
	user: {type: String, required: true},
	pass: {type: String, required: true},
	nacimiento: {type: Date, default: Date.now}
});
var Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;