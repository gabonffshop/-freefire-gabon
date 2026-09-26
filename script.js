/* =====================================================
   FREE FIRE STORE GABON
   APPLICATION
   ===================================================== */


/* NUMÉRO WHATSAPP (source unique, réutilisé partout) */

const WHATSAPP_NUMBER = "24177629944";

/* NUMÉRO WHATSAPP DU CENTRE D'AIDE (support après-vente, distinct du numéro de commande) */

const HELP_WHATSAPP_NUMBER = "15616004442";


/* PRODUITS */

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
        badge: "BEST"
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
        category: "promotions",
        tags: ["packs", "promotions"],
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
        badge: "SUPER"
    },

    {
        id: 12,
        name: "Pack 2 112 Diamants",
        diamonds: 2112,
        price: 11750,
        category: "promotions",
        tags: ["packs", "promotions"],
        badge: "VIP"
    }

];


let cart = [];
let selectedProduct = null;
let selectedQuantity = 1;


/* DOM */

const loader = document.getElementById("loader");

const screens =
    document.querySelectorAll(".screen");

const bottomItems =
    document.querySelectorAll(".bottom-item");

const headerCount =
    document.getElementById("header-count");

const bottomCount =
    document.getElementById("bottom-count");

const shopProducts =
    document.getElementById("shop-products");

const packsProducts =
    document.getElementById("packs-products");

const promoProducts =
    document.getElementById("promo-products");

const productModal =
    document.getElementById("product-modal");

const cartModal =
    document.getElementById("cart-modal");

const checkoutModal =
    document.getElementById("checkout-modal");

const toast =
    document.getElementById("toast");

const toastText =
    toast.querySelector("p");


/* LOADER */

window.addEventListener("load", () => {

    setTimeout(() => {
        loader.classList.add("hide");
    }, 800);

});


/* PRIX */

function price(value) {

    return value
        .toLocaleString("fr-FR")
        .replace(/\u202f/g, " ")
        + " FCFA";

}


/* FILTRE PAR CATÉGORIE (gère les produits qui appartiennent à 2 catégories) */

function matchesCategory(product, filter) {

    if (filter === "all") {
        return true;
    }

    if (product.tags) {
        return product.tags.includes(filter);
    }

    return product.category === filter;

}


/* ICÔNES */

