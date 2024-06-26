const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const SecurityModel = require('./models/security');
const ItemModel = require('./models/item');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const CLEARDATABASE = false;

async function createSecurityDefault() {
    try {
      if (CLEARDATABASE) {
        await SecurityModel.deleteMany({});
        await ItemModel.deleteMany({});
      }


      const countGuards = await SecurityModel.countDocuments({});
      if (countGuards < 2) {
      
        const DefaultSecurity = [
          { nome: 'Rafael Lima', email: 'rafael@teste.com', senha: 'senha123' },
          { nome: 'Gabriel Lima', email: 'gabriel@teste.com', senha: 'outrasenha456' }
        ];

        for (const security of DefaultSecurity) {
          const senhaHashed = await bcrypt.hash(security.senha, 10);
          security.senha = senhaHashed;
        }

        await SecurityModel.insertMany(DefaultSecurity);
        console.log('Seguranças padrão criados');
      } else {
        console.log('Seguranças padrão já existem');
      }
    } catch (err) {
      console.error('Erro ao criar seguranças padrão', err);
    }
  }

mongoose.connect('mongodb://localhost:27017/guardiao')
    .then(() => {
        console.log('Conectado ao MongoDB');
        createSecurityDefault();
    })
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/item', itemRoutes);
app.use('/storage', express.static(path.join(__dirname, '../storage')));

const PORT = process.env.PORT || 3004;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`listening on port ${PORT}`);
})