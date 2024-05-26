const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const SecurityModel = require('./models/security');
const bcrypt = require('bcrypt');

const app = express();

async function createSecurityDefault() {
    try {
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

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})