function productIcon(product) {

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


/* ART PRODUIT */

function productArt(product) {

    if (product.category === "diamants") {

        return `
            <img
                src="IMG_1699.jpeg"
                alt="Diamants Free Fire"
                class="product-photo diamond-photo">
        `;

    }

    if (product.category === "packs") {

        return `
            <img
                src="IMG_1700.webp"
                alt="Pack de Diamants Free Fire"
                class="product-photo pack-photo">
        `;

    }

    if (product.category === "booyah") {

        return `
            <img
                src="IMG_1702.jpeg"
                alt="Booyah Pass Free Fire"
                class="product-photo booyah-photo">
        `;

    }

    if (product.category === "promotions") {

        return `
            <img
                src="IMG_1703.jpeg"
                alt="Promotion Free Fire"
                class="product-photo promo-photo">
        `;

    }

    return productIcon(product);

}


/* CARTE */

function createProduct(product) {

    const article =
        document.createElement("article");

    article.className = "product";

    article.dataset.id = product.id;

    article.innerHTML = `

        <div class="product-art">
            ${productArt(product)}
        </div>

        <span class="product-badge">
            ${product.badge}
        </span>

        <h3>
            ${product.name}
        </h3>

        <p class="product-desc">
            ${
                product.diamonds
                ? `💎 ${product.diamonds.toLocaleString("fr-FR")} diamants`
                : "🎟️ Pass de saison"
            }
        </p>

        <div class="product-bottom">

            <strong class="product-price">
                ${price(product.price)}
            </strong>

            <button
                class="product-add"
                data-add="${product.id}">
                +
            </button>

        </div>
    `;

    article.addEventListener("click", event => {

        if (
            event.target.closest(".product-add")
        ) {
            return;
        }

        openProduct(product.id);

    });

    return article;
}


/* RENDU */

function render(container, list) {

    container.innerHTML = "";

    list.forEach(product => {

        container.appendChild(
            createProduct(product)
        );

    });

}


/* INITIAL PRODUCTS */

function renderAll() {

    render(
        shopProducts,
        products
    );

    render(
        packsProducts,
        products.filter(
            p => matchesCategory(p, "packs")
        )
    );

    render(
        promoProducts,
        products.filter(
            p => matchesCategory(p, "promotions")
        )
    );

}

renderAll();


/* NAVIGATION */

function openScreen(name) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    const target =
        document.getElementById(
            "screen-" + name
        );

    if (target) {

        target.classList.add("active");

    }

    bottomItems.forEach(item => {

        item.classList.remove("active");

        if (
            item.dataset.screen === name
        ) {
            item.classList.add("active");
        }

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* BOUTONS NAVIGATION */

document.addEventListener("click", event => {

    const button =
        event.target.closest("[data-screen]");

    if (!button) return;

    openScreen(
        button.dataset.screen
    );

});


/* RECHERCHE */

const searchOpen =
    document.getElementById("search-open");

const searchClose =
    document.getElementById("search-close");

const searchPanel =
    document.getElementById("search-panel");

const searchInput =
    document.getElementById("search-input");


searchOpen.addEventListener("click", () => {

    searchPanel.classList.add("open");

    setTimeout(() => {
        searchInput.focus();
    }, 200);

});


searchClose.addEventListener("click", () => {

    searchPanel.classList.remove("open");

});


searchInput.addEventListener("input", () => {

    const value =
        searchInput.value
            .toLowerCase()
            .trim();

    const result =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(value)
        );

    render(
        shopProducts,
        result
    );

    openScreen("shop");

});


/* FILTRES */

document.querySelectorAll(".tab")
    .forEach(tab => {

        tab.addEventListener("click", () => {

            document
                .querySelectorAll(".tab")
                .forEach(t =>
                    t.classList.remove("active")
                );

            tab.classList.add("active");

            const filter =
                tab.dataset.filter;

            const result =
                products.filter(
                    product =>
                        matchesCategory(product, filter)
                );

            render(
                shopProducts,
                result
            );

        });

    });


/* OUVRIR PRODUIT */

function openProduct(id) {

    selectedProduct =
        products.find(
            product =>
                product.id === Number(id)
        );

    if (!selectedProduct) return;

    selectedQuantity = 1;

    document.getElementById(
        "modal-art"
    ).innerHTML =
        productArt(selectedProduct);

    document.getElementById(
        "modal-badge"
    ).textContent =
        selectedProduct.badge;

    document.getElementById(
        "modal-name"
    ).textContent =
        selectedProduct.name;

    document.getElementById(
        "modal-description"
    ).textContent =
        selectedProduct.diamonds
        ? `${selectedProduct.diamonds.toLocaleString("fr-FR")} diamants Free Fire`
        : "Pass de saison Free Fire";

    updateProductModal();

    productModal.classList.add("open");

}


/* QUANTITÉ PRODUIT */

function updateProductModal() {

    document.getElementById(
        "quantity-value"
    ).textContent =
        selectedQuantity;

    document.getElementById(
        "modal-price"
    ).textContent =
        price(
            selectedProduct.price *
            selectedQuantity
        );

}


document.getElementById(
    "quantity-minus"
).addEventListener("click", () => {

    if (selectedQuantity > 1) {

        selectedQuantity--;

        updateProductModal();

    }

});


document.getElementById(
    "quantity-plus"
).addEventListener("click", () => {

    selectedQuantity++;

    updateProductModal();

});


/* AJOUT PRODUIT */

document.addEventListener("click", event => {

    const button =
        event.target.closest("[data-add]");

    if (!button) return;

    addToCart(
        Number(button.dataset.add)
    );

});


document.getElementById(
    "modal-add"
).addEventListener("click", () => {

    if (!selectedProduct) return;

    addToCart(
        selectedProduct.id,
        selectedQuantity
    );

    productModal.classList.remove("open");

});


/* PANIER */

function addToCart(id, quantity = 1) {

    const product =
        products.find(
            p => p.id === Number(id)
        );

    if (!product) return;

    const existing =
        cart.find(
            item => item.id === product.id
        );

    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({
            ...product,
            quantity
        });

    }

    saveCart();
    updateCart();

    showToast(
        `${product.name} ajouté au panier`
    );

}


function cartCount() {

    return cart.reduce(
        (sum, item) =>
            sum + item.quantity,
        0
    );

}


function cartTotal() {

    return cart.reduce(
        (sum, item) =>
            sum +
            item.price *
            item.quantity,
        0
    );

}


function updateCart() {

    const count =
        cartCount();

    headerCount.textContent =
        count;

    bottomCount.textContent =
        count;

    const list =
        document.getElementById(
            "cart-list"
        );

    const summaryCount =
        document.getElementById(
            "summary-count"
        );

    const summaryTotal =
        document.getElementById(
            "summary-total"
        );

    summaryCount.textContent =
        count;

    summaryTotal.textContent =
        price(cartTotal());

    list.innerHTML = "";

    if (!cart.length) {

        list.innerHTML = `

            <div class="empty">

                🛒

                <br><br>

                Ton panier est vide.

                <br><br>

                Choisis une offre
                pour commencer.

            </div>
        `;

        return;

    }


    cart.forEach(item => {

        const row =
            document.createElement("div");

        row.className = "cart-row";

        row.innerHTML = `

            <div class="cart-art">
                ${productIcon(item)}
            </div>

            <div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${price(item.price)}
                </p>

                <div class="cart-quantity">

                    <button
                        data-minus="${item.id}">
                        −
                    </button>

                    <b>
                        ${item.quantity}
                    </b>

                    <button
                        data-plus="${item.id}">
                        +
                    </button>

                </div>

                <button
                    class="cart-delete"
                    data-delete="${item.id}">
                    Supprimer
                </button>

            </div>

            <strong>
                ${price(
                    item.price *
                    item.quantity
                )}
            </strong>
        `;

        list.appendChild(row);

    });

}


/* COMMANDES PANIER */

document.addEventListener("click", event => {

    const plus =
        event.target.closest("[data-plus]");

    const minus =
        event.target.closest("[data-minus]");

    const del =
        event.target.closest("[data-delete]");


    if (plus) {

        changeQuantity(
            Number(plus.dataset.plus),
            1
        );

    }


    if (minus) {

        changeQuantity(
            Number(minus.dataset.minus),
            -1
        );

    }


    if (del) {

        cart =
            cart.filter(
                item =>
                    item.id !==
                    Number(del.dataset.delete)
            );

        saveCart();
        updateCart();

    }

});


function changeQuantity(id, amount) {

    const item =
        cart.find(
            p => p.id === id
        );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                p => p.id !== id
            );

    }

    saveCart();
    updateCart();

}


