// ################### FICHIER DE LA LOGIQUE PRINCIPALE DU JEU ###################
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
//Variable pour savoir si la touche espace est enfoncée
var spacebarHeld = false;
//Dès le chargement de la page, on vérifie l'intégrité des données, et si elles sont valides on appelle la fonction init().
window.onload = function () {
    if (!checkSaveValidity()) {
        window.location.href = "index.html";
    }
    else {
        init();
    }
};
//Listener qui va réagir à l'appui sur la touche espace, et appeller la fonction manualClick().
//On vérifie que la touche n'est pas déjà enfoncée pour éviter de spammer le clic manuel.
document.addEventListener("keydown", function (event) {
    if (event.code == "Space" && !spacebarHeld) {
        spacebarHeld = true;
        manualClick();
    }
});
//Listener qui va réagir au relâchement de la touche espace, et définir la variable spacebarHeld à false.
document.addEventListener("keyup", function (event) {
    if (event.code == "Space") {
        spacebarHeld = false;
    }
});
//Fonction principale qui va appeller d'autre fonction pour initialiser le jeu, définir les timers, ainsi que construire l'interface.
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
//Fonction qui va déclarer tout les timers que l'on va utiliser dans le jeu.
function initializeTimers() {
    //Fonction de sauvegarde automatique toutes les secondes
    setInterval(save, 1000);
    //Fonction de timer qui s'écoule
    setInterval(updateElapsedTime, 1000);
    //Fonction de clic automatique toutes les secondes
    setInterval(automaticClick, 1000);
    //Fonction qui actualise la statistique de clics par seconde toutes les secondes
    setInterval(updateClicksPerSecond, 1000);
    //Fonction qui actualise la statistique de points par seconde toutes les secondes
    setInterval(updateMoneyPerSecond, 1000);
}
//Fonction qui va déterminer toute la logique lorsqu'un clic manuel (souris/touche espace) est effectué.
function manualClick() {
    //On définit que l'on gagne 1 point de base, et on ajoute 10 points par niveau d'upgrade 1, et 1000 points par niveau d'upgrade 3.
    var ajout = 1 + 10 * upgrade1lvl + 1000 * upgrade3lvl;
    //On ajoute 1 au nombre de clics manuels effectués et on actualise l'interface
    alltimeClicks++;
    updateAlltimeClicks();
    //On ajoute le nombre de points gagnés à la variable money, et on actualise l'interface
    money += ajout;
    updateMoney();
    //On ajoute le nombre de points gagnés à la variable représentant le total de point gagnés tout compte confondus, et on actualise l'interface
    alltimeMoney += ajout;
    updateAlltimeMoney();
}
//Fonction qui va déterminer toute la logique lorsqu'un clic automatique est effectué.
//Cette fonction est automatique appellée toutes les secondes par un setIterval défini plus haut.
function automaticClick() {
    //On définit que l'on gagne 1 point de base, et on ajoute 10 points par niveau d'upgrade 2, et 1000 points par niveau d'upgrade 3.
    var ajout = 1 + 10 * upgrade2lvl + 1000 * upgrade3lvl;
    //On ajoute le nombre de points gagnés à la variable money, et on actualise l'interface
    money += ajout;
    updateMoney();
    //On ajoute le nombre de points gagnés à la variable représentant le total de point gagnés tout compte confondus, et on actualise l'interface
    alltimeMoney += ajout;
    updateAlltimeMoney();
}
//Fonction qui prend en argument le nombre d'upgrade à acheter et qui met à jour la variable upgradeQuantitySelector ainsi que l'interface grâce à updateUpgrades()
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
//Fonction qui s'occupe de l'achat des upgrade. 
//On précisant en argument quelle amélioration on veut acheter (1 = upgrade1, 2 = upgrade2, 3 = upgrade3)
function buyUpgrade(whichOne) {
    //On switch l'argument reçu pour savoir quelle amélioration on veut acheter
    switch (whichOne) {
        //Amélioration n°1
        case 1:
            //On appelle la fonction canBuyUpgrade avec le prix de l'amélioration.
            //Si la fonction retourne true, alors on incrémente le level de l'amélioration et on met à jour l'affichage
            if (canBuyUpgrade(upgrade1Price)) {
                //On incrémente le level selon la quantité d'amélioration achetée
                upgrade1lvl += upgradeQuantitySelector;
                //Si l'amélioration n'était pas débloquée, on débloque l'amélioration et on débloque le succès associé
                if (upgrade1Unlocked == false) {
                    //TODO : Succès débloqué
                    upgrade1Unlocked = true;
                }
            }
            break;
        //Amélioration n°2
        case 2:
            if (canBuyUpgrade(upgrade2Price)) {
                upgrade2lvl += upgradeQuantitySelector;
                if (upgrade2Unlocked == false) {
                    //TODO : Succès débloqué
                    upgrade2Unlocked = true;
                }
            }
            break;
        //Amélioration n°3
        case 3:
            if (canBuyUpgrade(upgrade3Price)) {
                upgrade3lvl += upgradeQuantitySelector;
                if (upgrade3Unlocked == false) {
                    //TODO : Succès débloqué
                    upgrade3Unlocked = true;
                }
            }
            break;
    }
    updateUpgrades();
}
//Fonction qui retourne true si le joueur à + d'argent que 'price'
function canBuyUpgrade(price) {
    //Si le joueur a assez d'argent, alors on lui retire le prix de l'achat, on met à jour les statistiques, on met à jour l'argent et on retourne true
    if (money >= price) {
        money -= price;
        updateAlltimeSpent(price);
        updateMoney();
        return true;
    }
    else {
        return false;
    }
}
// ################### FONCTIONS QUI SONT APPELLEES LORSQUE DES VARIABLES ONT ETE MODIFIEES ###################
//Ces fonctions vont principalement actualiser l'interface utilisateur ainsi qu'effectuer des vérifications basiques (ex: Est-ce que le joueur à battu son record ?)
//Fonction qui met à jour le nom du joueur sur l'interface
function updatePlayerName() {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (playerNameElement != null) {
        playerNameElement.innerHTML = username;
    }
}
//Fonction qui met à jour l'argent possédé et vérifie si le joueur a battu son record
function updateMoney() {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (moneyElement != null) {
        moneyElement.innerHTML = money + " $";
    }
    //On vérifie si le joueur a battu son record tout compte confondus
    if (money > alltimeHighscore) {
        updateAlltimeHighscore(money);
    }
    //On vérifie si le joueur a battu son record de la session
    if (money > highscore) {
        updateHighscore(money);
    }
}
//Fonction qui actualise les prix et le niveau actuel de chaque amélioration.
function updateUpgrades() {
    upgrade1Price = Math.floor(upgrade1DefaultPrice * Math.pow(1.5, (upgrade1lvl + upgradeQuantitySelector - 1)));
    upgrade2Price = Math.floor(upgrade2DefaultPrice * Math.pow(1.5, (upgrade2lvl + upgradeQuantitySelector - 1)));
    upgrade3Price = Math.floor(upgrade3DefaultPrice * Math.pow(3, (upgrade3lvl + upgradeQuantitySelector - 1)));
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
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
//Fonction qui actualise le temps écoulé depuis le début de la partie.
function updateElapsedTime() {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (timeElapsedElementH != null &&
        timeElapsedElementM != null &&
        timeElapsedElementS != null) {
        var h = Math.floor(elapsedTime / 3600);
        var m = Math.floor((elapsedTime % 3600) / 60);
        var s = (elapsedTime % 60);
        if (h < 10) {
            timeElapsedElementH.innerHTML = "0" + h.toString() + ":";
        }
        else {
            timeElapsedElementH.innerHTML = h.toString() + ":";
        }
        if (m < 10) {
            timeElapsedElementM.innerHTML = "0" + m.toString() + ":";
        }
        else {
            timeElapsedElementM.innerHTML = m.toString() + ":";
        }
        if (s < 10) {
            timeElapsedElementS.innerHTML = "0" + s.toString();
        }
        else {
            timeElapsedElementS.innerHTML = s.toString();
        }
    }
    elapsedTime += 1;
}
//Fonction qui met à jour le nombre de clics tout comptes confondus
function updateAlltimeClicks() {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (alltimeClicksElement != null) {
        alltimeClicksElement.innerHTML =
            "AlltimeClicks : " + alltimeClicks + " clics";
    }
}
//Fonction qui met à jour le nombre de $ gagnés tout comptes confondus
function updateAlltimeMoney() {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (alltimeMoneyElement != null) {
        alltimeMoneyElement.innerHTML = "AlltimeMoney : " + alltimeMoney + " $";
    }
}
//Fonction qui met à jour le nombre de $ dépensés tout comptes confondus
function updateAlltimeSpent(price) {
    alltimeSpent += price;
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (alltimeSpentElement != null) {
        alltimeSpentElement.innerHTML = "AlltimeSpent : " + alltimeSpent + " $";
    }
}
//Fonction qui définit quel est le nouveau highscore tout compte confondus.
function updateAlltimeHighscore(newHighscore) {
    alltimeHighscore = newHighscore;
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (alltimeHighscoreElement != null) {
        alltimeHighscoreElement.innerHTML =
            "AlltimeHighscore : " + newHighscore + " $";
    }
}
//Fonction qui définit quel est le nouveau highscore, et en informe le serveur.
function updateHighscore(newHighscore) {
    highscore = newHighscore;
    //On envoie le score sur le serveur
    //On est obligé de mettre un //@ts-ignore pour ignorer l'erreur de Typescript, car la fonction sendScoreToDatabase n'est pas définie dans ce fichier mais dans le fichier sendData.js
    //@ts-ignore
    sendScoreToDatabase(username, newHighscore);
}
//Fonction qui actualise le nombre de clics/s sur l'interface
function updateClicksPerSecond() {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (clicksPerSecondElement != null) {
        //Pour déterminer le nombre de clics/s, on compare notre nombre de cicls total avec le nombre de clics total lors de la dernière mise à jour
        clicksPerSecondElement.innerHTML =
            "Clicks per second : " + (alltimeClicks - clicksPerSecondLatest) + " cps";
        clicksPerSecondLatest = alltimeClicks;
    }
}
//Fonction qui actualise le nombre de $/s sur l'interface
function updateMoneyPerSecond() {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (moneyPerSecondElement != null) {
        //Pour déterminer le nombre de $/s, on compare notre nombre de $ total avec le nombre de $ total lors de la dernière mise à jour
        moneyPerSecondElement.innerHTML = "Money per second : " + (alltimeMoney - moneyPerSecondLatest) + " $/s";
        moneyPerSecondLatest = alltimeMoney;
    }
}
//# sourceMappingURL=game.js.map