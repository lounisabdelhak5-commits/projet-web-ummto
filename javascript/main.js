const CURRENCIES = { EUR: { symbol: '€', rate: 1 }, USD: { symbol: '$', rate: 1.08 }, DZD: { symbol: 'DA', rate: 188 } };
const VALID_CODES = Object.keys(CURRENCIES);

function getCurrency() {
  const code = SafeStorage.getItem('currency');
  return VALID_CODES.includes(code) ? code : 'EUR';
}

const productImageMap = {"1":"product-1.jpg","2":"product-2.jpg","3":"product-3.jpg","4":"product-4.jpg","5":"product-5.jpg","6":"product-6.jpg","7":"product-7.jpg","8":"product-8.jpg","9":"product-9.jpg","10":"product-10.jpg","11":"product-11.jpg","12":"product-12.jpg","13":"product-13.jpg","14":"product-14.jpg","15":"product-15.jpg","16":"product-16.jpg","17":"product-17.jpg","18":"product-18.jpg","19":"product-19.jpg","20":"product-20.jpg","21":"product-21.jpg","22":"product-22.jpg","23":"product-23.jpg","24":"product-24.jpg","25":"product-25.jpg","26":"product-26.jpg","27":"product-27.jpg","28":"product-28.jpg","29":"product-29.jpg","30":"product-30.jpg","31":"product-31.jpg","32":"product-32.jpg","33":"product-33.jpg","34":"product-34.jpeg","35":"product-35.jpg","36":"product-36.webp","37":"product-37.jpg","38":"product-38.jpg","39":"product-39.jpg","40":"product-40.jpg","41":"product-41.jpg","42":"product-42.jpg","43":"product-43.jpg","44":"product-44.jpg","45":"product-45.jpg","46":"product-46.jpg","47":"product-47.jpg","48":"product-48.jpg","49":"product-49.jpg","50":"product-50.jpg","51":"product-51.jpg","52":"product-52.jpg","53":"product-53.jpg","54":"product-54.jpg","55":"product-55.jpeg","56":"product-56.jpeg","57":"product-57.png","58":"product-58.png","59":"product-59.jpg","60":"product-60.jpg","61":"product-61.png","62":"product-62.png","67":"product-67.jpg","68":"product-68.jpg","69":"product-69.png","70":"product-70.png","71":"product-71.jpg","72":"product-72.png","73":"product-73.jpg","74":"product-74.jpg","75":"product-75.jpg","76":"product-76.jpg","77":"product-77.jpg","78":"product-78.jpg","79":"product-79.jpg","80":"product-80.jpg","81":"product-81.jpg","82":"product-82.jpg","83":"product-83.jpg","84":"product-84.jpg","85":"product-85.jpg","86":"product-86.jpg","87":"product-87.jpg","88":"product-88.jpg","89":"product-89.jpg","90":"product-90.jpg","91":"product-91.jpg","92":"product-92.jpg","93":"product-93.jpg","94":"product-94.jpg","95":"product-95.jpg","96":"product-96.jpg","97":"product-97.jpg","98":"product-98.jpg","99":"product-99.png","100":"product-100.png","101":"product-101.jpg","102":"product-102.jpg","103":"product-103.jpg","104":"product-104.jpg","105":"product-105.jpg","106":"product-106.jpg","107":"product-107.jpg","108":"product-108.jpg","109":"product-109.jpg","110":"product-110.jpg","111":"product-111.jpg","112":"product-112.jpg","113":"product-113.jpg","114":"product-114.jpg","115":"product-115.jpg","116":"product-116.jpg","117":"product-117.jpg","118":"product-118.jpg","119":"product-119.jpg","120":"product-120.jpg","121":"product-121.jpg","122":"product-122.jpg","123":"product-123.jpg","124":"product-124.jpg","125":"product-125.jpeg","126":"product-126.jpg","130":"product-130.jpg","131":"product-131.jpg","132":"product-132.jpg","133":"product-133.png","134":"product-134.png","135":"product-135.png","136":"product-136.jpg","137":"product-137.jpg","138":"product-138.jpg","139":"product-139.jpg","141":"product-141.jpeg","142":"product-142.jpeg","143":"product-143.png","144":"product-144.png","145":"product-145.jpg","146":"product-146.jpg","151":"product-151.jpg","152":"product-152.jpg","153":"product-153.jpg","154":"product-154.jpg","155":"product-155.jpg","156":"product-156.jpg","157":"product-157.jpg","158":"product-158.jpg","159":"product-159.jpg","160":"product-160.jpg","161":"product-161.jpg","162":"product-162.jpg","163":"product-163.jpg","164":"product-164.jpg","165":"product-165.jpg","170":"product-170.jpg","171":"product-171.jpg","172":"product-172.png","173":"product-173.png","174":"product-174.jpg","175":"product-175.jpg","176":"product-176.jpg","177":"product-177.jpg","178":"product-178.avif","179":"product-179.avif","180":"product-180.jpg","181":"product-181.jpg","186":"product-186.jpg","187":"product-187.jpg","188":"product-188.jpg","189":"product-189.jpg","190":"product-190.jpg","198":"product-198.webp","199":"product-199.webp","200":"product-200.webp","201":"product-201.avif","202":"product-202.avif","203":"product-203.avif","204":"product-204.avif","205":"product-205.avif","206":"product-206.webp","207":"product-207.png","208":"product-208.jpg","210":"product-210.jpg","211":"product-211.jpg","212":"product-212.jpg","213":"product-213.jpg","216":"product-216.jpg","220":"product-220.jpg","221":"product-221.webp","222":"product-222.jpg","224":"product-224.jpeg","225":"product-225.jpeg","226":"product-226.jpeg","227":"product-227.jpeg","240":"product-240.webp","241":"product-241.webp","242":"product-242.webp","243":"product-243.webp","244":"product-244.webp","245":"product-245.webp","246":"product-246.webp","247":"product-247.webp","250":"product-250.jpg","251":"product-251.jpg","252":"product-252.webp","253":"product-253.jpg","254":"product-254.jpg","255":"product-255.webp","260":"product-260.jpg","261":"product-261.jpg","262":"product-262.jpg","263":"product-263.jpg","264":"product-264.jpg","265":"product-265.webp","266":"product-266.jpg","267":"product-267.jpg"};

