# LNtech - E-commerce Informatique

## Stack
HTML + CSS + JavaScript vanilla (client-side, no backend)

## Structure
- `/javascript/data.js` - `const products` array (243 produits), `categories`, `brands`
- `/javascript/main.js` - Panier, affichage, filtres, détails, checkout
- `/javascript/auth.js` - Inscription, connexion
- `/javascript/nav.js` - Menu hamburger mobile
- `/javascript/budget.js` - Recommandation par budget
- `/style/style.css` - Thème sombre, glassmorphism, toutes les classes CSS
- `/content/*.html` - Pages (produits, budget, commande, connexion, inscription, details, about, help)
- `/images/brands/*.svg` - Logos de marque (18 marques)

## Conventions CSS
- **Aucun `style=""` inline dans les fichiers HTML** — tout est dans `style.css`
- Les templates JS (`main.js`, `budget.js`, `auth.js`) utilisent aussi des classes CSS
- Seules exceptions : `animation-delay` (valeurs différentes), et largeur/couleur dynamiques (barre de budget)
- Toutes les classes CSS ajoutées dans `style.css` sous la section `/* ===== Utility classes to replace inline styles ===== */`
- Blocs `<style>` interdits dans les pages HTML

## Conventions Code
- Thème : fond `#0d1117`, accent rouge `#ce0014`, glassmorphism
- `addToCart`, `products`, `renderProducts` sont des globales accessibles depuis les `onclick` inline
- Filtres par catégorie via `localStorage.setItem('filter', ...)` + `main.js` centralisé
- Les pages `content/` utilisent des chemins relatifs (`produits.html`) dans la navigation
- Dernier ID produit utilisé : 267 (Logitech G733 Lightspeed)
- `const products` global, pas de modules ES6
- Prix formatés avec `formatPrice()` pour support multi-monnaie (EUR/USD/DZD)