/* OUVRIR PANIER */

document.addEventListener("click", event => {

    if (
        event.target.closest(".cart-open")
    ) {

        updateCart();

        cartModal.classList.add("open");

    }

});


/* CHECKOUT */

document.getElementById(
    "go-checkout"
).addEventListener("click", () => {

    if (!cart.length) {

        showToast(
            "Ton panier est vide"
        );

        return;

    }

    document.getElementById(
        "checkout-total"
    ).textContent =
        price(cartTotal());

    cartModal.classList.remove("open");

    checkoutModal.classList.add("open");

});


/* FERMETURE MODALES */

document.querySelectorAll(".modal-close")
    .forEach(button => {

        button.addEventListener("click", () => {

            button
                .closest(".modal")
                .classList.remove("open");

        });

    });


document.querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener("click", event => {

            if (event.target === modal) {

                modal.classList.remove("open");

            }

        });

    });


/* CHECKOUT WHATSAPP */

document.getElementById(
    "checkout-form"
).addEventListener("submit", event => {

    event.preventDefault();

    const ffId =
        document.getElementById(
            "ff-id"
        ).value.trim();

    const name =
        document.getElementById(
            "customer-name"
        ).value.trim();

    const phone =
        document.getElementById(
            "customer-phone"
        ).value.trim();


    let message =
        `🔥 COMMANDE FREE FIRE STORE GABON 🇬🇦\n\n`;

    message +=
        `👤 Nom : ${name}\n`;

    message +=
        `🎮 ID Free Fire : ${ffId}\n`;

    message +=
        `📱 WhatsApp : ${phone}\n\n`;

    message +=
        `🛒 ARTICLES :\n`;


    cart.forEach(item => {

        message +=
            `• ${item.name} x${item.quantity} — ${price(
                item.price *
                item.quantity
            )}\n`;

    });


    message +=
        `\n💰 TOTAL : ${price(
            cartTotal()
        )}`;


    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        url,
        "_blank"
    );

    // Commande envoyée : on vide le panier et on referme
    // pour éviter un doublon si le client recommence.

    checkoutModal.classList.remove("open");

    event.target.reset();

    cart = [];

    saveCart();
    updateCart();

    showToast(
        "Commande envoyée sur WhatsApp ✅"
    );

});