function getProductImage(product) {
  const depth = window.location.pathname.includes('/content/') ? '../' : '';
  return depth + 'images/products/' + (productImageMap[product.id] || 'product-' + product.id + '.svg');
}

function getFallbackImage(product) {
  const depth = window.location.pathname.includes('/content/') ? '../' : '';
  const catMap = {
    'Processeurs AMD (Ryzen)': 'cat_amd_cpu.jpg',
    'Processeurs Intel': 'cat_intel_cpu.jpg',
    'Cartes Graphiques': 'cat_gpu.jpg',
    'Cartes Mères AMD': 'cat_motherboard_amd.jpg',
    'Cartes Mères Intel': 'cat_motherboard_intel.jpg',
    'Mémoire RAM': 'cat_ram.jpg',
    'Microcontrôleurs et SBC': 'cat_sbc.jpg',
    'Processeurs Serveur': 'cat_server_cpu.jpg',
    'Cartes Mères Serveur': 'cat_server_mobo.jpg',
    'RAM ECC': 'cat_ram_ecc.jpg',
    'Stockage': 'cat_storage.jpg',
    'Alimentations (PSU)': 'cat_psu.jpg',
    'Boîtiers (Cases)': 'cat_case.jpg',
    'Refroidissement CPU': 'cat_cooler.jpg',
    'Écrans': 'cat_monitor.jpg',
    'Périphériques': 'cat_peripheral.jpg'
  };
  const catImg = catMap[product.category];
  if (catImg) {
    return depth + 'images/products/' + catImg;
  }
  return depth + 'images/products/product-' + product.id + '.svg';
}

function setCurrency(code) {
  if (VALID_CODES.includes(code)) { SafeStorage.setItem('currency', code); }
}

function convertPrice(priceEur) {
  const code = getCurrency();
  return priceEur * (CURRENCIES[code]?.rate || 1);
}

function formatPrice(priceEur) {
  if (priceEur === undefined || priceEur === null) return '—';
  const code = getCurrency();
  const rate = CURRENCIES[code]?.rate || 1;
  const converted = priceEur * rate;
  let formatted;
  if (code === 'DZD') {
    try {
      formatted = Math.round(converted).toLocaleString('fr-DZ');
    } catch {
      formatted = Math.round(converted).toLocaleString();
    }
  } else {
    formatted = converted.toFixed(2).replace('.', ',');
  }
  return formatted + ' ' + (CURRENCIES[code]?.symbol || '€');
}

