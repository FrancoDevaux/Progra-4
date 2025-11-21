const { db } = require('../config/database');

const getProducts = (req, res) => {
  const { category, search } = req.query;

  const suspicious = /('|;|--|\/\*|\bUNION\b|\binformation_schema\b|#)/i;
  if ((category && suspicious.test(category)) || (search && suspicious.test(search))) {
    return res.status(200).json([]);
  }

  let query = 'SELECT id, name, category, price, stock FROM products WHERE 1=1';
  const params = [];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND name LIKE ?';
    params.push('%' + search + '%');
  }

  db.query(query, params, (err, results) => {
    if (err) {
      // Evitar exponer detalles de la BD en la respuesta
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results || []);
  });
};

module.exports = {
  getProducts
};
