/* =====================================================
   FREE FIRE STORE GABON 🇬🇦
   SCRIPT PRINCIPAL
===================================================== */


/* =====================================================
   1. BASE DE DONNÉES DES OFFRES
===================================================== */

const products = [

    {
        id: 1,
        name: "110 Diamants",
        diamonds: 110,
        price: 650,
        category: "diamants",
        badge: "STANDARD"
    },

    {
        id: 2,
        name: "231 Diamants",
        diamonds: 231,
        price: 1300,
        category: "diamants",
        badge: "STANDARD"
    },

    {
        id: 3,
        name: "583 Diamants",
        diamonds: 583,
        price: 3300,
        category: "diamants",
        badge: "POPULAIRE"
    },

    {
        id: 4,
        name: "1 188 Diamants",
        diamonds: 1188,
        price: 6500,
        category: "diamants",
        badge: "MEILLEURE VENTE"
    },

    {
        id: 5,
        name: "Booyah Pass",
        diamonds: 0,
        price: 1750,
        category: "booyah",
        badge: "SAISON"
    },

    {
        id: 6,
        name: "Pack 341 Diamants",
        diamonds: 341,
        price: 1950,
        category: "packs",
        badge: "COMBO"
    },

    {
        id: 7,
        name: "Pack 693 Diamants",
        diamonds: 693,
        price: 3950,
        category: "packs",
        badge: "COMBO"
    },

    {
        id: 8,
        name: "Pack 814 Diamants",
        diamonds: 814,
        price: 4600,
        category: "packs",
        badge: "COMBO"
    },

    {
        id: 9,
        name: "Pack 1 298 Diamants",
        diamonds: 1298,
        price: 7150,
        category: "packs",
        badge: "PROMO"
    },

    {
        id: 10,
        name: "Pack 1 419 Diamants",
        diamonds: 1419,
        price: 7800,
        category: "packs",
        badge: "COMBO"
    },

    {
        id: 11,
        name: "Pack 1 771 Diamants",
        diamonds: 1771,
        price: 9800,
        category: "packs",
        badge: "SUPER COMBO"
    },

    {
        id: 12,
        name: "Pack 2 112 Diamants",
        diamonds: 2112,
        price: 11750,
        category: "promotions",
        badge: "VIP"
    }

];


/* =====================================================
   2. VARIABLES
===================================================== */

let cart = [];

let currentCategory = "all";

let searchTerm = "";


/* =====================================================
   3. ÉLÉMENTS HTML
===================================================== */

const productsContainer =
    document.getElementById("products-container");

const diamondsContainer =
    document.getElementById("diamonds-container");

const packsContainer =
    document.getElementById("packs-container");

const promotionsContainer =
    document.getElementById("promotions-container");

const searchInput =
    document.getElementById("search-input");

const categoryButtons =
    document.querySelectorAll(".category-button");

const floatingCart =
    document.getElementById("floating-cart");

const headerCart =
    document.getElementById("header-cart-btn");

const cartPanel =
    document.getElementById("cart-panel");

const cartOverlay =
    document.getElementById("cart-overlay");

const closeCartButton =
    document.getElementById("close-cart");

const cartItems =
    document.getElementById("cart-items");

const cartTotal =
    document.getElementById("cart-total");

const headerCartCount =
    document.getElementById("header-cart-count");

const floatingCartCount =
    document.getElementById("floating-cart-count");

const checkoutButton =
    document.getElementById("checkout-button");

const orderModal =
    document.getElementById("order-modal");

const modalClose =
    document.getElementById("modal-close");

const orderForm =
    document.getElementById("order-form");

const formTotal =
    document.getElementById("form-total");

const orderItemCount =
    document.getElementById("order-item-count");

const orderTotal =
    document.getElementById("order-total");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toast-message");

const menuButton =
    document.getElementById("menu-button");

const mobileMenu =
    document.getElementById("mobile-menu");

const goCartButton =
    document.getElementById("go-cart-button");


/* =====================================================
   4. INITIALISATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    renderProducts();

    renderDiamonds();

    renderPacks();

    renderPromotions();

    updateCart();

    setupNavigation();

});


/* =====================================================
   5. FORMATAGE DES PRIX
===================================================== */

function formatPrice(price) {

    return price.toLocaleString("fr-FR") + " FCFA";

}


/* =====================================================
   6. AFFICHAGE DES PRODUITS
===================================================== */

function renderProducts() {

    if (!productsContainer) return;

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            currentCategory === "all" ||
            product.category === currentCategory;

        const text =
            `${product.name} ${product.price} ${product.diamonds}`
                .toLowerCase();

        const matchesSearch =
            text.includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;

    });


    productsContainer.innerHTML = "";


    if (filteredProducts.length === 0) {

        productsContainer.innerHTML = `

            <div class="empty-products">

                <div class="empty-icon">
                    🔎
                </div>

                <h3>
                    Aucun résultat
                </h3>

                <p>
                    Aucune offre ne correspond
                    à ta recherche.
                </p>

            </div>

        `;

        return;

    }


    filteredProducts.forEach(product => {

        productsContainer.appendChild(
            createProductCard(product)
        );

    });

}


/* =====================================================
   7. CARTE PRODUIT
===================================================== */
