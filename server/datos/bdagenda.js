/**
 * @author Oscar Vinueza
 */
var mongoose = require('mongoose');
var BDAgenda = mongoose.connect('mongodb://localhost/BDAgenda');
module.exports = BDAgenda;