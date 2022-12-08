// ################### FICHIER DE LA LOGIQUE PRINCIPALE DU JEU ###################

//Référeces aux éléments HTML
let playerNameElement = document.getElementById("playerName");
let moneyElement = document.getElementById("money");
let timeElapsedElementH = document.getElementById("timeElapsedH");
let timeElapsedElementM = document.getElementById("timeElapsedM");
let timeElapsedElementS = document.getElementById("timeElapsedS");
let alltimeClicksElement = document.getElementById("alltimeClicks");
let alltimeMoneyElement = document.getElementById("alltimeMoney");
let alltimeSpentElement = document.getElementById("alltimeSpent");
let clicksPerSecondElement = document.getElementById("clicksPerSecond");
let moneyPerSecondElement = document.getElementById("moneyPerSecond");
let alltimeHighscoreElement = document.getElementById("alltimeHighscore");

let upgrade1LevelElement = document.getElementById("upgrade1Level");
let upgrade1PriceElement = document.getElementById("upgrade1Price");
let upgrade2LevelElement = document.getElementById("upgrade2Level");
let upgrade2PriceElement = document.getElementById("upgrade2Price");
let upgrade3LevelElement = document.getElementById("upgrade3Level");
let upgrade3PriceElement = document.getElementById("upgrade3Price");

//Variable pour choisir la quantité d'upgrade à acheter
type upgradeQuantitySelector = 1 | 10 | 100;
let upgradeQuantitySelector: upgradeQuantitySelector = 1;


//Dès le chargement de la page, on vérifie l'intégrité des données, et si elles sont valides on appelle la fonction init().
window.onload = function () {
    if (!checkSaveValidity()) {
        window.location.href = "index.html";
    } else {
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
    updateAlltimeSpent(0);
    updateAlltimeHighscore(alltimeHighscore);
    initializeTimers();
}

function initializeTimers():void{
    //Sauvegarde automatique toutes les secondes
    //Les performances le permettent, car après vérification sur un ordinateur relativement puissant la fonction save() prend moins de 0.005ms à s'exécuter.
    //(Si vous cherchez où est save(), c'est dans le fichier manageData.js.)
    setInterval(save, 1000);
    //Fonction de timer qui s'écoule
    setInterval(updateElapsedTime, 1000);
    //Gain de points automatique toutes les secondes
    setInterval(automaticClick, 1000);
}

function updateElapsedTime(): void {
    if (
        timeElapsedElementH != null &&
        timeElapsedElementM != null &&
        timeElapsedElementS != null
    ) {
        timeElapsedElementH.innerHTML =
            Math.floor(elapsedTime / 3600).toString() + " : ";
        timeElapsedElementM.innerHTML =
            Math.floor((elapsedTime % 3600) / 60).toString() + " : ";
        timeElapsedElementS.innerHTML = (elapsedTime % 60).toString();
    }
    elapsedTime += 1;
}

function manualClick(): void {
    alltimeClicks++;
    updateAlltimeClicks();
    money += 1 + 10 * upgrade1lvl + 1000 * upgrade3lvl;
    updateMoney();
}

function automaticClick(): void {
    money += 1 + 10 * upgrade2lvl + 1000 * upgrade3lvl;
    updateMoney();
}

// ################### FICHIERS NULLES DE MISES A JOUR D'AFFICHAGE ###################
function updatePlayerName(): void {
    if (playerNameElement != null) {
        playerNameElement.innerHTML = username;
    }
}
function updateMoney(): void {
    if (moneyElement != null) {
        moneyElement.innerHTML = money + " $";
    }
    if (money > alltimeHighscore) {
        updateAlltimeHighscore(money);
    }
}
function updateAlltimeClicks(): void {
    if (alltimeClicksElement != null) {
        alltimeClicksElement.innerHTML =
            "AlltimeClicks : " + alltimeClicks + " clics";
    }
}
function updateAlltimeMoney(): void {
    if (alltimeMoneyElement != null) {
        alltimeMoneyElement.innerHTML = "AlltimeMoney : " + alltimeMoney + " $";
    }
}
function updateAlltimeSpent(price: number): void {
    alltimeSpent += price;
    if (alltimeSpentElement != null) {
        alltimeSpentElement.innerHTML = "AlltimeSpent : " + alltimeSpent + " $";
    }
}
function updateAlltimeHighscore(newHighscore: number): void {
    alltimeHighscore = newHighscore;
    if (alltimeHighscoreElement != null) {
        alltimeHighscoreElement.innerHTML =
            "AlltimeHighscore : " + newHighscore + " $";
    }
    //how to tell typescript to ignore issue
    //@ts-ignore
    sendScoreToDatabase(username, newHighscore);
}

function setUpgradeQuantitySelector(quantity): void {
    if (quantity == 1) {
        upgradeQuantitySelector = 1;
        updateUpgrades();
    } else if (quantity == 10) {
        upgradeQuantitySelector = 10;
        updateUpgrades();
    } else if (quantity == 100) {
        upgradeQuantitySelector = 100;
        updateUpgrades();
    }
}

function buyUpgrade(whichOne): void {
    switch (whichOne) {
        case 1:
            if (canBuyUpgrade(upgrade1Price)) {
                upgrade1lvl += upgradeQuantitySelector;
            }
            break;
        case 2:
            if (canBuyUpgrade(upgrade2Price)) {
                upgrade2lvl += upgradeQuantitySelector;
            }
            break;
        case 3:
            if (canBuyUpgrade(upgrade3Price)) {
                upgrade3lvl += upgradeQuantitySelector;
            }
            break;
    }
}

//Fonction qui actualise les prix et le level de l'interface.
function updateUpgrades(): void {
    upgrade1Price = Math.floor(upgrade1DefaultPrice * Math.pow(1.5, (upgrade1lvl+upgradeQuantitySelector-1)));
    upgrade2Price = Math.floor(upgrade2DefaultPrice * Math.pow(1.5, (upgrade2lvl+upgradeQuantitySelector-1)));
    upgrade3Price = Math.floor(upgrade3DefaultPrice * Math.pow(3, (upgrade3lvl+upgradeQuantitySelector-1)));

    if (
        upgrade1PriceElement != null &&
        upgrade2PriceElement != null &&
        upgrade3PriceElement != null &&
        upgrade1LevelElement != null &&
        upgrade2LevelElement != null &&
        upgrade3LevelElement != null
    ) {
        upgrade1PriceElement.innerHTML = upgrade1Price + " $";
        upgrade2PriceElement.innerHTML = upgrade2Price + " $";
        upgrade3PriceElement.innerHTML = upgrade3Price + " $";
        upgrade1LevelElement.innerHTML = upgrade1lvl + " lvl";
        upgrade2LevelElement.innerHTML = upgrade2lvl + " lvl";
        upgrade3LevelElement.innerHTML = upgrade3lvl + " lvl";
    }
}

//Fonction qui retourne true si le joueur à + d'argent que 'price'
function canBuyUpgrade(price): boolean {
    if (money > price) {
        money -= price;
        updateAlltimeSpent(price);
        updateMoney();
        updateUpgrades();
        return true;
    } else {
        console.warn("Not enough money to buy this upgrade !")
        return false;
    }
}
//Juste par curiosité, quelqu'un lit vraiment le code jusqu'ici ?
