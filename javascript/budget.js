document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('budget-slider');
  const input = document.getElementById('budget-input');
  const categorySelect = document.getElementById('category-select');
  const searchBtn = document.getElementById('budget-search-btn');
  const resultsContainer = document.getElementById('budget-results');

  if (categorySelect) {
    while (categorySelect.options.length > 1) categorySelect.remove(1);
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  slider.addEventListener('input', () => { input.value = slider.value; });
  input.addEventListener('input', () => {
    let val = parseInt(input.value) || 0;
    if (val < 50) val = 50;
    if (val > 20000) val = 20000;
    slider.value = val;
  });

  function filterByBudget() {
    const budget = parseInt(input.value) || 800;
    const category = categorySelect.value;

    let filtered = products.filter(p => p.price <= budget);

    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    filtered.sort((a, b) => b.price - a.price);

    renderBudgetResults(filtered, budget);
  }

  searchBtn.addEventListener('click', filterByBudget);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') filterByBudget(); });

  function renderBudgetResults(results, budget) {
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="glass-card">
          <svg class="icon-mb" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
          </svg>
          <h3 class="budget-noresult-title">Aucun résultat</h3>
          <p class="budget-noresult-text">Aucun composant trouvé dans votre budget. Essayez d'augmenter votre budget ou de changer de catégorie.</p>
        </div>
      `;
      return;
    }

    const cheapest = results[results.length - 1].price;
    const mostExpensive = results[0].price;
    const count = results.length;

    const summary = document.createElement('div');
    summary.className = 'glass-card budget-summary-card';
    summary.innerHTML = `
      <div class="cart-summary">
        <div>
          <p class="cart-summary-label">Budget max</p>
          <p class="cart-summary-value cart-summary-accent">${formatPrice(budget)}</p>
        </div>
        <div>
          <p class="cart-summary-label">Composants trouvés</p>
          <p class="cart-summary-value">${count}</p>
        </div>
        <div>
          <p class="cart-summary-label">Prix min - max</p>
          <p class="cart-summary-value">${formatPrice(cheapest)} - ${formatPrice(mostExpensive)}</p>
        </div>
      </div>
    `;
    resultsContainer.appendChild(summary);

    const recommended = results.slice(0, 6);

    if (recommended.length > 0) {
      const recSection = document.createElement('div');
      recSection.style.cssText = 'margin-bottom: 2rem;';
      recSection.innerHTML = `<h3 class="section-rec-title">🌟 Les meilleurs dans votre budget</h3>
        <div class="products-container" id="recommended-products"></div>`;
      resultsContainer.appendChild(recSection);

      const recContainer = recSection.querySelector('#recommended-products');
      recommended.forEach((product, index) => {
        const card = createProductCard(product, index, budget);
        recContainer.appendChild(card);
      });
    }

    const allSection = document.createElement('div');
    allSection.innerHTML = `<h3 class="section-all-title">Tous les composants compatibles (${results.length})</h3>
      <div class="products-container" id="all-results"></div>`;
    resultsContainer.appendChild(allSection);

    const allContainer = allSection.querySelector('#all-results');
    results.forEach((product, index) => {
      const card = createProductCard(product, index, budget);
      allContainer.appendChild(card);
    });

    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function createProductCard(product, index, budget) {
    const delay = index * 0.05;
    const card = document.createElement('article');
    card.className = 'glass-card product-card animate-fade-in';
    card.style.animationDelay = `${delay}s`;

    let badgeHtml = product.isNew
      ? '<span class="badge badge-new badge-positioned">Nouveau</span>'
      : '';
    if (product.surCommande) {
      badgeHtml += '<span class="badge badge-surcommande badge-positioned-left">Sur commande</span>';
    }

    const stock = product.stock !== undefined ? product.stock : 10;
    const outOfStock = stock <= 0 && !product.surCommande;
    if (outOfStock) {
      badgeHtml += '<span class="badge badge-outofstock badge-positioned-left">Rupture</span>';
    }

    const remaining = budget - product.price;
    const barPct = budget > 0 ? Math.min(100, Math.round((product.price / budget) * 100)) : 0;
    const barColor = barPct > 80 ? 'var(--danger)' : barPct > 50 ? 'var(--secondary-color)' : 'var(--success)';

    const btnHtml = product.surCommande
      ? `<button class="btn btn-outline btn-block-mt btn-devis" onclick="demanderDevis(${product.id})">📩 Demander un devis</button>`
      : (outOfStock
        ? `<button class="btn btn-outline btn-block-mt btn-disabled" disabled>Rupture de stock</button>`
        : `<button class="btn btn-primary btn-block-mt" onclick="addToCart(${product.id})">Ajouter au panier</button>`);

    card.innerHTML = `
      <div class="product-card-click" onclick="window.location.href='details.html?id=${product.id}'">
        <img src="${getProductImage(product)}" alt="${product.name}" class="product-image" onerror="this.src='${getFallbackImage(product)}'">
        ${badgeHtml}
        <div class="budget-bar-bg">
          <div class="budget-bar-fill" style="width: ${barPct}%; background: ${barColor};"></div>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-title product-title-click" onclick="window.location.href='details.html?id=${product.id}'">${product.name}</h3>
        <span class="product-brand">${product.brand} - ${product.category}</span>
        <div class="product-price">${product.discount ? `<span class="old-price">${formatPrice(product.price)}</span> <span class="promo-price">${formatPrice(product.price * (1 - product.discount / 100))}</span>` : formatPrice(product.price)}</div>
        <p class="budget-remaining">Reste ${formatPrice(remaining)} sur le budget</p>
        ${btnHtml}
      </div>
    `;
    return card;
  }
});
