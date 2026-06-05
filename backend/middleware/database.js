const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'lntech.db');

let db;

function getDB() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
}

function initialize() {
  const db = getDB();

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      caracteristiques TEXT,
      isNew INTEGER DEFAULT 0,
      stock INTEGER DEFAULT 10,
      discount INTEGER,
      surCommande INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'confirmed',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      product_name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS devis_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT,
      email TEXT,
      product_id INTEGER,
      product_name TEXT,
      quantity INTEGER DEFAULT 1,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  return db;
}

function seedProducts() {
  const db = getDB();
  const count = db.prepare('SELECT COUNT(*) as c FROM products').get();
  if (count.c > 0) return false;

  const products = require('./data.products.json');
  const insert = db.prepare(`
    INSERT OR IGNORE INTO products (id, name, brand, category, price, description, caracteristiques, isNew, stock, discount, surCommande)
    VALUES (@id, @name, @brand, @category, @price, @description, @caracteristiques, @isNew, @stock, @discount, @surCommande)
  `);

  const tx = db.transaction(() => {
    for (const p of products) {
      insert.run({
        id: p.id,
        name: p.name,
        brand: p.brand,
        category: p.category,
        price: p.price,
        description: p.description || '',
        caracteristiques: JSON.stringify(p.caracteristiques || []),
        isNew: p.isNew ? 1 : 0,
        stock: p.stock ?? 10,
        discount: p.discount || null,
        surCommande: p.surCommande ? 1 : 0
      });
    }
  });
  tx();
  return true;
}

function seedTestAccount() {
  const db = getDB();
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get('test@lntech.dz');
  if (existing) return;

  const hash = bcrypt.hashSync('Password1', 10);
  db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(
    'Utilisateur Test', 'test@lntech.dz', hash
  );
}

module.exports = { getDB, initialize, seedProducts, seedTestAccount };
