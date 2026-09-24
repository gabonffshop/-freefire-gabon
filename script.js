// =====================================================
// FREE FIRE STORE GABON 🇬🇦
// SCRIPT.JS
// =====================================================


// ================= PRODUITS =================

const products = [

    {
        id: 1,
        name: "110 Diamants",
        diamonds: 110,
        price: 650,
        category: "diamants",
        badge: "Standard"
    },

    {
        id: 2,
        name: "231 Diamants",
        diamonds: 231,
        price: 1300,
        category: "diamants",
        badge: "Standard"
    },

    {
        id: 3,
        name: "583 Diamants",
        diamonds: 583,
        price: 3300,
        category: "diamants",
        badge: "Populaire"
    },

    {
        id: 4,
        name: "1 188 Diamants",
        diamonds: 1188,
        price: 6500,
        category: "diamants",
        badge: "Meilleure Vente"
    },

    {
        id: 5,
        name: "Booyah Pass",
        diamonds: 0,
        price: 1750,
        category: "booyah",
        badge: "Saison"
    },

    {
        id: 6,
        name: "Pack 341 Diamants",
        diamonds: 341,
        price: 1950,
        category: "packs",
        badge: "Combo"
    },

    {
        id: 7,
        name: "Pack 693 Diamants",
        diamonds: 693,
        price: 3950,
        category: "packs",
        badge: "Combo"
    },

    {
        id: 8,
        name: "Pack 814 Diamants",
        diamonds: 814,
        price: 4600,
        category: "packs",
        badge: "Combo"
    },

    {
        id: 9,
        name: "Pack 1 298 Diamants",
        diamonds: 1298,
        price: 7150,
        category: "promotions",
        badge: "Promo"
    },

    {
        id: 10,
        name: "Pack 1 419 Diamants",
        diamonds: 1419,
        price: 7800,
        category: "packs",
        badge: "Combo"
    },

    {
        id: 11,
        name: "Pack 1 771 Diamants",
        diamonds: 1771,
        price: 9800,
        category: "packs",
        badge: "Super Combo"
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


// ================= VARIABLES =================

let cart = [];

let currentCategory = "all";


// ================= ÉLÉMENTS =================

const productsContainer =
    document.getElementById("products");

const diamondsContainer =
    document.getElementById("diamants-products");

const packsContainer =
    document.getElementById("packs-products");

const promotionContainer =
    document.getElementById("promotion-products");

const searchInput =
    document.getElementById("search");

const cartElement =
    document.getElementById("cart");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cart-items");

const cartCount =
    document.getElementById("cart-count");

const cartTotal =
    document.getElementById("cart-total");

const modal =
    document.getElementById("modal");

const formTotal =
    document.getElementById("form-total");

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toast-text");


// ================= FORMAT PRIX =================

function formatPrice(price) {

    return price
        .toLocaleString("fr-FR")
        .replace(/\u202f/g, " ")
        + " FCFA";

}


// ================= ICÔNE PRODUIT =================

function getProductIcon(product) {

    if (product.category === "booyah") {
        return "🎟️";
    }

    if (product.category === "packs") {
        return "📦";
    }

    if (product.category === "promotions") {
        return "🔥";
    }

    return "💎";
}


// ================= CARTE PRODUIT =================

function createProductCard(product) {

    const card =
        document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `

        <div class="product-badge">
            ${product.badge}
        </div>

        <div class="product-icon">
            ${getProductIcon(product)}
        </div>

        <h3>
            ${product.name}
        </h3>

        ${
            product.diamonds > 0
            ?
            `<div class="product-diamonds">
                💎 ${product.diamonds.toLocaleString("fr-FR")} Diamants
            </div>`
            :
            `<div class="product-diamonds">
                🎟️ Pass de saison
            </div>`
        }

        <strong class="product-price">
            ${formatPrice(product.price)}
        </strong>

        <button
            class="add-button"
            data-add="${product.id}">
            🛒 AJOUTER AU PANIER
        </button>

    `;

    return card;
}


// ================= AFFICHER PRODUITS =================

function renderProducts(list = products) {

    productsContainer.innerHTML = "";

    if (list.length === 0) {

        productsContainer.innerHTML = `
            <div class="empty-cart">
                ❌ Aucune offre trouvée.
            </div>
        `;

        return;
    }


    list.forEach(product => {

        productsContainer.appendChild(
            createProductCard(product)
        );

    });

}


// ================= SECTIONS RAPIDES =================

function renderQuickSections() {

    diamondsContainer.innerHTML = "";

    packsContainer.innerHTML = "";

    promotionContainer.innerHTML = "";


    products
        .filter(product =>
            product.category === "diamants"
        )
        .forEach(product => {

            diamondsContainer.appendChild(
                createProductCard(product)
            );

        });


    products
        .filter(product =>
            product.category === "packs"
        )
        .forEach(product => {

            packsContainer.appendChild(
                createProductCard(product)
            );

        });


    products
        .filter(product =>
            product.category === "promotions"
        )
        .forEach(product => {

            promotionContainer.appendChild(
                createProductCard(product)
            );

        });

}


// ================= FILTRE =================

function filterProducts() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    let result = products.filter(product => {

        const matchesCategory =
            currentCategory === "all" ||
            product.category === currentCategory;


        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search);


        return matchesCategory && matchesSearch;

    });


    renderProducts(result);

}


