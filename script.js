// Base de données des produits
const products = [
    // Diamants de base
    { id: 1, name: "110 Diamants", diamonds: 110, price: 650, category: "diamants", badge: "Standard" },
    { id: 2, name: "231 Diamants", diamonds: 231, price: 1300, category: "diamants", badge: "Standard" },
    { id: 3, name: "583 Diamants", diamonds: 583, price: 3300, category: "diamants", badge: "Populaire" },
    { id: 4, name: "1 188 Diamants", diamonds: 1188, price: 6500, category: "diamants", badge: "Meilleure Vente" },
    
    // Booyah Pass
    { id: 5, name: "Booyah Pass", diamonds: 0, price: 1750, category: "booyah", badge: "Saison" },
    
    // Packs combinés
    { id: 6, name: "Pack 341 Diamants", diamonds: 341, price: 1950, category: "packs", badge: "Combo" },
    { id: 7, name: "Pack 693 Diamants", diamonds: 693, price: 3950, category: "packs", badge: "Combo" },
    { id: 8, name: "Pack 814 Diamants", diamonds: 814, price: 4600, category: "packs", badge: "Combo" },
    { id: 9, name: "Pack 1 298 Diamants", diamonds: 1298, price: 7150, category: "packs", badge: "Promo" },
    { id: 10, name: "Pack 1 419 Diamants", diamonds: 1419, price: 7800, category: "packs", badge: "Combo" },
    { id: 11, name: "Pack 1 771 Diamants", diamonds: 1771, price: 9800, category: "packs", badge: "Super Combo" },
    { id: 12, name: "Pack 2 112 Diamants", diamonds: 2112, price: 11750, category: "promotions", badge: "VIP" }
];

// État du panier
let cart = [];

// Sélection des éléments DOM
const productsContainer = document.getElementById('products-container');
const categoryButtons = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('search-input');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

const cartModal = document.getElementById('cart-modal');
const cartOverlay = document.getElementById('cart-overlay');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCount = document.getElementById('cart-count');

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupEventListeners();
});

// Gestion du menu hamburger
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fermer le menu au clic sur un lien mobile
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Affichage des produits
function displayProducts(items) {
    productsContainer.innerHTML = '';
    if (items.length === 0) {
        productsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Aucun produit ne correspond à votre recherche.</p>';
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-visual">
                ${product.category === 'booyah' ? '🎟️' : '💎'}
                <span class="badge">${product.badge}</span>
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-details">${product.diamonds > 0 ? product.diamonds + ' Diamants Directs' : 'Pass de saison officiel'}</div>
                <div class="product-price">${product.price.toLocaleString('fr-FR')} FCFA</div>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">Ajouter au panier</button>
            </div>
        `;
        productsContainer.appendChild(card);
    });
}

// Filtres de catégories
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        filterProducts();
    });
});

// Recherche
searchInput.addEventListener('input', filterProducts);

function filterProducts() {
    const activeCategory = document.querySelector('.category-btn.active').dataset.category;
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filtered = products.filter(product => {
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || product.price.toString().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    displayProducts(filtered);
}

// Gestion du Panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    openCart();
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 20px 0;">Votre panier est vide.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            count += item.quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString('fr-FR')} FCFA</div>
                    <div class="cart-controls">
                        <button class="btn-qty" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn-qty" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="btn-remove" onclick="removeFromCart(${item.id})">Supprimer</button>
                    </div>
                </div>
                <div style="font-weight: bold;">${itemTotal.toLocaleString('fr-FR')} FCFA</div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    cartTotalPrice.textContent = `${total.toLocaleString('fr-FR')} FCFA`;
    cartCount.textContent = count;
}

// Contrôle de l'affichage du panier
function openCart() {
    cartModal.classList.add('open');
    cartOverlay.classList.add('open');
}

function closeCart() {
    cartModal.classList.remove('open');
    cartOverlay.classList.remove('open');
}

function setupEventListeners() {
    openCartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
}

// Génération de la commande WhatsApp
function sendOrderWhatsApp() {
    if (cart.length === 0) {
        alert("Votre panier est vide. Veuillez ajouter un produit avant de commander.");
        return;
    }

    const ffId = document.getElementById('ff-id').value.trim();
    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();

    if (!ffId || !name || !phone) {
        alert("Veuillez remplir tous les champs du formulaire.");
        return;
    }

    let productsListText = "";
    let totalCalculated = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalCalculated += itemTotal;
        productsListText += `- ${item.name} (x${item.quantity}) — ${itemTotal.toLocaleString('fr-FR')} FCFA\n`;
    });

    const message = `Bonjour, je souhaite passer une commande.

ID Free Fire : ${ffId}
Nom : ${name}
Numéro : ${phone}

Produits :
${productsListText}
Total : ${totalCalculated.toLocaleString('fr-FR')} FCFA`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/24177629944?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}
