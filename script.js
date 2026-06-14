/* ============================================
   LA TERRASSE – script.js
   Charge le menu depuis Google Sheets (CSV publié)
   et génère les catégories accordéon.
   ============================================
   
   CONFIGURATION :
   1. Dans Google Sheets, allez dans :
      Fichier → Partager → Publier sur le Web
      → Sélectionnez votre feuille → Format : CSV
      → Cliquer "Publier" et copiez l'URL.
   2. Collez cette URL dans SHEET_CSV_URL ci-dessous.
   3. Votre feuille doit avoir ces colonnes (ligne 1 = en-têtes) :
      Catégorie | Catégorie_EN | Icône | Nom | Description | Prix
   ============================================ */

const SHEET_CSV_URL = "VOTRE_URL_GOOGLE_SHEETS_CSV_ICI"; 

// Catégories par défaut si le Google Sheet n'est pas encore configuré 
const DEFAULT_MENU = [
  {
    category: "Petit Déjeuner", categoryEN: "Breakfast", icon: "☕",
    items: [
      { name: "Petit Déjeuner : Du Jour", desc: "Café au choix - Eau (0.5L) - Jus au choix (Citron / Fraise) - Cake ou Croissant", price: "9.500 DT" },
      { name: "Petit Déjeuner : 1 Personne", desc: "Café au choix - Eau (0.5L) - Jus au choix - Crêpe chocolat mini ou mini gaufre - Omelette - Nuggets ou Escalope panée - Charcuterie - Fruits de saison", price: "16.000 DT" },
      { name: "Petit Déjeuner : 1 Personne 'La Terrasse'", desc: "Café au choix + Yaourt - Eau (0.5L) - Jus au choix (Citron / Fraise) - Crêpe chocolat ou gaufre - Omelette - Toast - Mini ojja - Salade de fruits + Choufen yaourt", price: "25.000 DT" },
      { name: "Petit Déjeuner : 2 Personnes", desc: "Cafés au choix + 2 Eau (0.5L) - 2 Jus au choix + 1 Crêpe salée - Crêpe sucrée + gaufre - 2 Omelettes - Toast - Nuggets - Escalope panée + Charcuterie + Salade de fruits + Fromage + 2 yaourts + 1 Galette + Ojja", price: "40.000 DT" }
    ]
  },
  {
    category: "Cafés & Boissons Chaudes", categoryEN: "Coffees & Hot Drinks", icon: "☕",
    items: [
      { name: "Thé Menthe", desc: "Thé vert infusé à la menthe fraîche", price: "2.500 DT" },
      { name: "Thé Infusion", desc: "Sélection de plantes en infusion", price: "3.000 DT" },
      { name: "Express", desc: "Café espresso court et serré", price: "3.500 DT" },
      { name: "Capuccin", desc: "Café macchiato tunisien classique", price: "4.000 DT" },
      { name: "Américain", desc: "Café allongé style américain", price: "4.000 DT" },
      { name: "Direct", desc: "Café au lait chaud", price: "4.500 DT" },
      { name: "Macchiato Chaud", desc: "Espresso avec une touche de mousse de lait", price: "5.000 DT" },
      { name: "Chocolat au Lait", desc: "Chocolat chaud onctueux", price: "5.000 DT" },
      { name: "Café Turc", desc: "Café traditionnel préparé à la tunisienne/turque", price: "5.000 DT" },
      { name: "Café Turc Spécial", desc: "Café turc parfumé à l'eau de fleur d'oranger ou de rose", price: "6.000 DT" },
      { name: "Cappuccino", desc: "Espresso, lait chaud et généreuse mousse de lait", price: "6.500 DT" },
      { name: "Thé Amande", desc: "Thé servi avec des amandes entières grillées", price: "7.000 DT" },
      { name: "Latté Chaud Arôme", desc: "Au choix : Caramel - Noisette - Vanille - Chocolat", price: "7.000 DT" },
      { name: "Thé Pignon", desc: "Le traditionnel thé tunisien aux pignons de pin", price: "8.500 DT" },
      { name: "Latté Chaud Gourmand", desc: "Au choix : Nutella - Spéculoos", price: "8.500 DT" }
    ]
  },
  {
    category: "Cafés Glacés & Milkshakes", categoryEN: "Iced Coffees & Milkshakes", icon: "🥤",
    items: [
      { name: "Ice Américain", desc: "Café américain allongé servi sur glaçons", price: "5.000 DT" },
      { name: "Latté Glacé", desc: "Lait froid, espresso et glaçons", price: "7.500 DT" },
      { name: "Frappuccino", desc: "Café frappé glacé et crème", price: "9.000 DT" },
      { name: "Moka Classique", desc: "Café, chocolat et lait glacé", price: "9.000 DT" },
      { name: "Milkshake Parfum Classique", desc: "Au choix : Chocolat - Caramel - Vanille", price: "10.000 DT" },
      { name: "Milkshake Fruits", desc: "Au choix : Fraise - Banane", price: "11.000 DT" },
      { name: "Moka (Nutella)", desc: "Café glacé moka gourmand au vrai Nutella", price: "11.000 DT" },
      { name: "Milkshake Gourmand", desc: "Au choix : Nutella - Spéculoos - Oreo", price: "12.000 DT" }
    ]
  },
  {
    category: "Salades", categoryEN: "Salads", icon: "🥗",
    items: [
      { name: "Salade César", desc: "Laitue, poulet grillé, parmesan, croûtons, sauce César", price: "16.000 DT" },
      { name: "Salade de Fruits 'La Terrasse'", desc: "Sélection de fruits frais de saison", price: "20.000 DT" }
    ]
  },
  {
    category: "Sandwichs & Burgers", categoryEN: "Sandwiches & Burgers", icon: "🍔",
    items: [
      { name: "Makloub Jambon", desc: "Pain makloub traditionnel, jambon, fromage", price: "9.000 DT" },
      { name: "Makloub Thon", desc: "Pain makloub traditionnel au thon", price: "10.000 DT" },
      { name: "Makloub Escalope", desc: "Pain makloub à l'escalope grillée", price: "10.000 DT" },
      { name: "Makloub Escalope Panée", desc: "Makloub à l'escalope croustillante", price: "11.000 DT" },
      { name: "Makloub Cordon Bleu", desc: "Makloub généreux au cordon bleu", price: "12.000 DT" },    
      { name: "Libanais Escalope", desc: "Pain libanais roulé à l'escalope", price: "10.000 DT" },
      { name: "Libanais Escalope Panée", desc: "Pain libanais roulé, escalope panée", price: "11.000 DT" },
      { name: "Libanais Cordon Bleu", desc: "Pain libanais, cordon bleu", price: "12.000 DT" },
      { name: "Baguette Farcie Escalope", desc: "Pain baguette farci à l'escalope", price: "12.000 DT" },
      { name: "Baguette Corne Escalope", desc: "Spécialité de pain en corne à l'escalope", price: "12.000 DT" },
      { name: "Baguette Farcie Escalope Panée", desc: "Baguette farcie à l'escalope croustillante", price: "14.000 DT" },
      { name: "Baguette Corne Escalope Panée", desc: "Pain en corne, escalope panée", price: "14.000 DT" },
      { name: "Baguette Farcie Cordon Bleu", desc: "Baguette farcie au cordon bleu", price: "15.000 DT" },
      { name: "Baguette Corne Cordon Bleu", desc: "Pain en corne farci au cordon bleu", price: "15.000 DT" },
      { name: "Ciabatta Escalope", desc: "Pain italien ciabatta, escalope", price: "10.000 DT" }, 
      { name: "Ciabatta Escalope Panée", desc: "Ciabatta, escalope panée croustillante", price: "11.000 DT" },
      { name: "Ciabatta Cordon Bleu", desc: "Ciabatta au cordon bleu savoureux", price: "13.000 DT" },
      { name: "Tacos Standard Escalope", desc: "Tacos classique à l'escalope", price: "11.000 DT" },
      { name: "Tacos Standard Escalope Panée", desc: "Tacos classique à l'escalope panée", price: "12.000 DT" },
      { name: "Tacos Standard Cordon Bleu", desc: "Tacos classique au cordon bleu", price: "14.000 DT" },
      { name: "Panozzo Escalope Grillée", desc: "Pain Panozzo, escalope grillée, fromage", price: "12.000 DT" },
      { name: "Panozzo Escalope Panée", desc: "Pain Panozzo, escalope croustillante", price: "13.000 DT" },
      { name: "Panozzo Cordon Bleu", desc: "Pain Panozzo au cordon bleu", price: "14.000 DT" },
      { name: "Panozzo Poulet Crème & Champignons", desc: "Pain Panozzo, émincé de poulet, sauce crème", price: "15.000 DT" },
      { name: "Panozzo Émincé de Bœuf", desc: "Pain Panozzo au bœuf tendre sauté", price: "17.000 DT" },
      { name: "Panozzo Chevrettes", desc: "Pain Panozzo garni de crevettes sautées", price: "17.000 DT" },
      { name: "Burger Chicken", desc: "Burger au poulet, fromage et sauce", price: "12.000 DT" },
      { name: "Burger Crispy", desc: "Burger au poulet ultra croustillant", price: "14.500 DT" },  
      { name: "Burger Beef", desc: "Burger au bœuf, cheddar et garniture", price: "16.000 DT" },
     
    ]
   },
  {
    category: "Pizzas & Calzones", categoryEN: "Pizzas & Calzones", icon: "🍕",
    items: [
      { name: "Pizza Margherita", desc: "Sauce tomate, mozzarella, basilic | Prix L: 12.000 DT", price: "10.000 DT" },
      { name: "Pizza Neptune", desc: "Sauce tomate, mozzarella, thon | Prix L: 16.000 DT", price: "14.000 DT" },
      { name: "Pizza Jambon", desc: "Sauce tomate, mozzarella, jambon | Prix L: 14.000 DT", price: "11.000 DT" },
      { name: "Pizza Pepperoni", desc: "Sauce tomate, mozzarella, pepperoni | Prix L: 16.000 DT", price: "13.000 DT" },
      { name: "Pizza 4 Saisons", desc: "Sauce tomate, mozzarella, ingrédients de saison | Prix L: 18.000 DT", price: "15.000 DT" },
      { name: "Pizza Escalope", desc: "Sauce tomate, mozzarella, escalope | Prix L: 19.000 DT", price: "14.000 DT" },
      { name: "Pizza 4 Fromages", desc: "Sélection de 4 fromages fondants | Prix L: 21.000 DT", price: "18.000 DT" },
      { name: "Pizza La Terrasse", desc: "Spécialité de la maison | Prix L: 25.000 DT", price: "21.000 DT" },
      { name: "Calzone Thon", desc: "Pizza soufflée farcie au thon et fromage", price: "12.000 DT" },
      { name: "Calzone Escalope", desc: "Pizza soufflée farcie à l'escalope et fromage", price: "12.000 DT" },
      { name: "Calzone Cordon Bleu", desc: "Pizza soufflée farcie au cordon bleu et fromage", price: "13.000 DT" },
      { name: "Calzone Fruits de Mer", desc: "Pizza soufflée farcie aux fruits de mer et fromage", price: "18.000 DT" }
    ]
  },
  {
    category: "Pâtes", categoryEN: "Pasta", icon: "🍝",
    items: [
      { name: "Pâte Rouge Puttanesca (Fraîche)", desc: "Pâtes fraîches à la sauce tomate, olives, câpres", price: "13.000 DT" },
      { name: "Pâte Rouge Carbonara (Fraîche)", desc: "Pâtes fraîches à la sauce tomate façon carbonara", price: "13.000 DT" },
      { name: "Pâte Rouge Bolognaise (Fraîche)", desc: "Pâtes fraîches à la sauce bolognaise maison", price: "16.000 DT" },
      { name: "Pâte Rouge Fruits de Mer (Fraîche)", desc: "Pâtes fraîches aux fruits de mer et sauce rouge", price: "29.000 DT" },
      { name: "Pâte Blanche Carbonara (Fraîche)", desc: "Pâtes fraîches à la crème, lardons/jambon", price: "15.000 DT" },
      { name: "Pâte Blanche Poulet à la Crème (Fraîche)", desc: "Pâtes fraîches, poulet émincé, crème fraîche", price: "19.000 DT" },
      { name: "Pâte Blanche Fruits de Mer (Fraîche)", desc: "Pâtes fraîches aux fruits de mer et crème", price: "26.000 DT" },
      { name: "Pasta Puttanesca (Classique)", desc: "Pâtes classiques, sauce tomate, olives, câpres", price: "13.000 DT" },
      { name: "Pasta Bolognaise (Classique)", desc: "Pâtes classiques à la sauce bolognaise", price: "17.000 DT" },
      { name: "Pasta Carbonara (Classique)", desc: "Pâtes classiques à la crème et fromage", price: "17.000 DT" },
      { name: "Pasta Poulet aux Champignons (Classique)", desc: "Pâtes classiques, poulet, champignons, crème", price: "19.000 DT" },
      { name: "Pasta Chevrettes (Classique)", desc: "Pâtes classiques aux crevettes", price: "25.000 DT" },
      { name: "Pasta aux Fruits de Mer (Classique)", desc: "Pâtes classiques aux fruits de mer variés", price: "29.000 DT" }
    ]
  },
  {
    category: "Les Plats & Ojjas", categoryEN: "Main Dishes & Ojjas", icon: "🍳",
    items: [
      { name: "Escalope Grillée", desc: "Escalope de poulet grillée servie avec garniture", price: "20.000 DT" },
      { name: "Escalope Panée", desc: "Escalope de poulet croustillante", price: "22.000 DT" },
      { name: "Escalope Sauce Champignons", desc: "Escalope de poulet, sauce crème aux champignons", price: "23.000 DT" },
      { name: "Cordon Bleu", desc: "Escalope farcie au jambon et fromage", price: "23.000 DT" },
      { name: "Escalope Panée aux Amandes Filets", desc: "Escalope croustillante en croûte d'amandes", price: "24.000 DT" },
      { name: "Lasagne Bolognaise", desc: "Couches de pâtes, viande hachée, béchamel et fromage", price: "22.000 DT" },
      { name: "1/2 Poulet à la Mexicaine", desc: "Demi poulet préparé aux épices mexicaines", price: "22.000 DT" },
      { name: "1/2 Poulet à l'Anglaise", desc: "Demi poulet préparé à l'anglaise", price: "24.000 DT" },
      { name: "Poulet à la Hawaïenne", desc: "Poulet aux saveurs exotiques et sucrées-salées", price: "24.500 DT" },
      { name: "Daurade Grillée", desc: "Poisson daurade entière grillée au feu", price: "25.000 DT" },
      { name: "Loup Grillé", desc: "Poisson loup entier grillé", price: "26.000 DT" },
      { name: "Plat de Merguez", desc: "Merguez grillées servies avec accompagnement", price: "27.000 DT" },
      { name: "Gratin Fruits de Mer", desc: "Fruits de mer gratinés au fromage au four", price: "28.000 DT" },
      { name: "Loup Farci aux Fruits de Mer", desc: "Poisson loup désossé et farci aux fruits de mer", price: "35.000 DT" },
      { name: "Côtelette d'Agneau", desc: "Côtelettes d'agneau tendres et grillées", price: "40.000 DT" },
      { name: "Entrecôte Grillée", desc: "Pièce d'entrecôte de bœuf grillée", price: "42.000 DT" },
      { name: "Ojja Escalope", desc: "Œufs pochés dans une sauce tomate épicée à l'escalope", price: "15.000 DT" },
      { name: "Ojja Merguez", desc: "Œufs pochés dans une sauce tomate épicée aux merguez", price: "16.000 DT" },
      { name: "Ojja Mixte", desc: "Ojja généreuse aux ingrédients mixtes", price: "22.000 DT" },
      { name: "Ojja Chevrettes", desc: "Ojja tunisienne aux crevettes", price: "23.000 DT" },
      { name: "Ojja Fruits de Mer", desc: "Ojja riche aux fruits de mer", price: "29.500 DT" }
    ]
  },
  {
    category: "Crêpes, Gaufres & Pancakes", categoryEN: "Crepes, Waffles & Pancakes", icon: "🧇",
    items: [
      { name: "Crêpe Classique", desc: "Sucre ou beurre", price: "8.000 DT" },
      { name: "Crêpe Nutella", desc: "Crêpe gourmande au Nutella", price: "12.000 DT" },
      { name: "Crêpe Spéculoos", desc: "Crêpe à la crème de Spéculoos", price: "12.000 DT" },
      { name: "Crêpe Banana Split", desc: "Crêpe, banane et chocolat fondu", price: "12.500 DT" },
      { name: "Crêpe Nutella / Oreo", desc: "Mélange gourmand Nutella et Oreo", price: "13.000 DT" },
      { name: "Crêpe Jambon - Fromage", desc: "Crêpe salée au jambon et fromage fondu", price: "8.000 DT" },
      { name: "Crêpe Thon - Fromage", desc: "Crêpe salée garnie de thon et fromage", price: "9.000 DT" },
      { name: "Crêpe Escalope - Fromage", desc: "Crêpe salée généreuse à l'escalope", price: "12.000 DT" },
      { name: "Omelette Jambon - Fromage", desc: "Omelette salée servie chaude", price: "8.000 DT" }, 
      { name: "Omelette Thon - Fromage", desc: "Omelette au thon et fromage fondu", price: "9.000 DT" },
      { name: "Gaufre Classique", desc: "Gaufre nature ou sucre glace", price: "8.000 DT" },
      { name: "Gaufre Nutella", desc: "Gaufre croustillante au Nutella", price: "12.000 DT" },
      { name: "Gaufre Oreo", desc: "Gaufre aux brisures d'Oreo et nappage", price: "12.000 DT" },
      { name: "Gaufre Spéculoos", desc: "Gaufre au Spéculoos", price: "12.000 DT" },
      { name: "Gaufre Nutella / Oreo", desc: "Gaufre duo Nutella et Oreo", price: "13.000 DT" },
      { name: "Gaufre Dubaï", desc: "Gaufre style Dubaï croustillante", price: "14.000 DT" },
      { name: "Pancake Classique", desc: "Pancakes moelleux nature", price: "8.000 DT" },
      { name: "Pancake Nutella", desc: "Pancakes nappés de Nutella", price: "12.000 DT" },
      { name: "Pancake Oreo", desc: "Pancakes aux biscuits Oreo", price: "12.000 DT" },
      { name: "Pancake Spéculoos", desc: "Pancakes à la crème de Spéculoos", price: "12.000 DT" },
      { name: "Pancake Nutella / Oreo", desc: "Pancakes duo Nutella et Oreo", price: "13.000 DT" },
      { name: "Pancake Dubaï", desc: "Pancakes style Dubaï", price: "14.000 DT" }
    ]
  },
  {
    category: "Pâtisseries & Glaces", categoryEN: "Pastries & Ice Cream", icon: "🍰",
    items: [
      { name: "Gâteau du Jour", desc: "Sélection de pâtisserie fraîche du jour", price: "5.500 DT" },
      { name: "Cheesecake Spéculoos", desc: "Base de biscuit et crème au Spéculoos", price: "9.000 DT" },
      { name: "Cheesecake Oreo", desc: "Cheesecake gourmand aux morceaux d'Oreo", price: "9.000 DT" },
      { name: "San Sebastian", desc: "Le fameux cheesecake brûlé nature", price: "9.000 DT" },
      { name: "Tiramisu", desc: "Recette traditionnelle au café et mascarpone", price: "10.000 DT" },
      { name: "Américain", desc: "Pâtisserie style américain", price: "10.000 DT" },
      { name: "San Sebastian Nutella / Spéculoos", desc: "Cheesecake San Sebastian avec nappage au choix", price: "13.000 DT" },
      { name: "San Sebastian Pistache", desc: "San Sebastian avec une sauce onctueuse à la pistache", price: "14.000 DT" },
      { name: "Glace 2 Boules", desc: "Parfums au choix", price: "7.000 DT" },
      { name: "Glace 3 Boules", desc: "Parfums au choix", price: "10.000 DT" },
      { name: "Glace 4 Boules", desc: "Parfums au choix", price: "13.000 DT" },
      { name: "Glace 5 Boules", desc: "Parfums au choix max gourmandise", price: "16.000 DT" }
    ]
  },
  {
    category: "Jwajem & Chichas", categoryEN: "Jwajem & Shisha", icon: "🍧",
    items: [
      { name: "Jwajem M", desc: "Dessert traditionnel aux fruits et fruits secs - Taille M", price: "13.000 DT" },
      { name: "Jwajem L", desc: "Dessert traditionnel - Taille L", price: "9.000 DT" },
      { name: "Jwajem La Terrasse", desc: "Spécialité Jwajem signature de la maison", price: "16.000 DT" },
      { name: "Chicha Pomme", desc: "Saveur double pomme traditionnelle", price: "8.000 DT" },
      { name: "Chicha Menthe", desc: "Saveur menthe fraîche", price: "8.000 DT" },
      { name: "Chicha Raisin", desc: "Saveur raisin doux", price: "8.000 DT" },
      { name: "Chicha Cheikh Mani", desc: "Mélange spécial Cheikh Mani", price: "10.000 DT" },
      { name: "Chicha Love", desc: "Mélange de saveurs fruitées Love 66", price: "12.000 DT" }
    ]
  },
  {
    category: "Jus & Cocktails", categoryEN: "Fresh Juices & Cocktails", icon: "🍹",
    items: [
      { name: "Jus Citron Classique", desc: "Citronnade fraîche maison", price: "6.500 DT" },
      { name: "Jus Orange", desc: "Orange fraîche pressée", price: "7.000 DT" },
      { name: "Jus Citron Menthe", desc: "Citronnade mixée à la menthe fraîche", price: "7.500 DT" },
      { name: "Jus Fraise", desc: "Jus de fraises de saison", price: "8.500 DT" },
      { name: "Jus Goyave", desc: "Jus de goyave exotique", price: "9.000 DT" },
      { name: "Jus Pêche", desc: "Jus de pêche onctueux", price: "9.000 DT" },
      { name: "Jus Citron Amande", desc: "Citronnade traditionnelle tunisienne à l'orgeat/amande", price: "10.000 DT" },
      { name: "Jus Mangue", desc: "Jus de mangue riche", price: "10.000 DT" },
      { name: "Jus Kiwi", desc: "Jus de kiwi plein de vitamines", price: "10.000 DT" },
      { name: "Jus Lait de Poule", desc: "Boisson traditionnelle fortifiante aux fruits secs", price: "10.000 DT" },
      { name: "Jus Framboise", desc: "Jus de framboises délicat", price: "12.000 DT" },
      { name: "Cocktail Fruits", desc: "Mélange de fruits frais mixés", price: "12.500 DT" },
      { name: "Cocktail La Terrasse", desc: "Le cocktail de fruits signature de l'établissement", price: "16.000 DT" }
    ]
  },
  {
    category: "Mojitos & Smoothies", categoryEN: "Mojitos & Smoothies", icon: "🍸",
    items: [
      { name: "Mojito Classique", desc: "Citron vert, menthe fraîche, eau gazeuse, sirop", price: "8.000 DT" },
      { name: "Mojito Un Choix", desc: "Mojito aromatisé avec un parfum au choix", price: "10.000 DT" },
      { name: "Smoothie Kiwi", desc: "Kiwi frais mixé", price: "10.000 DT" },
      { name: "Smoothie Fraise", desc: "Fraises mixées veloutées", price: "10.500 DT" },
      { name: "Mojito Deux Choix", desc: "Mojito personnalisé avec deux parfums combinés", price: "11.000 DT" },
      { name: "Smoothie Ananas", desc: "Ananas frais mixé", price: "11.000 DT" },
      { name: "Smoothie Banane", desc: "Banane et base onctueuse", price: "11.500 DT" },
      { name: "Mojito Énergétique (Felfoul)", desc: "Mojito boosté à la boisson énergétique", price: "12.000 DT" },
      { name: "Mojito La Terrasse", desc: "Recette secrète et festive de Mojito signature", price: "13.000 DT" },
      { name: "Smoothie (Fraise / Banane)", desc: "Le grand classique duo de fruits", price: "13.000 DT" },
      { name: "Smoothie Avocat", desc: "Smoothie riche à l'avocat et miel", price: "14.000 DT" },
      { name: "Smoothie La Terrasse", desc: "Mélange spécial onctueux La Terrasse", price: "14.000 DT" }
    ]
  },
  {
    category: "Boissons Fraîches", categoryEN: "Cold Drinks", icon: "💧",
    items: [
      { name: "Eau 0.5L", desc: "Eau minérale plate petite bouteille", price: "1.500 DT" },
      { name: "Eau 1L", desc: "Eau minérale plate grande bouteille", price: "2.500 DT" },
      { name: "Boisson Gazeuse", desc: "Sélection de sodas", price: "3.500 DT" },
      { name: "Boisson Énergétique", desc: "Canette énergisante", price: "9.000 DT" }
    ]
  },
];


