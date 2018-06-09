/**
 * @author Oscar Vinueza
 */
var Usuario = require('./usuarioModel.js');
module.exports.insertarUsuario = function (callback) {
	let User1 = new Usuario({nombre: "Nombre de usuario 1", user: 'user1', pass:'Cl@veUser1'});
	
	User1.save((error) => {
		if(error) callback(error);
		callback(null,"Usuario nuevo guardado");
	});
};

module.exports.eliminarUsuario = function (callback) {	
	Usuario.remove({user: 'user1'}, (error) => {
		if(error) callback(error);
		callback(null,"Registro del usuario eliminado");
	});
};

module.exports.consultarUsuario = function (data, callback) {
	Usuario.findOne({user: data.user}, (err, user) => {
		if(user){
			if(user.pass === data.pass)
				callback(null,user);
      		else
      			callback('Contraseña incorrecta');
      	} else
			callback('Usuario no existe');
	});
};