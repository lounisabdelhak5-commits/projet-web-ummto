const express = require('express');
const { getDB } = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDB();
  const { category, brand, search, sort, page = 1, limit = 50 } = req.query;

  let sql = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }
  if (brand) {
    const brands = brand.split(',');
    sql += ` AND brand IN (${brands.map(() => '?').join(',')})`;
    params.push(...brands);
  }
  if (search) {
    sql += ' AND (name LIKE ? OR description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  const countResult = db.prepare(sql.replace('SELECT *', 'SELECT COUNT(*) as c')).get(...params);
  const total = countResult.c;

  let orderClause = 'ORDER BY id ASC';
  if (sort === 'price_asc') orderClause = 'ORDER BY price ASC';
  else if (sort === 'price_desc') orderClause = 'ORDER BY price DESC';
  else if (sort === 'name_asc') orderClause = 'ORDER BY name ASC';
  else if (sort === 'name_desc') orderClause = 'ORDER BY name DESC';
  else if (sort === 'newest') orderClause = 'ORDER BY isNew DESC, id DESC';

  const offset = (Number(page) - 1) * Number(limit);
  sql += ` ${orderClause} LIMIT ? OFFSET ?`;
  params.push(Number(limit), offset);

  const products = db.prepare(sql).all(...params).map(p => ({
    ...p,
    caracteristiques: p.caracteristiques ? JSON.parse(p.caracteristiques) : [],
    isNew: !!p.isNew,
    stock: p.stock ?? 10,
    discount: p.discount || null,
    surCommande: !!p.surCommande
  }));

  res.json({ products, total, page: Number(page), limit: Number(limit) });
});

router.get('/categories', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT DISTINCT category FROM products ORDER BY category').all();
  res.json(rows.map(r => r.category));
});

router.get('/brands', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT DISTINCT brand FROM products ORDER BY brand').all();
  res.json(rows.map(r => r.brand));
});

router.get('/:id', (req, res) => {
  const db = getDB();
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Produit introuvable' });

  product.caracteristiques = product.caracteristiques ? JSON.parse(product.caracteristiques) : [];
  product.isNew = !!product.isNew;
  product.discount = product.discount || null;
  product.surCommande = !!product.surCommande;

  const related = db.prepare(
    'SELECT * FROM products WHERE category = ? AND id != ? ORDER BY RANDOM() LIMIT 4'
  ).all(product.category, product.id).map(p => ({
    ...p,
    caracteristiques: p.caracteristiques ? JSON.parse(p.caracteristiques) : [],
    isNew: !!p.isNew
  }));

  res.json({ product, related });
});

module.exports = router;