// Cart initialization
let cart = [];
try {
  const stored = SafeStorage.getItem('cart');
  if (stored) {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      cart = parsed.filter(item => item && typeof item.id === 'number');
    }
  }
} catch (e) {
  console.error('Erreur de lecture du panier:', e);
  cart = [];
  SafeStorage.removeItem('cart');
}

function saveCart() {
  try {
    const data = JSON.stringify(cart);
    SafeStorage.setItem('cart', data);
  } catch (e) {
    console.error('Erreur lors de la sauvegarde du panier:', e);
  }
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
}

function demanderDevis(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const currentUser = JSON.parse(SafeStorage.getItem('currentUser'));
  if (!currentUser) {
    alert("Veuillez vous connecter pour demander un devis.");
    window.location.href = 'connexion.html';
    return;
  }
  const devis = JSON.parse(SafeStorage.getItem('devis') || '[]');
  devis.push({ ...product, quantity: 1, date: new Date().toISOString() });
  SafeStorage.setItem('devis', JSON.stringify(devis));
  alert(`📩 Demande de devis envoyée pour ${product.name}.\nNotre équipe vous contactera sous 48h.`);
}

function addToCart(productId) {
  if (!products || !Array.isArray(products)) {
    console.error('Products not loaded');
    alert('Erreur : les produits ne sont pas encore chargés.');
    return;
  }
  const product = products.find(p => p.id === productId);
  if (!product) {
    console.error('Product not found:', productId);
    alert('Erreur : produit introuvable.');
    return;
  }
  if (product.surCommande) {
    demanderDevis(productId);
    return;
  }

  const stock = product.stock !== undefined ? product.stock : 10;
  if (stock <= 0) {
    alert("❌ Ce produit est actuellement en rupture de stock.");
    return;
  }

  const existingItem = cart.find(item => item.id === productId);
  const currentQty = existingItem ? (existingItem.quantity || 1) : 0;
  if (currentQty + 1 > stock) {
    alert(`❌ Stock insuffisant. Seulement ${stock} unité(s) disponible(s). Vous en avez déjà ${currentQty} dans le panier.`);
    return;
  }

  if (existingItem) {
    existingItem.quantity = currentQty + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  alert(`✅ ${product.name} a été ajouté au panier !`);
}

let currentFilter = 'Tous';
let currentSearch = '';
let currentSort = 'price-desc';
let currentBrands = [];

function renderProducts(productsToRender) {
  const container = document.getElementById('products-container');
  if (!container) return;
  container.innerHTML = '';
  if (!productsToRender || productsToRender.length === 0) {
    container.innerHTML = '<p class="empty-message">Aucun produit trouvé.</p>';
    return;
  }
  productsToRender.forEach((product, index) => {
    const delay = index * 0.1;
    const card = document.createElement('article');
    card.className = 'glass-card product-card animate-fade-in';
    card.style.animationDelay = `${delay}s`;
    let badgeHtml = product.isNew ? '<span class="badge badge-new badge-positioned">Nouveau</span>' : '';
    if (product.discount) {
      badgeHtml += '<span class="badge badge-promo badge-positioned">-' + product.discount + '%</span>';
    }
    if (product.surCommande) {
      badgeHtml += '<span class="badge badge-surcommande badge-positioned-left">Sur commande</span>';
    }
    const stock = product.stock !== undefined ? product.stock : 10;
    const outOfStock = stock <= 0 && !product.surCommande;
    const lowStock = stock > 0 && stock <= 5 && !product.surCommande;
    if (outOfStock) {
      badgeHtml += '<span class="badge badge-outofstock badge-positioned-left">Rupture</span>';
    } else if (lowStock) {
      badgeHtml += '<span class="badge badge-lowstock badge-positioned-left">Stock: ' + stock + '</span>';
    }
    const disableBtn = (outOfStock || product.surCommande);
    const buttonHtml = disableBtn
      ? (product.surCommande
        ? `<button class="btn btn-outline btn-block btn-devis" onclick="demanderDevis(${product.id})">📩 Demander un devis</button>`
        : `<button class="btn btn-outline btn-block btn-disabled" disabled>Rupture de stock</button>`)
      : `<button class="btn btn-primary btn-block" onclick="addToCart(${product.id})">Ajouter au panier</button>`;
    const deliveryHtml = product.surCommande
      ? `<p class="delivery-surcommande">⏳ Pièce sur commande - délai 2 à 4 semaines</p>`
      : (outOfStock ? `<p class="delivery-outofstock">❌ Produit temporairement indisponible</p>`
        : (lowStock ? `<p class="delivery-lowstock">⚠️ Plus que ${stock} en stock</p>`
          : `<p class="delivery-instock">✅ En stock (${stock} unités)</p>`));
    card.innerHTML = `
      <div class="product-card-click" onclick="window.location.href='details.html?id=${product.id}'">
        <img src="${getProductImage(product)}" alt="${product.name}" class="product-image" onerror="this.src='${getFallbackImage(product)}'">
        ${badgeHtml}
      </div>
      <div class="product-info">
        <h3 class="product-title product-title-click" onclick="window.location.href='details.html?id=${product.id}'">${product.name}</h3>
        <span class="product-brand">${product.brand} - ${product.category}</span>
        <p class="product-desc">${product.description || ''}</p>
        ${deliveryHtml}
        <div class="product-price">${product.discount ? `<span class="old-price">${formatPrice(product.price)}</span> <span class="promo-price">${formatPrice(product.price * (1 - product.discount / 100))}</span>` : formatPrice(product.price)}</div>
        ${buttonHtml}
      </div>
    `;
    container.appendChild(card);
  });
}

function applyFilters() {
  let filtered = [...products];

  if (currentFilter !== 'Tous') {
    filtered = filtered.filter(p => p.category === currentFilter);
  }

  if (currentSearch) {
    const term = currentSearch.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }

  if (currentBrands.length > 0) {
    filtered = filtered.filter(p => currentBrands.includes(p.brand));
  }

  switch (currentSort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'default':
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
      break;
    case 'name-desc':
      filtered.sort((a, b) => b.name.localeCompare(a.name, 'fr'));
      break;
    case 'newest':
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
  }

  renderProducts(filtered);
}

function setupFilters() {
  const categoryFilters = document.getElementById('category-filters');
  if (!categoryFilters) return;

  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active';
  allBtn.textContent = 'Tous';
  allBtn.onclick = () => filterProducts('Tous');
  categoryFilters.appendChild(allBtn);

  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.textContent = category;
    btn.onclick = (e) => filterProducts(category, e.target);
    categoryFilters.appendChild(btn);
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      applyFilters();
    });
  }

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFilters();
    });
  }
}

