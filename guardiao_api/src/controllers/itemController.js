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
        res.status(201).send({ message: 'Item salvo com sucesso', item: newItem });
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