// ================= BOUTONS CATÉGORIES =================

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                button.classList.add("active");


                currentCategory =
                    button.dataset.category;


                filterProducts();

            }
        );

    });


// ================= RECHERCHE =================

searchInput.addEventListener(
    "input",
    filterProducts
);


// ================= AJOUT PANIER =================

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === Number(productId)
        );


    if (!product) return;


    const existing =
        cart.find(
            item => item.id === product.id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    showToast(
        `${product.name} ajouté au panier`
    );

}


// ================= MODIFIER QUANTITÉ =================

function changeQuantity(productId, amount) {

    const item =
        cart.find(
            product =>
                product.id === Number(productId)
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== Number(productId)
            );

    }


    saveCart();

    updateCart();

}


// ================= SUPPRIMER =================

function removeFromCart(productId) {

    cart =
        cart.filter(
            product =>
                product.id !== Number(productId)
        );


    saveCart();

    updateCart();

}


// ================= TOTAL =================

function getCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

}


// ================= NOMBRE ARTICLES =================

function getCartCount() {

    return cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

}


// ================= AFFICHER PANIER =================

function updateCart() {

    const count =
        getCartCount();


    const total =
        getCartTotal();


    cartCount.textContent =
        count;


    cartTotal.textContent =
        formatPrice(total);


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                🛒

                <br><br>

                Ton panier est vide.

                <br><br>

                Ajoute une offre pour commencer.

            </div>

        `;

        return;

    }


    cart.forEach(item => {

        const element =
            document.createElement("div");


        element.className =
            "cart-item";


        element.innerHTML = `

            <div>

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">
                    ${formatPrice(item.price)}
                </div>

                <div class="cart-controls">

                    <button
                        data-minus="${item.id}">
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        data-plus="${item.id}">
                        +
                    </button>

                    <button
                        class="remove-item"
                        data-remove="${item.id}">
                        Supprimer
                    </button>

                </div>

            </div>

        `;


        cartItems.appendChild(element);

    });

}


// ================= ÉVÉNEMENTS PANIER =================

cartItems.addEventListener(
    "click",
    event => {

        const minus =
            event.target.dataset.minus;

        const plus =
            event.target.dataset.plus;

        const remove =
            event.target.dataset.remove;


        if (minus) {

            changeQuantity(
                minus,
                -1
            );

        }


        if (plus) {

            changeQuantity(
                plus,
                1
            );

        }


        if (remove) {

            removeFromCart(
                remove
            );

        }

    }
);


// ================= BOUTONS AJOUTER =================

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-add]"
            );


        if (button) {

            addToCart(
                button.dataset.add
            );

        }

    }
);


// ================= BOOYAH =================

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-product]"
            );


        if (!button) return;


        addToCart(
            button.dataset.product
        );

    }
);


// ================= OUVRIR PANIER =================

function openCart() {

    cartElement.classList.add("open");

    overlay.classList.add("open");

    document.body.style.overflow =
        "hidden";

}


// ================= FERMER PANIER =================

function closeCart() {

    cartElement.classList.remove("open");

    overlay.classList.remove("open");

    document.body.style.overflow =
        "";

}


document
    .getElementById("open-cart")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("close-cart")
    .addEventListener(
        "click",
        closeCart
    );


overlay.addEventListener(
    "click",
    closeCart
);


// ================= CHECKOUT =================

document
    .getElementById("checkout")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "Ton panier est vide"
                );

                return;

            }


            formTotal.textContent =
                formatPrice(
                    getCartTotal()
                );


            modal.classList.add("open");

        }
    );


// ================= FERMER MODALE =================

document
    .getElementById("close-modal")
    .addEventListener(
        "click",
        () => {

            modal.classList.remove("open");

        }
    );


modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            modal.classList.remove("open");

        }

    }
);


// ================= FORMULAIRE =================

document
    .getElementById("order-form")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (cart.length === 0) {

                showToast(
                    "Ton panier est vide"
                );

                return;

            }


            const ffId =
                document
                    .getElementById("ff-id")
                    .value
                    .trim();


            const name =
                document
                    .getElementById("client-name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("client-phone")
                    .value
                    .trim();


            let message =
                "🔥 *COMMANDE FREE FIRE STORE GABON* 🇬🇦%0A%0A";


            message +=
                "👤 Nom : " +
                encodeURIComponent(name) +
                "%0A";


            message +=
                "🎮 ID Free Fire : " +
                encodeURIComponent(ffId) +
                "%0A";


            message +=
                "📱 WhatsApp : " +
                encodeURIComponent(phone) +
                "%0A%0A";


            message +=
                "🛒 *ARTICLES*%0A";


            cart.forEach(item => {

                message +=
                    "• " +
                    encodeURIComponent(
                        item.name
                    ) +
                    " x" +
                    item.quantity +
                    " = " +
                    encodeURIComponent(
                        formatPrice(
                            item.price *
                            item.quantity
                        )
                    ) +
                    "%0A";

            });


            message +=
                "%0A💰 *TOTAL : " +
                encodeURIComponent(
                    formatPrice(
                        getCartTotal()
                    )
                ) +
                "*";


            const whatsappNumber =
                "24177629944";


            const url =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                message;


            window.open(
                url,
                "_blank"
            );

        }
    );


// ================= MENU MOBILE =================

const menuButton =
    document.getElementById(
        "menu-button"
    );

const mobileMenu =
    document.getElementById(
        "mobile-menu"
    );


menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "open"
        );

    }
);


// Fermer le menu après avoir
// cliqué sur un lien

mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "open"
                );

            }
        );

    });


// ================= BOUTONS SCROLL =================

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-scroll]"
            );


        if (!button) return;


        const sectionId =
            button.dataset.scroll;


        const section =
            document.getElementById(
                sectionId
            );


        if (section) {

            section.scrollIntoView({
                behavior: "smooth"
            });

        }

    }
);


// ================= TOAST =================

let toastTimer;


function showToast(message) {

    toastText.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


// ================= LOCAL STORAGE =================

function saveCart() {

    localStorage.setItem(
        "ff_gabon_cart",
        JSON.stringify(cart)
    );

}


function loadCart() {

    try {

        const saved =
            localStorage.getItem(
                "ff_gabon_cart"
            );


        if (saved) {

            cart =
                JSON.parse(saved);

        }

    } catch (error) {

        cart = [];

    }

}


// ================= ESCAPE =================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeCart();

            modal.classList.remove(
                "open"
            );

        }

    }
);


// ================= INITIALISATION =================

loadCart();

updateCart();

renderProducts();

renderQuickSections();
