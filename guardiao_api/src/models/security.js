const mongoose = require('mongoose');

const securitySchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String
});

const Security = mongoose.model('Security', securitySchema);

module.exports = Security;