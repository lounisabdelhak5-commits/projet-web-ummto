const express = require('express');
const path = require('path');
const cors = require('cors');
const { initialize, seedProducts, seedTestAccount } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/devis', require('./routes/devis'));
app.use('/api/contact', require('./routes/contact'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

initialize();
seedProducts();
seedTestAccount();

app.listen(PORT, () => {
  console.log(`LNtech serveur démarré sur http://localhost:${PORT}`);
});