function setupBrandFilters(category) {
  const brandContainer = document.getElementById('brand-filters');
  if (!brandContainer) return;

  if (category === 'Tous') {
    brandContainer.style.display = 'none';
    currentBrands = [];
    return;
  }

  const availableBrands = [...new Set(products.filter(p => p.category === category).map(p => p.brand))];
  if (availableBrands.length <= 1) {
    brandContainer.style.display = 'none';
    currentBrands = [];
    return;
  }

  brandContainer.style.display = 'flex';
  brandContainer.innerHTML = '';
  const label = document.createElement('span');
  label.textContent = 'Marque :';
  label.style.cssText = 'color: var(--text-muted); font-weight: 600; margin-right: 0.5rem;';
  brandContainer.appendChild(label);

  let anyChecked = false;
  availableBrands.forEach(brand => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `brand-${brand}`;
    checkbox.value = brand;
    checkbox.style.marginRight = '0.25rem';

    const lbl = document.createElement('label');
    lbl.htmlFor = `brand-${brand}`;
    lbl.textContent = brand;
    lbl.style.cssText = 'color: var(--text-light); margin-right: 1rem; cursor: pointer;';

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        currentBrands.push(brand);
      } else {
        currentBrands = currentBrands.filter(b => b !== brand);
      }
      applyFilters();
    });

    brandContainer.appendChild(checkbox);
    brandContainer.appendChild(lbl);
  });
}

function filterProducts(category, clickedBtn) {
  currentFilter = category;
  if (clickedBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
  } else {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    const match = [...document.querySelectorAll('.filter-btn')].find(b => b.textContent === category);
    if (match) match.classList.add('active');
    else document.querySelector('.filter-btn')?.classList.add('active');
  }

  currentBrands = [];
  setupBrandFilters(category);
  applyFilters();
}