/*const DEFAULT_MENU = [
  {
    category: "Petit Déjeuner", categoryEN: "Breakfast", icon: "☕",
    items: [
      { name: "Formule Complète", desc: "Pain grillé, confiture, beurre, jus d'orange, café", price: "8.500 DT" },
      { name: "Croque-Monsieur", desc: "Pain de mie, jambon, fromage fondu", price: "5.500 DT" },
      { name: "Croissant Beurre", desc: "Croissant pur beurre, confiture maison", price: "2.500 DT" },
      { name: "Avocado Toast", desc: "Pain complet, avocat, œuf poché, graines", price: "7.000 DT" },
    ]
  },
  {
    category: "Cafés", categoryEN: "Coffee", icon: "☕",
    items: [
      { name: "Espresso", desc: "Café court et intense", price: "1.500 DT" },
      { name: "Cappuccino", desc: "Espresso, lait vapeur, mousse de lait", price: "2.500 DT" },
      { name: "Café Latte", desc: "Double espresso, lait velouté", price: "3.000 DT" },
      { name: "Café Glacé", desc: "Espresso froid, lait, glaçons", price: "3.500 DT" },
    ]
  },
  {
    category: "Boissons Chaudes", categoryEN: "Hot Drinks", icon: "🫖",
    items: [
      { name: "Thé à la Menthe", desc: "Thé vert, menthe fraîche", price: "2.000 DT" },
      { name: "Chocolat Chaud", desc: "Chocolat belge, lait entier", price: "3.000 DT" },
      { name: "Infusion Hibiscus", desc: "Fleurs d'hibiscus, cannelle", price: "2.500 DT" },
    ]
  },
  {
    category: "Jus & Cocktails", categoryEN: "Fresh Juices & Cocktails", icon: "🍹",
    items: [
      { name: "Jus d'Orange Frais", desc: "Pressé à la commande", price: "3.500 DT" },
      { name: "Smoothie Tropical", desc: "Mangue, ananas, banane, lait de coco", price: "5.000 DT" },
      { name: "Mojito Virgin", desc: "Citron vert, menthe, sucre de canne, pétillant", price: "4.500 DT" },
      { name: "Limonade Maison", desc: "Citrons frais, sirop, eau gazeuse", price: "3.500 DT" },
    ]
  },
  {
    category: "Crêpes & Gaufres", categoryEN: "Crepes & Waffles", icon: "🧇",
    items: [
      { name: "Crêpe Nutella", desc: "Crêpe fine, Nutella, noisettes concassées", price: "4.500 DT" },
      { name: "Crêpe Salée", desc: "Jambon, fromage, œuf", price: "5.500 DT" },
      { name: "Gaufre Fruits Rouges", desc: "Gaufre croustillante, coulis framboise, crème", price: "6.000 DT" },
    ]
  },
  {
    category: "Sandwichs & Paninis", categoryEN: "Sandwiches & Paninis", icon: "🥪",
    items: [
      { name: "Panini Poulet Pesto", desc: "Poulet grillé, pesto, tomate, mozzarella", price: "7.000 DT" },
      { name: "Club Sandwich", desc: "Dinde, bacon, laitue, tomate, mayonnaise", price: "8.000 DT" },
      { name: "Panini Végétarien", desc: "Légumes grillés, hummus, roquette", price: "6.500 DT" },
    ]
  },
  {
    category: "Burgers", categoryEN: "Burgers", icon: "🍔",
    items: [
      { name: "Classic Burger", desc: "Bœuf 150g, cheddar, salade, tomate, sauce maison", price: "12.000 DT" },
      { name: "Crispy Chicken Burger", desc: "Poulet pané croustillant, coleslaw, pickles", price: "11.000 DT" },
      { name: "Double Smash", desc: "Double galette smashée, double cheddar, oignons caramélisés", price: "15.000 DT" },
    ]
  },
  {
    category: "Salades", categoryEN: "Salads", icon: "🥗",
    items: [
      { name: "Salade César", desc: "Romaine, poulet grillé, parmesan, croûtons, sauce César", price: "9.000 DT" },
      { name: "Salade Grecque", desc: "Tomate, concombre, feta, olives, oignons rouges", price: "7.500 DT" },
      { name: "Salade Quinoa", desc: "Quinoa, avocat, feta, épinards, vinaigrette au citron", price: "9.500 DT" },
    ]
  },
  {
    category: "Desserts", categoryEN: "Desserts", icon: "🍰",
    items: [
      { name: "Moelleux au Chocolat", desc: "Cœur fondant, glace vanille", price: "5.500 DT" },
      { name: "Cheesecake Fraise", desc: "Base biscuit, crème, coulis de fraise", price: "5.000 DT" },
      { name: "Tiramisu Maison", desc: "Mascarpone, café, biscuits, cacao", price: "5.000 DT" },
    ]
  },
  {
    category: "Glaces", categoryEN: "Ice Cream", icon: "🍦",
    items: [
      { name: "Coupe 2 boules", desc: "Au choix : vanille, chocolat, fraise, pistache", price: "3.500 DT" },
      { name: "Banana Split", desc: "Banane, 3 boules, chantilly, coulis, amandes", price: "6.500 DT" },
      { name: "Sundae Caramel", desc: "Vanille, caramel beurre salé, chantilly", price: "5.000 DT" },
    ]
  },
];
*/


