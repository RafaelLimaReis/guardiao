const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SecurityModel = require('../models/security');
const responseFormatter = require('../utils/response');

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const security = await SecurityModel.findOne({ email });
    if (!security) {
      return res.status(400).send('E-mail ou senha incorretos');
    }

    const senhaValida = await bcrypt.compare(senha, security.senha);
    if (!senhaValida) {
      return res.status(400).send('E-mail ou senha incorretos');
    }

    const token = jwt.sign({ _id: security._id }, 'chave_secreta');
    res.json(responseFormatter.success({'token': token}, 'Login realizado com sucesso.'));
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao fazer login');
  }
};