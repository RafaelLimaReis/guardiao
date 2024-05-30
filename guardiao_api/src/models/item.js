const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true},
    local: { type: String, required: true},
    periodo: { type: String, required: true},
    image: { type: String, required: true},
    data: { type: Date, required: true},
    createdAt: {type: Date},
    retirada: {
        nomeAluno: { type: String },
        raAluno: { type: String },
        dataRetirada: { type: String },
        seguranca: { type: mongoose.Schema.Types.ObjectId, ref: 'Security' }
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;