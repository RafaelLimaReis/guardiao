const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acesso negado');

  try {
    const decoded = jwt.verify(token, 'chave_secreta');
    req.seguranca = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Token inválido');
  }
};