// Cart Page Logic
function renderCart() {
  const cartBody = document.getElementById('cart-body');
  const cartTotal = document.getElementById('cart-total');
  if (!cartBody || !cartTotal) return;
  cartBody.innerHTML = '';
  if (!cart || cart.length === 0) {
    cartBody.innerHTML = '<tr><td colspan="5" class="cart-empty">Votre panier est vide.</td></tr>';
    cartTotal.textContent = 'Total: ' + formatPrice(0);
    return;
  }
  let total = 0;
  cart.forEach((item, index) => {
    const qty = item.quantity || 1;
    const prod = Array.isArray(products) ? products.find(p => p.id === item.id) : null;
    const discount = prod ? (prod.discount || 0) : 0;
    const unitPrice = item.price * (1 - discount / 100);
    const itemTotal = unitPrice * qty;
    total += itemTotal;
    const tr = document.createElement('tr');
    tr.className = 'animate-fade-in';
    tr.style.animationDelay = `${index * 0.1}s`;
    tr.innerHTML = `
      <td>
        <div class="cart-product-info">
          <img src="${getProductImage(item)}" alt="${item.name}" class="cart-thumb" onerror="this.src='${getFallbackImage(item)}'">
          <span>${item.name}</span>
        </div>
      </td>
      <td>${discount > 0 ? `<span class="old-price">${formatPrice(item.price)}</span> <span class="promo-price">${formatPrice(unitPrice)}</span>` : formatPrice(item.price)}</td>
      <td>
        <div class="cart-qty">
          <button onclick="updateQuantity(${item.id}, -1)" class="btn btn-outline cart-qty-btn">-</button>
          <span>${qty}</span>
          <button onclick="updateQuantity(${item.id}, 1)" class="btn btn-outline cart-qty-btn">+</button>
        </div>
      </td>
      <td>${formatPrice(itemTotal)}</td>
      <td>
        <button onclick="removeFromCart(${item.id})" class="btn btn-outline cart-remove-btn">Retirer</button>
      </td>
    `;
    cartBody.appendChild(tr);
  });
  cartTotal.textContent = `Total: ${formatPrice(total)}`;
}

function updateQuantity(productId, change) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  const product = products.find(p => p.id === productId);
  const maxStock = product ? (product.stock || 10) : 10;
  const qty = item.quantity || 1;
  const newQty = qty + change;
  if (newQty > maxStock) {
    alert(`❌ Stock insuffisant. Seulement ${maxStock} unité(s) disponible(s).`);
    return;
  }
  item.quantity = newQty;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    renderCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

function checkout() {
  const currentUser = JSON.parse(SafeStorage.getItem('currentUser'));
  if (!currentUser) {
    alert("Veuillez vous connecter pour passer commande.");
    window.location.href = 'connexion.html';
    return;
  }
  if (!cart || cart.length === 0) {
    alert("Votre panier est vide.");
    return;
  }
  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  alert(`✅ Commande validée avec succès !\nTotal: ${formatPrice(total)}\nMerci de votre confiance !`);
  cart = [];
  saveCart();
  renderCart();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  if (document.getElementById('products-container')) {
    setupFilters();
    renderProducts(products);
    const currInd = document.getElementById('currency-indicator');
    if (currInd) {
      const code = getCurrency();
      const sym = CURRENCIES[code]?.symbol || '€';
      const labels = { EUR: 'Euro', USD: 'Dollar US', DZD: 'Dinar Algérien' };
      currInd.textContent = sym + ' — ' + (labels[code] || code);
    }
    const pendingFilter = SafeStorage.getItem('filter');
    if (pendingFilter) {
      setTimeout(() => {
        const buttons = document.querySelectorAll('.filter-btn');
        for (let btn of buttons) {
          if (btn.textContent === pendingFilter) {
            btn.click();
            break;
          }
        }
        SafeStorage.removeItem('filter');
        const pendingKeyword = SafeStorage.getItem('keyword');
        if (pendingKeyword) {
          const searchInput = document.getElementById('search-input');
          if (searchInput) {
            searchInput.value = pendingKeyword;
            currentSearch = pendingKeyword;
            applyFilters();
          }
          SafeStorage.removeItem('keyword');
        }
        const pendingBrand = SafeStorage.getItem('brand');
        if (pendingBrand) {
          const brandCheckbox = document.getElementById('brand-' + pendingBrand);
          if (brandCheckbox) {
            brandCheckbox.checked = true;
            currentBrands.push(pendingBrand);
            applyFilters();
          }
          SafeStorage.removeItem('brand');
        }
      }, 100);
    }
  }

  if (document.getElementById('cart-body')) {
    renderCart();
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
  }

  if (document.getElementById('product-details-container')) {
    renderProductDetails();
  }
});

