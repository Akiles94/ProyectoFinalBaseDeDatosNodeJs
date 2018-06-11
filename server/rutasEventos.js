const RouterEventos = require('express').Router();
const Usuario = require('./modelUsuarios.js')
const Evento = require('./modelEventos.js')
const Operaciones = require('./crud.js') 
let ObjectId = require('mongoose').Types.ObjectId;


RouterEventos.get('/all', function(req, res) {
  req.session.reload(function(err) {
    if(req.session.user){
      if(err){
        res.send('logout');
        res.end()
      }else{
        Usuario.findOne({user:req.session.user}).exec({}, function(error, doc){
          if(error){
            res.send('salió');
          }else{
            Evento.find({user: doc._id}).exec(function(err, doc){
              if (err) {
                res.status(500)
                res.json(err)
              }
              res.json(doc) 
            })
          }
        })
      }
    }else{ 
      res.send('salió'); 
      res.end()
    }
  })
})

RouterEventos.all('/', function(req, res) {
  res.send('Url inválida' )
  res.end()
})

RouterEventos.post('/new', function(req, res) {
  req.session.reload(function(err) {
    if(err){      
      res.json("salió"); 
    }else{
      Usuario.findOne({user:req.session.user}).exec({}, function(error, doc){
        Evento.nextCount(function(err, count) {
          newID = count
        });

        let title = req.body.title,
        start = req.body.start, 
        end   = req.body.end, 
        userId  = doc._id 

        let evento = new Evento({ 
          title: title,
          start: start,
          end: end,
          user: userId
        })
        evento.save(function(error) {
          if (error) {            
            res.json(error)
          }
          res.json(newID) 
        })
      })
    }
  })
})

// Eliminar un evento que coincida con su id
RouterEventos.post('/delete/:_id', function(req, res) {
  let id = req.params._id //Obtener el identificador del evento
  req.session.reload(function(err) {
    if(err){
      console.log(err) //Mostrar error en cosola
      res.send("logout") //Devolver mensaje logout
    }else{
      Evento.remove({_id: id}, function(error) { //Ejecutar la función remover evento pasándo como parámetro el id del evento
        if(error) {
          console.log(error) //Mostrar error en cosola
          res.status(500)
          res.json(error)
        }
        res.send("Registro eliminado") //Devolver mensaje de registro eliminado
      })
    }
  })
})

//Actualizar evento
RouterEventos.post('/update/:_id&:start&:end', function(req, res) { //Obtener el identificador el evento, fecha de inicio y finalización desde el formulario
  req.session.reload(function(err) {
    if(err){
      console.log(err) //Mostrar error en cosola
      res.send("logout") //Devolver mensaje logout
    }else{
      Evento.findOne({_id:req.params._id}).exec((error, result) => { //Encontrar el evento por su identificador
        let id    = req.params._id, //asignar a la variable id el valor obtenido del formulario
        start = req.params.start, //asignar a la variable start el valor obtenido del formulario
        end   = req.params.end //asignar a la variable end el valor obtenido del formulario
        if (error){ //En caso de error
          res.send(error) //Enviar error
        }else{
          Evento.update({_id: id}, {start:start, end:end}, (error, result) => { //Ejecutar la función actualizar enviando como parámetros de búsqueda el id del evento y como datos a actualizar la fecha inicial y final
            if (error){ //En caso de error
              res.send(error )//Enviar error
            }else{
              res.send("Evento ha sido actualizado") //Enviar mensaje exitoso
            }
          })
        }
      })
    }
  })
})

module.exports = RouterEventos //Exportar rutas de los eventos
