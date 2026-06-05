const express = require('express');
const { getDB } = require('../database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', (req, res) => {
  const db = getDB();
  const items = db.prepare(`
    SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.discount, p.stock, p.category
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
  `).all(req.user.id);

  res.json({ items });
});

router.post('/add', (req, res) => {
  const { product_id, quantity = 1 } = req.body;
  if (!product_id) return res.status(400).json({ error: 'ID produit requis' });

  const db = getDB();
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(product_id);
  if (!product) return res.status(404).json({ error: 'Produit introuvable' });

  const existing = db.prepare(
    'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?'
  ).get(req.user.id, product_id);

  const newQty = existing ? existing.quantity + quantity : quantity;
  if (newQty > (product.stock || 10)) {
    return res.status(400).json({ error: 'Stock insuffisant' });
  }

  if (existing) {
    db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ?').run(newQty, existing.id);
  } else {
    db.prepare('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)').run(
      req.user.id, product_id, quantity
    );
  }

  const items = db.prepare(`
    SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.discount, p.stock
    FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id = ?
  `).all(req.user.id);

  res.json({ items });
});

router.put('/update', (req, res) => {
  const { product_id, quantity } = req.body;
  if (!product_id || quantity < 1) {
    return res.status(400).json({ error: 'Paramètres invalides' });
  }

  const db = getDB();
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(product_id);
  if (quantity > (product.stock || 10)) {
    return res.status(400).json({ error: 'Stock insuffisant' });
  }

  db.prepare('UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?').run(
    quantity, req.user.id, product_id
  );

  const items = db.prepare(`
    SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.discount, p.stock
    FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id = ?
  `).all(req.user.id);

  res.json({ items });
});

router.delete('/remove/:product_id', (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM cart_items WHERE user_id = ? AND product_id = ?').run(
    req.user.id, req.params.product_id
  );

  const items = db.prepare(`
    SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.discount, p.stock
    FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id = ?
  `).all(req.user.id);

  res.json({ items });
});

router.delete('/clear', (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.user.id);
  res.json({ items: [] });
});

module.exports = router;