// Render product details page
function renderProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  if (!productId || isNaN(productId)) {
    document.getElementById('product-details-container').innerHTML = '<h2 class="detail-not-found">Produit introuvable</h2>';
    return;
  }
  const product = products.find(p => p.id === productId);
  if (!product) {
    document.getElementById('product-details-container').innerHTML = '<h2 class="detail-not-found">Produit introuvable</h2>';
    return;
  }
  const detailImg = document.getElementById('detail-image');
  detailImg.onerror = () => { detailImg.src = getFallbackImage(product); };
  detailImg.src = getProductImage(product);
  document.getElementById('detail-name').textContent = product.name;
  document.getElementById('detail-brand-category').textContent = `${product.brand} - ${product.category}`;
  const priceEl = document.getElementById('detail-price');
  if (product.discount) {
    priceEl.innerHTML = `<span class="old-price">${formatPrice(product.price)}</span> <span class="promo-price promo-price-lg">${formatPrice(product.price * (1 - product.discount / 100))}</span> <span class="promo-badge-detail">-${product.discount}%</span>`;
  } else {
    priceEl.textContent = formatPrice(product.price);
  }
  const stock = product.stock !== undefined ? product.stock : 10;
  const stockEl = document.getElementById('detail-stock');
  if (stockEl) {
    if (product.surCommande) {
      stockEl.innerHTML = '<span class="stock-surcommande">⏳ Sur commande - délai 2 à 4 semaines</span>';
    } else if (stock <= 0) {
      stockEl.innerHTML = '<span class="stock-outofstock">❌ Rupture de stock</span>';
    } else if (stock <= 5) {
      stockEl.innerHTML = `<span class="stock-lowstock">⚠️ Plus que ${stock} en stock</span>`;
    } else {
      stockEl.innerHTML = `<span class="stock-instock">✅ En stock (${stock} unités)</span>`;
    }
  }
  document.getElementById('detail-description').textContent = product.description || '';
  const specsList = document.getElementById('detail-specs');
  if (specsList) {
    if (product.caracteristiques && product.caracteristiques.length > 0) {
      specsList.innerHTML = product.caracteristiques.map(spec => `<li>${spec}</li>`).join('');
    } else {
      specsList.innerHTML = '<li>Aucune caractéristique spécifiée.</li>';
    }
  }
  const addBtn = document.getElementById('detail-add-btn');
  if (addBtn) {
    if (product.surCommande) {
      addBtn.textContent = '📩 Demander un devis';
      addBtn.className = 'btn btn-outline';
      addBtn.style.borderColor = '#f59e0b';
      addBtn.style.color = '#f59e0b';
      addBtn.onclick = () => demanderDevis(product.id);
      const info = document.createElement('p');
      info.style.cssText = 'color: #f59e0b; font-size: 0.9rem; margin-top: 0.5rem;';
      info.textContent = '⏳ Pièce sur commande - délai 2 à 4 semaines. Notre équipe vous contactera sous 48h.';
      addBtn.parentNode.insertBefore(info, addBtn.nextSibling);
    } else {
      addBtn.onclick = () => addToCart(product.id);
    }
  }

  const relatedContainer = document.getElementById('related-products');
  if (relatedContainer) {
    let related = products.filter(p => p.category === product.category && p.id !== product.id);
    related = related.sort(() => 0.5 - Math.random()).slice(0, 4);
    if (related.length === 0) {
      relatedContainer.innerHTML = '<p class="empty-message">Aucun produit similaire trouvé.</p>';
      return;
    }
    related.forEach((relProd) => {
      const card = document.createElement('article');
      card.className = 'glass-card product-card';
      const relBtn = relProd.surCommande
        ? `<button class="btn btn-outline related-btn related-btn-devis" onclick="demanderDevis(${relProd.id})">📩 Devis</button>`
        : `<button class="btn btn-outline related-btn" onclick="addToCart(${relProd.id})">Ajouter</button>`;
      card.innerHTML = `
        <div class="product-card-click" onclick="window.location.href='details.html?id=${relProd.id}'">
          <img src="${getProductImage(relProd)}" alt="${relProd.name}" class="product-image" onerror="this.src='${getFallbackImage(relProd)}'">
        </div>
        <div class="product-info related-info-padding">
          <h3 class="product-title product-title-click related-title-sm" onclick="window.location.href='details.html?id=${relProd.id}'">${relProd.name}</h3>
          <div class="product-price related-price">${relProd.discount ? `<span class="old-price">${formatPrice(relProd.price)}</span> <span class="promo-price">${formatPrice(relProd.price * (1 - relProd.discount / 100))}</span>` : formatPrice(relProd.price)}</div>
          ${relBtn}
        </div>
      `;
      relatedContainer.appendChild(card);
    });
  }
}
