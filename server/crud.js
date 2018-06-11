var Usuario = require('./modelUsuarios.js') 

module.exports.crearUsuarioDemo = function(callback){ 
  var usuarios = [{ email: 'jose@gmail.com', user: "josluna", password: "123456"}, { email: 'Jurgen@gmail.com', user: "jurgenHQ", password: "12345678"}]; 
  Usuario.insertMany(usuarios, function(error, docs) { 
    if (error){ 
      if (error.code == 11000){ 
        callback("Proporcione todos los datos....")
      }else{
        callback(error.message) 
      }
    }else{
      callback(null, "Usuarios creados correctamente") 
    }
  });
}