/* ============================================
   PARSING CSV FROM GOOGLE SHEETS
   Colonnes attendues :
   Catégorie | Catégorie_EN | Icône | Nom | Description | Prix
   ============================================ */
function parseCSV(text) {
  const lines = text.trim().split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return null;

  // Skip header row
  const rows = lines.slice(1).map(line => {
    // Handle quoted fields properly
    const cols = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        cols.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    cols.push(current.trim());
    return cols;
  });

  // Group by category
  const catMap = new Map();
  for (const row of rows) {
    const [cat, catEN, icon, name, desc, price] = row;
    if (!cat || !name) continue;
    const key = cat;
    if (!catMap.has(key)) {
      catMap.set(key, { category: cat, categoryEN: catEN || "", icon: icon || "🍽️", items: [] });
    }
    catMap.get(key).items.push({ name, desc: desc || "", price: price || "" });
  }
  return catMap.size > 0 ? [...catMap.values()] : null;
}

/* ============================================
   RENDER
   ============================================ */
function renderMenu(data) {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";

  data.forEach((cat, idx) => {
    const block = document.createElement("div");
    block.className = "category-block";
    block.dataset.index = idx;

    const itemsHTML = cat.items.map(item => `
      <div class="menu-item">
        <div class="item-info">
          <div class="item-name">${escHtml(item.name)}</div>
          ${item.desc ? `<div class="item-desc">${escHtml(item.desc)}</div>` : ""}
        </div>
        ${item.price ? `<div class="item-price">${escHtml(item.price)}</div>` : ""}
      </div>
    `).join("");

    block.innerHTML = `
      <button class="category-header" aria-expanded="false" aria-controls="panel-${idx}">
        <div class="cat-icon-wrap">${escHtml(cat.icon)}</div>
        <div class="cat-titles">
          <div class="cat-name-fr">${escHtml(cat.category)}</div>
          ${cat.categoryEN ? `<div class="cat-name-en">${escHtml(cat.categoryEN)}</div>` : ""}
        </div>
        <div class="cat-dotted" aria-hidden="true"></div>
        <span class="cat-chevron" aria-hidden="true">▼</span>
      </button>
      <div class="category-panel" id="panel-${idx}" role="region">
        <div class="panel-inner">${itemsHTML}</div>
      </div>
    `;

    // Toggle accordion
    block.querySelector(".category-header").addEventListener("click", () => {
      const isOpen = block.classList.contains("open");
      // Optionally close all others for single-open behaviour:
      // document.querySelectorAll(".category-block.open").forEach(b => closeBlock(b));
      isOpen ? closeBlock(block) : openBlock(block);
    });

    container.appendChild(block);
  });

  document.getElementById("menu-loading").classList.add("hidden");
  container.classList.remove("hidden");
}

function openBlock(block) {
  block.classList.add("open");
  block.querySelector(".category-header").setAttribute("aria-expanded", "true");
}

function closeBlock(block) {
  block.classList.remove("open");
  block.querySelector(".category-header").setAttribute("aria-expanded", "false");
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ============================================
   LOAD MENU
   Essaie Google Sheets CSV → fallback données locales
   ============================================ */
async function loadMenu() {
  document.getElementById("menu-loading").classList.remove("hidden");
  document.getElementById("menu-error").classList.add("hidden");
  document.getElementById("menu-container").classList.add("hidden");

  // If no URL configured, use default data immediately
  if (!SHEET_CSV_URL || SHEET_CSV_URL.includes("VOTRE_URL")) {
    renderMenu(DEFAULT_MENU);
    return;
  }

  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const parsed = parseCSV(text);
    if (!parsed) throw new Error("CSV vide ou mal formaté");
    renderMenu(parsed);
  } catch (err) {
    console.warn("Google Sheets indisponible, utilisation des données locales.", err);
    // Fallback to default data silently
    renderMenu(DEFAULT_MENU);
  }
}

/* Start */
document.addEventListener("DOMContentLoaded", loadMenu);
