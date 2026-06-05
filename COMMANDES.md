# LNtech - Documentation des Commandes

## HTML

### Structure des pages
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LNtech | Titre</title>
    <link rel="stylesheet" href="../style/style.css">
</head>
<body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
    <script src="../javascript/data.js"></script>
    <script src="../javascript/auth.js"></script>
    <script src="../javascript/nav.js"></script>
    <script src="../javascript/main.js"></script>
</body>
</html>
```

### Attributs et patterns inline

| Pattern | Usage | Exemple |
|---|---|---|
| `onclick` | Navigation filtres, panier, devis | `onclick="localStorage.setItem('filter', 'Cartes Graphiques')"` / `onclick="addToCart(42)"` |
| `onerror` | Fallback image produit | `onerror="this.src=getFallbackImage(product)"` |
| `onsubmit` | Newsletter (inline) | `onsubmit="alert('Merci...'); return false"` |
| `onchange` | Change monnaie | `onchange="setCurrency(this.value); location.reload()"` |
| `?redirect=` | Redirection après login | `connexion.html?redirect=commande.html` |

### Classes CSS utilisées dans le HTML

| Classe | Usage |
|---|---|
| `glass-card` | Conteneurs vitrés (hero, formulaires, cartes) |
| `product-card` | Carte produit dans la grille |
| `product-image` | Image dans carte produit |
| `product-info` | Infos texte dans carte produit |
| `product-title` / `product-title-click` | Nom du produit |
| `product-price` | Prix affiché |
| `product-desc` | Description courte |
| `badge` / `badge-new` / `badge-promo` / `badge-surcommande` / `badge-outofstock` / `badge-lowstock` | Badges |
| `btn` / `btn-primary` / `btn-outline` / `btn-full` / `btn-disabled` / `btn-devis` | Boutons |
| `form-container` / `form-group` / `form-control` / `form-title` / `form-footer` | Formulaires |
| `search-input` / `sort-select` / `currency-select` | Inputs navigation |
| `filter-btn` | Boutons filtre catégorie |
| `logo` / `logo-ln` / `logo-tech` | Logo LNtech |
| `dropdown` / `dropdown-content` / `sub-dropdown-content` | Menus déroulants |
| `hamburger` | Menu mobile |
| `nav-link-budget` | Lien budget |
| `cart-link` / `cart-badge` | Icône panier + badge |
| `auth-greeting` / `auth-logout-btn` | Stats connexion |
| `animate-fade-in` | Animation entrée |
| `page-title` / `section-heading` / `section-subtitle` | Titres |
| `section-gap` | Espacement section |
| `test-account-card` / `test-account-title` / `test-account-line` | Carte compte test |
| `old-price` / `promo-price` / `promo-price-lg` / `promo-badge-detail` | Promotions |
| `delivery-instock` / `delivery-lowstock` / `delivery-outofstock` / `delivery-surcommande` | Statut livraison |
| `stock-instock` / `stock-lowstock` / `stock-outofstock` / `stock-surcommande` | Statut stock |
| `detail-image-container` / `detail-name` / `detail-price` / `detail-stock` / `detail-description` / `detail-section-title` / `specs-list` / `detail-add-btn` / `detail-back-btn` | Page détail |
| `cart-table` / `cart-product-info` / `cart-thumb` / `cart-qty` / `cart-qty-btn` / `cart-remove-btn` / `cart-empty` / `cart-total` / `cart-summary` / `cart-highlight` | Panier |
| `budget-form` / `budget-form-row` / `budget-form-group` / `budget-slider` / `budget-input-number` / `budget-btn-search` / `budget-heading` / `budget-summary-card` / `budget-bar-bg` / `budget-bar-fill` / `budget-remaining` / `budget-placeholder` / `budget-noresult-title` / `budget-noresult-text` / `budget-section-mb` | Budget |
| `service-grid` / `service-card` / `service-card-blue` / `faq-item` | Aide |
| `about-section` / `about-title` / `about-subtitle` / `about-text` / `values-grid` / `value-card` | À propos |
| `error-message` / `select-dark` | Formulaires |

---

## CSS

### Variables CSS (`:root`)
```css
--primary-color: #ce0014;       --secondary-color: #ff3b4b;
--background-dark: #0d1117;     --surface-dark: #161b22;
--text-light: #c9d1d9;         --text-muted: #8b949e;
--danger: #ef4444;              --success: #22c55e;
--border-color: #30363d;
--glass-bg: rgba(22,27,34,0.85);
--glass-border: rgba(255,255,255,0.05);
--glass-shadow: 0 8px 32px 0 rgba(0,0,0,0.5);
```

### Keyframes
```css
@keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
}
```

### Interdits
- **Aucun `style=""` inline** dans le HTML
- **Aucun bloc `<style>`** dans les pages
- Exceptions : `animation-delay`, largeur barre budget, couleur barre budget

---

## JavaScript

### data.js (chargé en premier)

| Symbole | Type | Description |
|---|---|---|
| `SafeStorage` | Object | `getItem(key)`, `setItem(key, value)`, `removeItem(key)` — Fallback localStorage → window.name |
| `products` | Array | 237 produits [{id, name, brand, category, price, description, caracteristiques, isNew, stock, discount?, surCommande?}] |
| `categories` | Array | 16 catégories dérivées de products |
| `brands` | Array | Marques dérivées de products |

### auth.js

| Fonction | Description |
|---|---|
| `handleRegister(event)` | Valide nom (2-50 chars), email, password (6+), vérifie doublon, sauvegarde, auto-login, redirect → index |
| `handleLogin(event)` | Cherche email+password dans users, sauvegarde currentUser, supporte `?redirect=` |
| `logout()` | Supprime currentUser, redirect → index |
| `updateAuthUI()` | Bascule Connexion/Inscription ↔ Salut {nom} + Déconnexion |

**Clés SafeStorage utilisées :** `users`, `currentUser`

### main.js

| Fonction | Description |
|---|---|
| `getCurrency()` | Retourne EUR/USD/DZD depuis SafeStorage (défaut EUR) |
| `setCurrency(code)` | Sauvegarde la monnaie |
| `convertPrice(priceEur)` | Convertit EUR → devise courante (USD: x1.08, DZD: x188) |
| `formatPrice(priceEur)` | Formate avec symbole (€/$/DA), arrondi DZD sans décimales |
| `getProductImage(product)` | Chemin image via productImageMap, préfixe `../` si /content/ |
| `getFallbackImage(product)` | Image catégorie (cat_*.jpg) si pas d'image produit |
| `saveCart()` | Sérialise le panier dans SafeStorage |
| `updateCartBadge()` | Affiche/masque le badge panier |
| `demanderDevis(productId)` | Ajoute à la liste devis (nécessite auth) |
| `addToCart(productId)` | Ajoute au panier, vérifie stock, bloque si dépassé |
| `renderProducts(productsToRender)` | Génère les cartes HTML des produits |
| `applyFilters()` | Filtre par catégorie, recherche, marque ; trie ; appelle renderProducts |
| `setupFilters()` | Crée les boutons de catégorie et binds recherche/tri |
| `setupBrandFilters(category)` | Crée les checkboxes de marque |
| `filterProducts(category, clickedBtn)` | Change le filtre courant, applique |
| `renderCart()` | Affiche le tableau du panier |
| `updateQuantity(productId, change)` | Modifie quantité (+1/-1), vérifie stock max |
| `removeFromCart(productId)` | Supprime l'article du panier |
| `checkout()` | Vérifie auth + panier non vide, simule commande |
| `renderProductDetails()` | Remplit la page détail depuis `?id=` |

**Clés SafeStorage utilisées :** `currency`, `cart`, `filter`, `brand`, `keyword`, `currentUser`, `devis`

**Variables globales :**
```js
const CURRENCIES = { EUR: { symbol: '€', rate: 1 }, USD: { symbol: '$', rate: 1.08 }, DZD: { symbol: 'DA', rate: 188 } };
const VALID_CODES = ['EUR', 'USD', 'DZD'];
const productImageMap = { "1": "product-1.jpg", ... };
let cart = [];
let currentFilter = null;
let currentSearch = '';
let currentSort = 'default';
let currentBrands = [];
```

### nav.js

| Logique | Description |
|---|---|
| Hamburger click | Toggle `.active` sur menu |
| Click lien mobile | Ferme le menu |
| Dropdown mobile | `e.preventDefault()` + toggle `.active` |

### budget.js

| Fonction | Description |
|---|---|
| `filterByBudget()` | Filtre produits par budget max + catégorie, trie desc |
| `renderBudgetResults(results, budget)` | Affiche carte résumé + top 6 + tous résultats |
| `createProductCard(product, index, budget)` | Crée carte avec barre budget (verte/jaune/rouge) |

---

## Images

### Convention nommage
```
images/products/product-{id}.{ext}
images/products/cat_{categorie}.jpg
images/brands/{marque}.svg
```

### Ordre de priorité des extensions (dans productImageMap)
1. `.jpg` (priorité haute)
2. `.png`
3. `.webp`
4. `.avif`
5. `.jpeg`
6. `.svg` (fallback généré)

### Chaîne de fallback
1. `productImageMap[product.id]` → image spécifique
2. `onerror="this.src=getFallbackImage(product)"` → image catégorie (`cat_*.jpg`)
3. Si catégorie absente → `placehold.co` externe

---

## Pages du site

| Page | Fichier | Description |
|---|---|---|
| Accueil | `index.html` | Hero, avantages, catégories, produits vedettes, marques |
| Produits | `content/produits.html` | Grille filtrable, tris, recherche |
| Détail | `content/details.html` | Fiche produit complète via `?id=N` |
| Panier | `content/commande.html` | Tableau panier, checkout |
| Budget | `content/budget.html` | Recommandation par budget 50–20000€ |
| Connexion | `content/connexion.html` | Login + compte test |
| Inscription | `content/inscription.html` | Création compte |
| À propos | `content/about.html` | Infos site |
| Aide | `content/help.html` | FAQ + contact |
