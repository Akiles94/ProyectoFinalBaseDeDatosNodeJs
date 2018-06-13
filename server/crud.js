var Usuario = require('./modelUsuarios.js') 

module.exports.crearUsuarioDemo = function(callback){ 
  var arr = [{ email: 'demo@mail.com', user: "demo", password: "123456"}, { email: 'juan@mail.com', user: "juan", password: "123456"}]; 
  Usuario.insertMany(arr, function(error, docs) { 
    if (error){ 
      if (error.code == 11000){ 
        callback("Utilice los siguientes datos: </br>usuario: demo | password:123456 </br>usuario: juan | password:123456") 
      }else{
        callback(error.message) 
      }
    }else{
      callback(null, "El usuario 'demo' y 'juan' se ha registrado correctamente. </br>usuario: demo | password:123456 </br >usuario: juan | password:123456")
    }
  });
}
