/**
 * Created by lequan on 10/30/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('Admin', AdminSchema);