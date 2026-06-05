const express = require('express');
const { getDB } = require('../database');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, product_id, product_name, quantity = 1, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Nom et email requis' });
  }

  const db = getDB();
  let userId = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(authHeader.split(' ')[1], require('../middleware/auth').JWT_SECRET);
      userId = decoded.id;
    } catch {}
  }

  db.prepare(
    'INSERT INTO devis_requests (user_id, name, email, product_id, product_name, quantity, message) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(userId, name, email, product_id || null, product_name || null, quantity, message || null);

  res.status(201).json({ success: true, message: 'Demande de devis envoyée' });
});

module.exports = router;
