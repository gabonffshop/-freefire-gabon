const produits = [
    {
        id: 1,
        nom: "Pack 110 Diamants",
        diamants: 110,
        prix: 650,
        categorie: "diamants",
        emoji: "💎"
    },

    {
        id: 2,
        nom: "Pack 231 Diamants",
        diamants: 231,
        prix: 1300,
        categorie: "diamants",
        emoji: "💎"
    },

    {
        id: 3,
        nom: "Duo 341 Diamants",
        diamants: 341,
        prix: 1950,
        categorie: "packs",
        emoji: "💎"
    },

    {
        id: 4,
        nom: "Pack 583 Diamants",
        diamants: 583,
        prix: 3300,
        categorie: "diamants",
        emoji: "💎"
    },

    {
        id: 5,
        nom: "Duo 693 Diamants",
        diamants: 693,
        prix: 3950,
        categorie: "packs",
        emoji: "💎"
    },

    {
        id: 6,
        nom: "Duo 814 Diamants",
        diamants: 814,
        prix: 4600,
        categorie: "packs",
        emoji: "💎"
    },

    {
        id: 7,
        nom: "Pack 1 188 Diamants",
        diamants: 1188,
        prix: 6500,
        categorie: "diamants",
        emoji: "💎"
    },

    {
        id: 8,
        nom: "Duo 1 298 Diamants",
        diamants: 1298,
        prix: 7150,
        categorie: "packs",
        emoji: "💎"
    },

    {
        id: 9,
        nom: "Duo 1 419 Diamants",
        diamants: 1419,
        prix: 7800,
        categorie: "packs",
        emoji: "💎"
    },

    {
        id: 10,
        nom: "Duo 1 771 Diamants",
        diamants: 1771,
        prix: 9800,
        categorie: "packs",
        emoji: "💎"
    },

    {
        id: 11,
        nom: "Booyah Pass",
        diamants: 0,
        prix: 1750,
        categorie: "booyah",
        emoji: "🏆"
    },

    {
        id: 12,
        nom: "Pack 2 112 Diamants",
        diamants: 2112,
        prix: 11750,
        categorie: "promotion",
        emoji: "🔥"
    }
];


let panier = [];

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const menu = document.getElementById("menu");
const mobileMenu = document.getElementById("mobileMenu");


/* =========================
   MENU MOBILE
========================= */

menu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});


/* =========================
   AFFICHER LES PRODUITS
========================= */

function afficherProduits(liste = produits) {

    productsContainer.innerHTML = "";

    if (liste.length === 0) {
        productsContainer.innerHTML =
            "<p>Aucune offre trouvée.</p>";
        return;
    }

    liste.forEach(produit => {

        const card = document.createElement("div");

        card.className = "product";

        card.innerHTML = `
            <div class="product-image">
                ${produit.emoji}
            </div>

            <div class="product-info">

                <h3>${produit.nom}</h3>

                ${
                    produit.diamants > 0
                    ? `<div class="diamonds">
                        💎 ${produit.diamants.toLocaleString("fr-FR")} diamants
                       </div>`
                    : `<div class="diamonds">
                        🏆 Booyah Pass
                       </div>`
                }

                <div class="price">
                    ${produit.prix.toLocaleString("fr-FR")} FCFA
                </div>

                <button
                    class="buy"
                    onclick="ajouterAuPanier(${produit.id})"
                >
                    Ajouter au panier
                </button>

            </div>
        `;

        productsContainer.appendChild(card);
    });
}


/* =========================
   RECHERCHE
========================= */

searchInput.addEventListener("input", () => {

    const recherche =
        searchInput.value.toLowerCase();

    const resultat = produits.filter(produit =>
        produit.nom.toLowerCase().includes(recherche)
    );

    afficherProduits(resultat);
});


/* =========================
   FILTRES
========================= */

function filtrer(categorie) {

    const resultat = produits.filter(
        produit => produit.categorie === categorie
    );

    afficherProduits(resultat);

    document
        .getElementById("boutique")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   AJOUT AU PANIER
========================= */

function ajouterAuPanier(id) {

    const produit = produits.find(
        produit => produit.id === id
    );

    if (!produit) return;

    panier.push(produit);

    mettreAJourPanier();

    cartPanel.classList.add("active");
}


/* =========================
   AFFICHER LE PANIER
========================= */

function mettreAJourPanier() {

    cartItems.innerHTML = "";

    if (panier.length === 0) {

        cartItems.innerHTML =
            "<p>Ton panier est vide.</p>";

    } else {

        panier.forEach((produit, index) => {

            const item =
                document.createElement("div");

            item.className = "cart-item";

            item.innerHTML = `
                <strong>${produit.nom}</strong>

                ${produit.prix.toLocaleString("fr-FR")} FCFA

                <br>

                <button
                    class="remove"
                    onclick="supprimerDuPanier(${index})"
                >
                    Supprimer
                </button>
            `;

            cartItems.appendChild(item);
        });
    }


    const total = panier.reduce(
        (somme, produit) =>
            somme + produit.prix,
        0
    );

    cartTotal.textContent =
        total.toLocaleString("fr-FR");

    cartCount.textContent =
        panier.length;
}


/* =========================
   SUPPRIMER
========================= */

function supprimerDuPanier(index) {

    panier.splice(index, 1);

    mettreAJourPanier();
}


/* =========================
   OUVRIR / FERMER PANIER
========================= */

cartButton.addEventListener("click", () => {
    cartPanel.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
});


/* =========================
   COMMANDER
========================= */

const checkoutButton =
    document.getElementById("checkoutButton");

const checkout =
    document.getElementById("checkout");

checkoutButton.addEventListener("click", () => {

    if (panier.length === 0) {
        alert("Ton panier est vide.");
        return;
    }

    checkout.classList.add("active");
});


/* =========================
   PRÉPARER LA COMMANDE
========================= */

const orderButton =
    document.getElementById("orderButton");

orderButton.addEventListener("click", () => {

    const playerId =
        document.getElementById("playerId").value.trim();

    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const message =
        document.getElementById("orderMessage");


    if (!playerId || !name || !phone) {

        message.innerHTML =
            "<br>⚠️ Remplis toutes les informations.";

        return;
    }


    let texte = "NOUVELLE COMMANDE\n\n";

    texte += "Client : " + name + "\n";
    texte += "Téléphone : " + phone + "\n";
    texte += "ID Free Fire : " + playerId + "\n\n";

    texte += "PRODUITS :\n";


    panier.forEach(produit => {

        texte +=
            "- " +
            produit.nom +
            " : " +
            produit.prix.toLocaleString("fr-FR") +
            " FCFA\n";
    });


    const total = panier.reduce(
        (somme, produit) =>
            somme + produit.prix,
        0
    );


    texte +=
        "\nTOTAL : " +
        total.toLocaleString("fr-FR") +
        " FCFA";


    message.innerHTML = `
        <br>
        ✅ Commande préparée !
        <br><br>
        <textarea
            id="orderText"
            style="
                width:100%;
                height:180px;
                background:#191919;
                color:white;
                border:1px solid #333;
                border-radius:8px;
                padding:10px;
            "
        >${texte}</textarea>
    `;
});


/* =========================
   DÉMARRAGE
========================= */

afficherProduits();
mettreAJourPanier();
