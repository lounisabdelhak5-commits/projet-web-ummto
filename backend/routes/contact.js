const express = require('express');
const { getDB } = require('../database');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Nom, email et message requis' });
  }

  const db = getDB();
  db.prepare('INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)').run(
    name, email, subject || null, message
  );

  res.status(201).json({ success: true, message: 'Message envoyé' });
});

module.exports = router;
