<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Free Fire Store Gabon</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #f5f5f5;
            color: #111;
        }

        /* HEADER */

        header {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: rgba(255,255,255,0.96);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid #e5e5e5;
        }

        .header-content {
            max-width: 1200px;
            height: 72px;
            margin: auto;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo {
            font-size: 19px;
            font-weight: 900;
            letter-spacing: -0.5px;
        }

        .logo span {
            color: #ff8a00;
        }

        .menu {
            width: 44px;
            height: 44px;
            border: 1px solid #ddd;
            border-radius: 12px;
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 23px;
            cursor: pointer;
        }

        /* MOBILE MENU */

        .mobile-menu {
            display: none;
            position: absolute;
            top: 82px;
            right: 20px;
            width: 240px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 16px;
            box-shadow: 0 15px 40px rgba(0,0,0,.12);
            overflow: hidden;
        }

        .mobile-menu.active {
            display: block;
        }

        .mobile-menu a {
            display: block;
            padding: 17px;
            color: #111;
            text-decoration: none;
            border-bottom: 1px solid #eee;
            font-weight: 600;
        }

        .mobile-menu a:hover {
            background: #fff4e6;
            color: #e87500;
        }

        /* HERO */

        .hero {
            background: #111;
            color: white;
            padding: 70px 20px;
        }

        .hero-content {
            max-width: 1200px;
            margin: auto;
        }

        .country {
            display: inline-block;
            background: #fff;
            color: #111;
            padding: 8px 13px;
            border-radius: 30px;
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 22px;
        }

        .hero h1 {
            max-width: 700px;
            font-size: clamp(42px, 8vw, 75px);
            line-height: .95;
            letter-spacing: -3px;
            margin-bottom: 22px;
        }

        .hero h1 span {
            color: #ff8a00;
        }

        .hero p {
            max-width: 580px;
            color: #c8c8c8;
            line-height: 1.7;
            margin-bottom: 30px;
        }

        .primary-button {
            display: inline-block;
            padding: 15px 23px;
            background: #ff8a00;
            color: #111;
            border: none;
            border-radius: 11px;
            text-decoration: none;
            font-weight: 800;
            cursor: pointer;
        }

        .primary-button:hover {
            background: #ffa733;
        }

        /* GENERAL */

        .section {
            max-width: 1200px;
            margin: auto;
            padding: 65px 20px;
        }

        .section-label {
            color: #ff8a00;
            text-transform: uppercase;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }

        .section-title {
            font-size: 34px;
            letter-spacing: -1px;
            margin-bottom: 30px;
        }

        /* CATEGORIES */

        .categories {
            display: grid;
            grid-template-columns: repeat(2,1fr);
            gap: 12px;
        }

        .category {
            background: white;
            border: 1px solid #e5e5e5;
            border-radius: 16px;
            padding: 23px;
            cursor: pointer;
            transition: .2s;
        }

        .category:hover {
            transform: translateY(-3px);
            border-color: #ff8a00;
        }

        .category-icon {
            font-size: 30px;
            margin-bottom: 12px;
        }

        .category h3 {
            margin-bottom: 5px;
        }

        .category p {
            color: #777;
            font-size: 13px;
        }

        /* SEARCH */

        .search {
            margin-bottom: 25px;
        }

        .search input {
            width: 100%;
            padding: 16px;
            border: 1px solid #ddd;
            border-radius: 12px;
            background: white;
            outline: none;
            font-size: 15px;
        }

        .search input:focus {
            border-color: #ff8a00;
        }

        /* PRODUCTS */

        .products {
            display: grid;
            grid-template-columns: repeat(2,1fr);
            gap: 14px;
        }

        .product {
            background: white;
            border: 1px solid #e4e4e4;
            border-radius: 17px;
            overflow: hidden;
            transition: .2s;
        }

        .product:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(0,0,0,.08);
        }

        .product-top {
            height: 135px;
            background: #111;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 55px;
        }

        .product-info {
            padding: 17px;
        }

        .product-info h3 {
            font-size: 16px;
            margin-bottom: 8px;
        }

        .diamonds {
            color: #777;
            font-size: 13px;
            margin-bottom: 10px;
        }

        .price {
            font-size: 19px;
            font-weight: 900;
            margin-bottom: 14px;
        }

        .buy-button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 9px;
            background: #111;
            color: white;
            font-weight: 800;
            cursor: pointer;
        }

        .buy-button:hover {
            background: #ff8a00;
            color: #111;
        }

        /* HOW TO BUY */

        .steps {
            display: grid;
            gap: 12px;
        }

        .step {
            background: white;
            border: 1px solid #e4e4e4;
            border-radius: 15px;
            padding: 19px;
            display: flex;
            gap: 15px;
            align-items: center;
        }

        .step-number {
            min-width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #111;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
        }

        .step p {
            color: #666;
            font-size: 14px;
            margin-top: 4px;
        }

        /* REVIEWS */

        .reviews-header {
            background: white;
            border: 1px solid #e4e4e4;
            border-radius: 18px;
            padding: 25px;
            margin-bottom: 15px;
        }

        .rating {
            font-size: 34px;
            font-weight: 900;
        }

        .stars {
            color: #ff8a00;
            font-size: 22px;
            margin: 5px 0;
        }

        .review-note {
            color: #777;
            font-size: 12px;
        }

        .reviews {
            display: grid;
            gap: 12px;
        }

        .review {
            background: white;
            border: 1px solid #e4e4e4;
            border-radius: 15px;
            padding: 19px;
        }

        .review-name {
            font-weight: 800;
            margin-bottom: 7px;
        }

        .review p {
            color: #555;
            line-height: 1.5;
            font-size: 14px;
        }

        /* BANNER */

        .notice {
            background: #111;
            color: white;
            border-radius: 20px;
            padding: 30px;
        }

        .notice strong {
            color: #ff8a00;
        }

        .notice p {
            color: #ccc;
            margin-top: 10px;
            line-height: 1.6;
        }

        /* CART */

        .cart-button {
            position: fixed;
            right: 18px;
            bottom: 18px;
            width: 58px;
            height: 58px;
            border-radius: 50%;
            border: none;
            background: #ff8a00;
            font-size: 23px;
            cursor: pointer;
            z-index: 2000;
            box-shadow: 0 8px 25px rgba(0,0,0,.2);
        }

        .cart-count {
            position: absolute;
            top: -4px;
            right: -3px;
            background: #111;
            color: white;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            font-size: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .cart-panel {
            position: fixed;
            top: 0;
            right: -420px;
            width: 390px;
            max-width: 92%;
            height: 100vh;
            background: white;
            z-index: 3000;
            padding: 25px;
            box-shadow: -10px 0 35px rgba(0,0,0,.15);
            transition: .3s;
            overflow-y: auto;
        }

        .cart-panel.active {
            right: 0;
        }

        .cart-close {
            float: right;
            font-size: 27px;
            cursor: pointer;
        }

        .cart-item {
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }

        .remove-button {
            margin-top: 8px;
            border: none;
            background: #eee;
            padding: 7px 10px;
            border-radius: 7px;
            cursor: pointer;
        }

        .cart-total {
            font-size: 22px;
            font-weight: 900;
            margin: 25px 0;
        }

        .checkout {
            display: none;
        }

        .checkout.active {
            display: block;
        }

        .checkout input {
            width: 100%;
            padding: 13px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 9px;
            outline: none;
        }

        /* FOOTER */

        footer {
            background: #111;
            color: #aaa;
            text-align: center;
            padding: 35px 20px;
            line-height: 1.8;
        }

        footer strong {
            color: white;
        }

        @media (min-width: 700px) {

            .categories {
                grid-template-columns: repeat(4,1fr);
            }

            .products {
                grid-template-columns: repeat(4,1fr);
            }

            .steps {
                grid-template-columns: repeat(2,1fr);
            }

            .reviews {
                grid-template-columns: repeat(3,1fr);
            }
        }
    </style>
</head>

<body>

<header>
    <div class="header-content">

        <div class="logo">
            🔥 FREE FIRE <span>STORE</span>
        </div>

        <button class="menu" id="menu">
            ☰
        </button>

        <nav class="mobile-menu" id="mobileMenu">

            <a href="#accueil">Accueil</a>

            <a href="#boutique">Boutique</a>

            <a href="#comment-acheter">Comment acheter</a>

            <a href="#avis">Avis</a>

            <a href="#contact">Contact</a>

        </nav>

    </div>
</header>


<main>

<section class="hero" id="accueil">

    <div class="hero-content">

        <div class="country">
            🇬🇦 SERVICE DISPONIBLE UNIQUEMENT AU GABON
        </div>

        <h1>
            RECHARGE TES
            <span>DIAMANTS.</span>
        </h1>

        <p>
            Une boutique simple et rapide pour choisir ton offre
            Free Fire et préparer ta commande.
            Service exclusivement destiné au Gabon.
        </p>

        <a href="#boutique" class="primary-button">
            💎 Voir les offres
        </a>

    </div>

</section>


<section class="section">

    <div class="section-label">
        Nos catégories
    </div>

    <h2 class="section-title">
        Choisis ce que tu recherches
    </h2>

    <div class="categories">

        <div class="category" onclick="filtrer('diamants')">
            <div class="category-icon">💎</div>
            <h3>Diamants</h3>
            <p>Choisir une quantité</p>
        </div>

        <div class="category" onclick="filtrer('packs')">
            <div class="category-icon">🎁</div>
            <h3>Packs</h3>
            <p>Offres combinées</p>
        </div>

        <div class="category" onclick="filtrer('promotion')">
            <div class="category-icon">🔥</div>
            <h3>Promotions</h3>
            <p>Offres spéciales</p>
        </div>

        <div class="category" onclick="filtrer('booyah')">
            <div class="category-icon">🏆</div>
            <h3>Booyah Pass</h3>
            <p>Pass disponible</p>
        </div>

    </div>

</section>


<section class="section" id="boutique">

    <div class="section-label">
        Boutique
    </div>

    <h2 class="section-title">
        Nos offres <span>Free Fire</span>
    </h2>

    <div class="search">

        <input
            type="text"
            id="search"
            placeholder="🔎 Rechercher une offre..."
        >

    </div>

    <div class="products" id="products"></div>

</section>


<section class="section" id="comment-acheter">

    <div class="section-label">
        Guide d'achat
    </div>

    <h2 class="section-title">
        Comment effectuer un achat ?
    </h2>

    <div class="steps">

        <div class="step">
            <div class="step-number">1</div>

            <div>
                <strong>Choisis ton offre</strong>
                <p>Sélectionne les diamants ou le pack souhaité.</p>
            </div>
        </div>

        <div class="step">
            <div class="step-number">2</div>

            <div>
                <strong>Ajoute au panier</strong>
                <p>Ajoute une ou plusieurs offres à ton panier.</p>
            </div>
        </div>

        <div class="step">
            <div class="step-number">3</div>

            <div>
                <strong>Entre ton ID Free Fire</strong>
                <p>Vérifie attentivement ton identifiant joueur.</p>
            </div>
        </div>

        <div class="step">
            <div class="step-number">4</div>

            <div>
                <strong>Vérifie ta commande</strong>
                <p>Contrôle les produits et le montant total.</p>
            </div>
        </div>

        <div class="step">
            <div class="step-number">5</div>

            <div>
                <strong>Commande sur WhatsApp</strong>
                <p>Appuie sur le bouton et la discussion WhatsApp s'ouvrira.</p>
            </div>
        </div>

        <div class="step">
            <div class="step-number">6</div>

            <div>
                <strong>Envoie la commande</strong>
                <p>Le message sera préparé automatiquement dans WhatsApp.</p>
            </div>
        </div>

    </div>

</section>


<section class="section" id="avis">

    <div class="section-label">
        Avis
    </div>

    <h2 class="section-title">
        Ce que pensent nos clients
    </h2>

    <div class="reviews-header">

        <div class="rating">
            4,0 / 5
        </div>

        <div class="stars">
            ⭐⭐⭐⭐☆
        </div>

        <div class="review-note">
            Avis de démonstration — à remplacer par les avis réels des clients.
        </div>

    </div>


    <div class="reviews">

        <div class="review">
            <div class="review-name">Client Free Fire 🇬🇦</div>
            <div>⭐⭐⭐⭐⭐</div>
            <br>
            <p>
                « J'ai essayé, j'ai reçu mes diamants sans problème. »
            </p>
        </div>

        <div class="review">
            <div class="review-name">Joueur du Gabon 🇬🇦</div>
            <div>⭐⭐⭐⭐☆</div>
            <br>
            <p>
                « La commande est simple et les étapes sont faciles à suivre. »
            </p>
        </div>

        <div class="review">
            <div class="review-name">Client Free Fire 🇬🇦</div>
            <div>⭐⭐⭐⭐⭐</div>
            <br>
            <p>
                « J'ai suivi les étapes et ma commande s'est bien passée. »
            </p>
        </div>

    </div>

</section>


<section class="section">

    <div class="notice">

        <strong>🇬🇦 IMPORTANT</strong>

        <p>
            Ce service est disponible uniquement pour les clients
            situés au Gabon. Les prix sont affichés en FCFA.
        </p>

    </div>

</section>

</main>


<button class="cart-button" id="cartButton">

    🛒

    <span class="cart-count" id="cartCount">
        0
    </span>

</button>


<div class="cart-panel" id="cartPanel">

    <span class="cart-close" id="closeCart">
        ×
    </span>

    <h2>🛒 Ton panier</h2>

    <br>

    <div id="cartItems">
        Ton panier est vide.
    </div>

    <div class="cart-total">

        Total :
        <span id="cartTotal">0</span>
        FCFA

    </div>

    <button
        class="primary-button"
        id="checkoutButton"
    >
        Commander sur WhatsApp
    </button>


    <div class="checkout" id="checkout">

        <br>

        <h3>Informations de commande</h3>

        <br>

        <input
            type="text"
            id="playerId"
            placeholder="🎮 ID Free Fire"
        >

        <input
            type="text"
            id="customerName"
            placeholder="👤 Ton nom"
        >

        <input
            type="tel"
            id="phone"
            placeholder="📱 Ton numéro"
        >

        <br>

        <button
            class="primary-button"
            id="orderButton"
        >
            📲 Préparer ma commande
        </button>

    </div>

</div>


<footer id="contact">

    <strong>🔥 FREE FIRE STORE GABON</strong>

    <br>

    🇬🇦 Service disponible uniquement au Gabon

    <br>

    💬 Commandes et assistance via WhatsApp

    <br><br>

    © 2026 Free Fire Store Gabon

</footer>


<script src="script.js"></script>

</body>
</html>
