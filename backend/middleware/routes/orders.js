const express = require('express');
const { getDB } = require('../database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.post('/', (req, res) => {
  const db = getDB();
  const cartItems = db.prepare(`
    SELECT ci.product_id, ci.quantity, p.name, p.price, p.discount, p.stock
    FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id = ?
  `).all(req.user.id);

  if (cartItems.length === 0) {
    return res.status(400).json({ error: 'Panier vide' });
  }

  let total = 0;
  for (const item of cartItems) {
    const unitPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    total += unitPrice * item.quantity;
  }
  total = Math.round(total * 100) / 100;

  const orderResult = db.prepare('INSERT INTO orders (user_id, total) VALUES (?, ?)').run(req.user.id, total);
  const orderId = orderResult.lastInsertRowid;

  const insertItem = db.prepare(
    'INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price) VALUES (?, ?, ?, ?, ?)'
  );

  for (const item of cartItems) {
    const unitPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    insertItem.run(orderId, item.product_id, item.name, item.quantity, Math.round(unitPrice * 100) / 100);
  }

  db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.user.id);

  res.status(201).json({ order_id: orderId, total, status: 'confirmed' });
});

router.get('/', (req, res) => {
  const db = getDB();
  const orders = db.prepare(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC'
  ).all(req.user.id);

  for (const order of orders) {
    order.items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
  }

  res.json({ orders });
});

router.get('/:id', (req, res) => {
  const db = getDB();
  const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').get(req.params.id, req.user.id);
  if (!order) return res.status(404).json({ error: 'Commande introuvable' });

  order.items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
  res.json({ order });
});

module.exports = router;