/* TOAST */

let toastTimer;

function showToast(message) {

    toastText.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

}


/* LOCAL STORAGE */

function saveCart() {

    localStorage.setItem(
        "ff-store-cart",
        JSON.stringify(cart)
    );

}


function loadCart() {

    try {

        const saved =
            localStorage.getItem(
                "ff-store-cart"
            );

        if (saved) {

            cart =
                JSON.parse(saved);

        }

    } catch {

        cart = [];

    }

}


loadCart();
updateCart();


/* SYNCHRO LIEN CONTACT (numéro du centre d'aide/support, distinct du numéro de commande) */

document
    .querySelectorAll('a[href^="https://wa.me/"]')
    .forEach(link => {

        link.href =
            "https://wa.me/" + HELP_WHATSAPP_NUMBER;

    });


/* ESCAPE */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        document
            .querySelectorAll(".modal")
            .forEach(modal =>
                modal.classList.remove("open")
            );

        searchPanel.classList.remove("open");

    }

});


/* CENTRE D'AIDE */

const helpInput =
    document.getElementById("help-input");

const helpResult =
    document.getElementById("help-result");

const helpSubmit =
    document.getElementById("help-submit");

const helpYes =
    document.getElementById("help-yes");

const helpNo =
    document.getElementById("help-no");


if (helpSubmit) {

    helpSubmit.addEventListener("click", () => {

        helpResult.classList.add("show");

        helpResult.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}


if (helpYes) {

    helpYes.addEventListener("click", () => {

        helpResult.classList.remove("show");

        helpInput.value = "";

        showToast(
            "Content d'avoir pu t'aider 🙌"
        );

    });

}


if (helpNo) {

    helpNo.addEventListener("click", () => {

        const problem =
            helpInput.value.trim() ||
            "Diamants non reçus après ma commande.";

        let message =
            `🆘 CENTRE D'AIDE — FREE FIRE STORE GABON 🇬🇦\n\n`;

        message +=
            `Problème décrit :\n${problem}\n\n`;

        message +=
            `J'ai déjà essayé les solutions proposées, `;

        message +=
            `merci de m'aider directement.`;

        const url =
            "https://wa.me/" +
            HELP_WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);

        window.open(
            url,
            "_blank"
        );

    });

}
