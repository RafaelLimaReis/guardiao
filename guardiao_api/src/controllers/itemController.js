const Item = require('../models/item');

exports.createItem = async (req, res) => {
    const { item, data, local, periodo } = req.body;
    console.log(req.file);
    const imagePath = '/storage/' + req.file.filename;
    try {
        const newItem = new Item({
            name: item,
            local,
            periodo,
            data: new Date(data),
            image: imagePath,
            createdAt: new Date()
        });

        await newItem.save();
        res.status(201).send({ message: 'Item salvo com sucesso', data: newItem });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Erro ao salvar o item', error });
    }
};

exports.updateItem = async (req, res) => {
    const { _id, aluno, raAluno } = req.body;
    console.log(req.body);
    try {
        const updateDoc = {
            $set: {
                'retirada.nomeAluno': aluno,
                'retirada.raAluno': raAluno,
                'retirada.dataRetirada': new Date(),
                'retirada.seguranca': req.user._id
            }
        }
        
        const updateItem = await Item.findOneAndUpdate(
            { _id: _id },
            updateDoc,
            { new: true }
        );
        console.log(updateItem);
        res.status(201).send({ message: 'Item salvo com sucesso', data: updateItem });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Erro ao salvar o item', error });
    }
};

exports.getItems = async (req, res) => {
    try {
        let query = {};
        const searchQuery = req.query.q;
        if (searchQuery) {
            query = { $or: [
                { name: { $regex: searchQuery, $options: 'i' } }, // Filtro por nome
            ]}
        }
        const items = await Item.find(query);
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar itens', error });
    }
}