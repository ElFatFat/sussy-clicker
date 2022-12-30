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
var upgrade1Element = document.getElementById("upgrade1");
var upgrade1LevelElement = document.getElementById("upgrade1Level");
var upgrade1PriceElement = document.getElementById("upgrade1Price");
var upgrade2Element = document.getElementById("upgrade2");
var upgrade2LevelElement = document.getElementById("upgrade2Level");
var upgrade2PriceElement = document.getElementById("upgrade2Price");
var upgrade3Element = document.getElementById("upgrade3");
var upgrade3LevelElement = document.getElementById("upgrade3Level");
var upgrade3PriceElement = document.getElementById("upgrade3Price");
var upgrade4Element = document.getElementById("upgrade4");
var upgrade4LevelElement = document.getElementById("upgrade4Level");
var upgrade4PriceElement = document.getElementById("upgrade4Price");
var upgrade5Element = document.getElementById("upgrade5");
var upgrade5LevelElement = document.getElementById("upgrade5Level");
var upgrade5PriceElement = document.getElementById("upgrade5Price");
var oneSelectorElement = document.getElementById("one");
var fiveSelectorElement = document.getElementById("five");
var tenSelectorElement = document.getElementById("ten");
var manualSaveElement = document.getElementById("manualSaveImg");
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
//Listener qui va réagir au relâchement de la touche espace, et définir la variable spacebarHeld à false.
document.addEventListener("keyup", function (event) {
    if (event.code == "Space" && upgrade4lvl > 0) {
        manualClick();
    }
});
//Fonction principale qui va appeller d'autre fonction pour initialiser le jeu, définir les timers, ainsi que construire l'interface.
function init() {
    loadSave();
    setUpgradeQuantitySelector(1);
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
    setInterval(automaticSave, 1000);
    //Fonction de timer qui s'écoule
    setInterval(updateElapsedTime, 1000);
    //Fonction de clic automatique toutes les secondes
    setInterval(automaticClick, 1000);
    //Fonction qui actualise la statistique de clics par seconde toutes les secondes
    setInterval(updateClicksPerSecond, 1000);
    //Fonction qui actualise la statistique de points par seconde toutes les secondes
    setInterval(updateMoneyPerSecond, 1000);
    setInterval(function () {
        if (money > highscore) {
            highscore = money;
        }
    }, 2000);
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
    //Ignore error
    //@ts-ignore
    changeImage();
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
    if (oneSelectorElement != null &&
        tenSelectorElement != null &&
        fiveSelectorElement != null) {
        oneSelectorElement.classList.remove("selected");
        tenSelectorElement.classList.remove("selected");
        fiveSelectorElement.classList.remove("selected");
    }
    if (quantity == 1) {
        upgradeQuantitySelector = 1;
        if (oneSelectorElement != null) {
            oneSelectorElement.classList.add("selected");
        }
        updateUpgrades();
    }
    else if (quantity == 5) {
        upgradeQuantitySelector = 5;
        if (fiveSelectorElement != null) {
            fiveSelectorElement.classList.add("selected");
        }
        updateUpgrades();
    }
    else if (quantity == 10) {
        upgradeQuantitySelector = 10;
        if (tenSelectorElement != null) {
            tenSelectorElement.classList.add("selected");
        }
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
        //Amélioration n°4
        case 4:
            if (upgrade4lvl == 0) {
                if (canBuyUpgrade(upgrade4DefaultPrice)) {
                    upgrade4lvl = 1;
                    if (upgrade4Unlocked == false) {
                        //TODO : Succès débloqué
                        upgrade4Unlocked = true;
                    }
                }
            }
            break;
        //Amélioration n°5
        case 5:
            if (upgrade5lvl == 0) {
                if (canBuyUpgrade(upgrade5DefaultPrice)) {
                    upgrade5lvl = 1;
                    if (upgrade5Unlocked == false) {
                        //TODO : Succès débloqué
                        document.getElementById('clicker').style.backgroundImage = "url('../img/log3.png')";
                        upgrade5Unlocked = true;
                    }
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
function updateBuyables() {
    if (money >= upgrade1Price) {
        if (upgrade1Element != null) {
            upgrade1Element.classList.remove("disabled");
        }
    }
    else {
        if (upgrade1Element != null) {
            upgrade1Element.classList.add("disabled");
        }
    }
    if (money >= upgrade2Price) {
        if (upgrade2Element != null) {
            upgrade2Element.classList.remove("disabled");
        }
    }
    else {
        if (upgrade2Element != null) {
            upgrade2Element.classList.add("disabled");
        }
    }
    if (money >= upgrade3Price) {
        if (upgrade3Element != null) {
            upgrade3Element.classList.remove("disabled");
        }
    }
    else {
        if (upgrade3Element != null) {
            upgrade3Element.classList.add("disabled");
        }
    }
    if (money >= upgrade4DefaultPrice && upgrade4lvl == 0) {
        if (upgrade4Element != null) {
            upgrade4Element.classList.remove("disabled");
        }
    }
    else {
        if (upgrade4Element != null) {
            upgrade4Element.classList.add("disabled");
        }
    }
    if (money >= upgrade5DefaultPrice && upgrade5lvl == 0) {
        if (upgrade5Element != null) {
            upgrade5Element.classList.remove("disabled");
        }
    }
    else {
        if (upgrade5Element != null) {
            upgrade5Element.classList.add("disabled");
        }
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
        moneyElement.innerHTML = money + "$";
    }
    if (money > alltimeHighscore) {
        updateAlltimeHighscore(money);
    }
    updateBuyables();
}
//Fonction qui actualise les prix et le niveau actuel de chaque amélioration.
function updateUpgrades() {
    upgrade1Price = Math.floor(upgrade1DefaultPrice *
        Math.pow(1.5, upgrade1lvl + upgradeQuantitySelector - 1));
    upgrade2Price = Math.floor(upgrade2DefaultPrice *
        Math.pow(1.5, upgrade2lvl + upgradeQuantitySelector - 1));
    upgrade3Price = Math.floor(upgrade3DefaultPrice *
        Math.pow(3, upgrade3lvl + upgradeQuantitySelector - 1));
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (upgrade1PriceElement != null &&
        upgrade2PriceElement != null &&
        upgrade3PriceElement != null &&
        upgrade4PriceElement != null &&
        upgrade5PriceElement != null &&
        upgrade1LevelElement != null &&
        upgrade2LevelElement != null &&
        upgrade3LevelElement != null &&
        upgrade4LevelElement != null &&
        upgrade5LevelElement != null &&
        upgrade1Element != null &&
        upgrade2Element != null &&
        upgrade3Element != null &&
        upgrade4Element != null &&
        upgrade5Element != null) {
        upgrade1PriceElement.innerHTML = convertNumber(upgrade1Price) + " $";
        upgrade2PriceElement.innerHTML = convertNumber(upgrade2Price) + " $";
        upgrade3PriceElement.innerHTML = convertNumber(upgrade3Price) + " $";
        upgrade1LevelElement.innerHTML = "Niv. " + upgrade1lvl;
        upgrade2LevelElement.innerHTML = "Niv. " + upgrade2lvl;
        upgrade3LevelElement.innerHTML = "Niv. " + upgrade3lvl;
        //@ts-ignore
        upgrade1Element.setAttribute("title", "Augmente le nombre de $ par clic manuel de +10 par niveau. \nActuellement Niv. " +
            upgrade1lvl +
            " | Gains de + " +
            10 * upgrade1lvl +
            " $ par clic.");
        //@ts-ignore
        upgrade2Element.setAttribute("title", "Augmente le nombre de $ par clic automatique de +10 par niveau. \nActuellement Niv. " +
            upgrade2lvl +
            " | Gains de + " +
            100 * upgrade2lvl +
            " $ par seconde.");
        //@ts-ignore
        upgrade3Element.setAttribute("title", "Augmente le nombre de $ par clic manuel ET automatique de +1000 par niveau. \nActuellement Niv. " +
            upgrade3lvl +
            " | Gains de + " +
            1000 * upgrade3lvl +
            " $ par clic ET seconde.");
        if (upgrade4lvl == 1) {
            upgrade4PriceElement.innerHTML = "Achat impossible";
            upgrade4LevelElement.innerHTML = "Niv. Max";
        }
        if (upgrade5lvl == 1) {
            upgrade5PriceElement.innerHTML = "Achat impossible";
            upgrade5LevelElement.innerHTML = "Niv. Max";
        }
    }
    updateBuyables();
}
//Fonction qui actualise le temps écoulé depuis le début de la partie.
function updateElapsedTime() {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (timeElapsedElementH != null &&
        timeElapsedElementM != null &&
        timeElapsedElementS != null) {
        var h = Math.floor(elapsedTime / 3600);
        var m = Math.floor((elapsedTime % 3600) / 60);
        var s = elapsedTime % 60;
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
            "Nombre de clics totaux  : " + alltimeClicks;
    }
}
//Fonction qui met à jour le nombre de $ gagnés tout comptes confondus
function updateAlltimeMoney() {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (alltimeMoneyElement != null) {
        alltimeMoneyElement.innerHTML =
            "Argent gagné total : " + alltimeMoney + " $";
    }
}
//Fonction qui met à jour le nombre de $ dépensés tout comptes confondus
function updateAlltimeSpent(price) {
    alltimeSpent += price;
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (alltimeSpentElement != null) {
        alltimeSpentElement.innerHTML =
            "Argent depensé total : " + alltimeSpent + " $";
    }
}
//Fonction qui définit quel est le nouveau highscore tout compte confondus.
function updateAlltimeHighscore(newHighscore) {
    alltimeHighscore = newHighscore;
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (alltimeHighscoreElement != null) {
        alltimeHighscoreElement.innerHTML =
            "Record total : " + newHighscore + " $";
    }
}
//Fonction qui actualise le nombre de clics/s sur l'interface
function updateClicksPerSecond() {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (clicksPerSecondElement != null) {
        //Pour déterminer le nombre de clics/s, on compare notre nombre de cicls total avec le nombre de clics total lors de la dernière mise à jour
        clicksPerSecondElement.innerHTML =
            "Clics par seconde : " +
                (alltimeClicks - clicksPerSecondLatest) +
                " cps";
        clicksPerSecondLatest = alltimeClicks;
    }
}
//Fonction qui actualise le nombre de $/s sur l'interface
function updateMoneyPerSecond() {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (moneyPerSecondElement != null) {
        //Pour déterminer le nombre de $/s, on compare notre nombre de $ total avec le nombre de $ total lors de la dernière mise à jour
        moneyPerSecondElement.innerHTML =
            "Dollars par seconde : " +
                (alltimeMoney - moneyPerSecondLatest) +
                " $/s";
        moneyPerSecondLatest = alltimeMoney;
    }
}
function manualSave() {
    manualSaveElement.style.backgroundColor = "var(--bg_secondary)";
    fetch("https://sae-301.azurewebsites.net/save-score.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            score: highscore,
            force: true,
        }),
    })
        .then(function (res) {
        if (res.status === 200) {
            console.debug("Sauvegarde manuelle réussie");
            if (manualSaveElement != null) {
                manualSaveElement.src = "img/succes.svg";
                manualSaveElement.style.backgroundColor = "green";
                manualSaveElement.style.borderRadius = "50%";
                setTimeout(function () {
                    manualSaveElement.src = "img/save.svg";
                    manualSaveElement.style.backgroundColor = "var(--bg_main)";
                    manualSaveElement.style.borderRadius = "8%";
                }, 2000);
            }
        }
        else {
            console.error("Erreur sauvegarde manuelle: " + res.status);
            if (manualSaveElement != null) {
                manualSaveElement.src = "img/fail.svg";
                manualSaveElement.style.backgroundColor = "red";
                manualSaveElement.style.borderRadius = "50%";
                setTimeout(function () {
                    manualSaveElement.src = "img/save.svg";
                    manualSaveElement.style.backgroundColor = "var(--bg_main)";
                    manualSaveElement.style.borderRadius = "8%";
                }, 2000);
            }
        }
    })
        .catch(function (err) {
        console.error("Erreur sauvegarde manuelle: " + err);
        if (manualSaveElement != null) {
            manualSaveElement.src = "img/fail.svg";
            manualSaveElement.style.backgroundColor = "red";
            manualSaveElement.style.borderRadius = "50%";
            setTimeout(function () {
                manualSaveElement.src = "img/save.svg";
                manualSaveElement.style.backgroundColor = "var(--bg_main)";
                manualSaveElement.style.borderRadius = "8%";
            }, 2000);
        }
    });
}
function automaticSave() {
    fetch("https://sae-301.azurewebsites.net/save-score.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            score: money,
        }),
    })
        .then(function (res) {
        if (res.status === 200) {
            console.debug("Sauvegarde automatique réussie");
        }
        else {
            console.error("Erreur sauvegarde automatique : " + res.status);
        }
    })
        .catch(function (err) {
        console.error("Erreur sauvegarde automatique : " + err);
    });
}

function openPanel() {
    document.getElementById("gameContainer").classList.remove("close");
    document.getElementById("gameContainer").classList.add("open");
}

function closePanel() {
    document.getElementById("gameContainer").classList.remove("open");
    document.getElementById("gameContainer").classList.add("close");
}
//# sourceMappingURL=game.js.map