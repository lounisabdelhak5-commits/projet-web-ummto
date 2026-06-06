Membres du groupe:
	Lounis abdelhak

  Technologies et Commandes Utilisées

 HTML5
- Structure sémantique : `<!DOCTYPE html>`, `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`
- Formulaires : `<form>`, `<input>`, `<select>`, `<textarea>` avec validation via `required`
- Attributs dynamiques :
  - `onclick` : navigation, ajout au panier, filtres
  - `onerror` : fallback des images produits
  - `onchange` : changement de devise (EUR/USD/DZD)
- Liens de navigation : structure à 2 niveaux avec menus déroulants

 CSS3
- Thème sombre : fond `#0d1117`, accent rouge `#ce0014`
- Glassmorphism : arrière-plans transparents avec flou (`backdrop-filter: blur(12px)`)
- Responsive : grilles adaptatives (`grid-template-columns: auto-fill, minmax()`)
- Animations : `@keyframes fadeIn` pour l'apparition des éléments
- Variables CSS : couleurs et styles centralisés dans `:root`
- Classes principales : `glass-card`, `btn-primary`, `product-card`, `form-control`, `badge-promo`, `dropdown-content`, `animate-fade-in`

 JavaScript (Vanilla)
- Manipulation du DOM : `getElementById`, `querySelector`, `innerHTML`, `style.display`
- Événements : `addEventListener('submit')`, `addEventListener('click')`, `addEventListener('DOMContentLoaded')`
- Stockage local : `localStorage` avec fallback `window.name` via `SafeStorage`
- Filtres et tris : `filter()`, `sort()`, `some()`, `includes()` sur le tableau de produits
- Expressions régulières : validation des formulaires (nom, email, mot de passe)
- Promesses et async : `fetch()`, `async/await` pour les appels API
- Formatage monétaire : conversion EUR → USD/DZD avec `toLocaleString()`
- Panier : tableau d'objets avec `push()`, `find()`, `reduce()`
- Images : mapping ID → fichier via `productImageMap`, fallback catégorie

 Node.js (Backend - optionnel)
- Express : serveur HTTP et routes API
- SQLite (better-sqlite3) : base de données locale
- JWT (jsonwebtoken) : tokens d'authentification
- bcryptjs : hachage des mots de passe
- Endpoints : `/api/auth/`, `/api/products/*`, `/api/cart/*`, `/api/orders/*`, `/api/devis`, `/api/contact`

 Base de données (SQLite)
- Tables : `users`, `products`, `cart_items`, `orders`, `order_items`, `devis_requests`, `contact_messages`
- Requêtes : `SELECT`, `INSERT`, `UPDATE`, `DELETE` avec paramètres préparés
- Transactions : pour les commandes (insertion commande + lignes en une fois)


 Structure du Projet

E_Commerce_Informatique/
  index.html           ← Page d'accueil
  style/style.css      ← Tous les styles (1109 lignes)
  javascript/
    data.js            ← 235 produits + SafeStorage
    main.js            ← Panier, filtres, affichage
    auth.js            ← Inscription, connexion
    nav.js             ← Menu mobile
    budget.js          ← Recommandation budget
  content/             ← Pages internes
    produits.html, details.html, commande.html
    connexion.html, inscription.html
    budget.html, about.html, help.html
  images/
    products/          ← 215+ images produits
    brands/            ← 18 logos SVG de marques
  backend/             ← Serveur Node.js (optionnel)
    server.js, database.js, routes/, middleware/
  readme.txt           ← fichier de description


