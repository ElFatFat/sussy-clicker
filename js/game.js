// ################### FICHIER DE LA LOGIQUE PRINCIPALE DU JEU ###################
//Sauvegarde automatique toutes les secondes
//Les performances le permettent, car après vérification sur un ordinateur relativement puissant la fonction save() prend moins de 0.005ms à s'exécuter.
//(Si vous cherchez où est save(), c'est dans le fichier manageData.js.)
setInterval(save, 1000);
//Fonction de timer qui s'écoule
setInterval(updateElapsedTime, 1000);
//Gain de points automatique toutes les secondes
setInterval(automaticClick, 1000);
//Référeces aux éléments HTML
var playerNameElement = document.getElementById("playerName");
var moneyElement = document.getElementById("money");
var timeElapsedElementH = document.getElementById("timeElapsedH");
var timeElapsedElementM = document.getElementById("timeElapsedM");
var timeElapsedElementS = document.getElementById("timeElapsedS");
var alltimeClicksElement = document.getElementById("alltimeClicks");
var alltimeMoneyElement = document.getElementById("alltimeMoney");
var alltimeSpentElement = document.getElementById("alltimeSpent");
var clicksPerSecondElement = document.getElementById("clicksPerSecond");
var moneyPerSecondElement = document.getElementById("moneyPerSecond");
var alltimeHighscoreElement = document.getElementById("alltimeHighscore");
var upgrade1LevelElement = document.getElementById("upgrade1Level");
var upgrade1PriceElement = document.getElementById("upgrade1Price");
var upgrade2LevelElement = document.getElementById("upgrade2Level");
var upgrade2PriceElement = document.getElementById("upgrade2Price");
var upgrade3LevelElement = document.getElementById("upgrade3Level");
var upgrade3PriceElement = document.getElementById("upgrade3Price");
var upgradeQuantitySelector = 1;
//Dès le chargement de la page, on vérifie l'intégrité des données, et si elles sont valides on appelle la fonction init().
window.onload = function () {
    if (!checkSaveValidity()) {
        window.location.href = "index.html";
    }
    else {
        init();
    }
};
//Fonction principale
function init() {
    loadSave();
    updatePlayerName();
    updateMoney();
    updateUpgrades();
    updateElapsedTime();
    updateAlltimeClicks();
    updateAlltimeMoney();
    updateAlltimeSpent();
    updateAlltimeHighscore(alltimeHighscore);
}
function updateElapsedTime() {
    if (timeElapsedElementH != null &&
        timeElapsedElementM != null &&
        timeElapsedElementS != null) {
        timeElapsedElementH.innerHTML =
            Math.floor(elapsedTime / 3600).toString() + " : ";
        timeElapsedElementM.innerHTML =
            Math.floor((elapsedTime % 3600) / 60).toString() + " : ";
        timeElapsedElementS.innerHTML = (elapsedTime % 60).toString();
    }
    elapsedTime += 1;
}
function manualClick() {
    alltimeClicks++;
    updateAlltimeClicks();
    money += 1 + 10 * upgrade1lvl + 1000 * upgrade3lvl;
    updateMoney();
}
function automaticClick() {
    money += 1 + 10 * upgrade2lvl + 1000 * upgrade3lvl;
    updateMoney();
}
// ################### FICHIERS NULLES DE MISES A JOUR D'AFFICHAGE ###################
function updatePlayerName() {
    if (playerNameElement != null) {
        playerNameElement.innerHTML = username;
    }
}
function updateMoney() {
    if (moneyElement != null) {
        moneyElement.innerHTML = money + " $";
    }
    if (money > alltimeHighscore) {
        updateAlltimeHighscore(money);
    }
}
function updateAlltimeClicks() {
    if (alltimeClicksElement != null) {
        alltimeClicksElement.innerHTML =
            "AlltimeClicks : " + alltimeClicks + " clics";
    }
}
function updateAlltimeMoney() {
    if (alltimeMoneyElement != null) {
        alltimeMoneyElement.innerHTML = "AlltimeMoney : " + alltimeMoney + " $";
    }
}
function updateAlltimeSpent() {
    if (alltimeSpentElement != null) {
        alltimeSpentElement.innerHTML = "AlltimeSpent : " + alltimeSpent + " $";
    }
}
function updateAlltimeHighscore(newHighscore) {
    alltimeHighscore = newHighscore;
    if (alltimeHighscoreElement != null) {
        alltimeHighscoreElement.innerHTML =
            "AlltimeHighscore : " + newHighscore + " $";
    }
}
function setUpgradeQuantitySelector(quantity) {
    if (quantity == 1) {
        upgradeQuantitySelector = 1;
        updateUpgrades();
    }
    else if (quantity == 10) {
        upgradeQuantitySelector = 10;
        updateUpgrades();
    }
    else if (quantity == 100) {
        upgradeQuantitySelector = 100;
        updateUpgrades();
    }
}
function buyUpgrade(whichOne) {
    switch (whichOne) {
        case 1:
            if (canAfford(upgrade1Price)) {
                money -= upgrade1Price;
                upgrade1lvl += upgradeQuantitySelector;
                updateMoney();
                updateUpgrades();
            }
            break;
        case 2:
            if (canAfford(upgrade2Price)) {
                money -= upgrade2Price;
                upgrade2lvl += upgradeQuantitySelector;
                updateMoney();
                updateUpgrades();
            }
            break;
        case 3:
            if (canAfford(upgrade3Price)) {
                money -= upgrade3Price;
                upgrade3lvl += upgradeQuantitySelector;
                updateMoney();
                updateUpgrades();
            }
            break;
    }
}
//Fonction qui actualise les prix et le level de l'interface.
function updateUpgrades() {
    upgrade1Price = Math.floor(upgrade1DefaultPrice * Math.pow(1.5, (upgrade1lvl + upgradeQuantitySelector - 1)));
    upgrade2Price = Math.floor(upgrade2DefaultPrice * Math.pow(1.5, (upgrade2lvl + upgradeQuantitySelector - 1)));
    upgrade3Price = Math.floor(upgrade3DefaultPrice * Math.pow(3, (upgrade3lvl + upgradeQuantitySelector - 1)));
    if (upgrade1PriceElement != null &&
        upgrade2PriceElement != null &&
        upgrade3PriceElement != null &&
        upgrade1LevelElement != null &&
        upgrade2LevelElement != null &&
        upgrade3LevelElement != null) {
        upgrade1PriceElement.innerHTML = upgrade1Price + " $";
        upgrade2PriceElement.innerHTML = upgrade2Price + " $";
        upgrade3PriceElement.innerHTML = upgrade3Price + " $";
        upgrade1LevelElement.innerHTML = upgrade1lvl + " lvl";
        upgrade2LevelElement.innerHTML = upgrade2lvl + " lvl";
        upgrade3LevelElement.innerHTML = upgrade3lvl + " lvl";
    }
}
//Fonction qui retourne true si le joueur à + d'argent que 'price'
function canAfford(price) {
    if (money > price) {
        return true;
    }
    else {
        console.warn("Not enough money to buy this upgrade !");
        return true;
    }
}
//Juste par curiosité, quelqu'un lit vraiment le code jusqu'ici ?
//# sourceMappingURL=game.js.map