/**
 * @author Oscar Vinueza
 */
var Evento = require('./eventoModel.js');

module.exports.insertarEvento = function (data, callback) {
	let newEvent = new Evento(data);
	
	newEvent.save((error) => {
		if(error) callback(error);
		callback(null,"Evento nuevo guardado");
	});
};

module.exports.consultarEventos = function (iduser, callback) {
	Evento.find({uid: iduser}, (err, eventos) => {
		if(err)
			callback(err);
		else {
      		callback(null,eventos);
      	}
	});
};

module.exports.actualizarEvento = function (id, data, callback) {
	Evento.update({_id: id}, data, (error, result) => {
		if(error) callback(error);
		callback(null,"Evento actualizado correctamente");
	});
};

module.exports.eliminarEvento = function (id, callback) {
	Evento.remove({_id: id}, (error) => {
		if(error) callback(error);
		callback(null,"Registro del evento eliminado");
	});
};