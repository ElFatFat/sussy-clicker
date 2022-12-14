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

let upgrade1Element = document.getElementById("upgrade1");
let upgrade1LevelElement = document.getElementById("upgrade1Level");
let upgrade1PriceElement = document.getElementById("upgrade1Price");
let upgrade2Element = document.getElementById("upgrade2");
let upgrade2LevelElement = document.getElementById("upgrade2Level");
let upgrade2PriceElement = document.getElementById("upgrade2Price");
let upgrade3Element = document.getElementById("upgrade3");
let upgrade3LevelElement = document.getElementById("upgrade3Level");
let upgrade3PriceElement = document.getElementById("upgrade3Price");
let upgrade4Element = document.getElementById("upgrade4");
let upgrade4LevelElement = document.getElementById("upgrade4Level");
let upgrade4PriceElement = document.getElementById("upgrade4Price");
let upgrade5Element = document.getElementById("upgrade5");
let upgrade5LevelElement = document.getElementById("upgrade5Level");
let upgrade5PriceElement = document.getElementById("upgrade5Price");

let oneSelectorElement = document.getElementById("one");
let tenSelectorElement = document.getElementById("ten");
let hundredSelectorElement = document.getElementById("hundred");

let manualSaveElement = document.getElementById("manualSave");

//Variable pour choisir la quantité d'upgrade à acheter
type upgradeQuantitySelector = 1 | 10 | 100;
let upgradeQuantitySelector: upgradeQuantitySelector = 1;

let version = "0.0.1";





//Dès le chargement de la page, on vérifie l'intégrité des données, et si elles sont valides on appelle la fonction init().
window.onload = function () {
    if (!checkSaveValidity()) {
        window.location.href = "index.html";
    } else {
        init();
    }
};

//Listener qui va réagir au relâchement de la touche espace, et définir la variable spacebarHeld à false.
document.addEventListener("keyup", function (event) {
    if(event.code == "Space" && upgrade4lvl > 0) {
        manualClick();
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
function initializeTimers():void{
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

    setInterval(() => {
        if(money>highscore){
            highscore = money;
        }
    }, 2000);
}
//Fonction qui va déterminer toute la logique lorsqu'un clic manuel (souris/touche espace) est effectué.
function manualClick(): void {
    //On définit que l'on gagne 1 point de base, et on ajoute 10 points par niveau d'upgrade 1, et 1000 points par niveau d'upgrade 3.
    let ajout = 1 + 10 * upgrade1lvl + 1000 * upgrade3lvl;

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
function automaticClick(): void {
    //On définit que l'on gagne 1 point de base, et on ajoute 10 points par niveau d'upgrade 2, et 1000 points par niveau d'upgrade 3.
    let ajout = 1 + 10 * upgrade2lvl + 1000 * upgrade3lvl;

    //On ajoute le nombre de points gagnés à la variable money, et on actualise l'interface
    money += ajout;
    updateMoney();

    //On ajoute le nombre de points gagnés à la variable représentant le total de point gagnés tout compte confondus, et on actualise l'interface
    alltimeMoney += ajout;
    updateAlltimeMoney();
}

//Fonction qui prend en argument le nombre d'upgrade à acheter et qui met à jour la variable upgradeQuantitySelector ainsi que l'interface grâce à updateUpgrades()
function setUpgradeQuantitySelector(quantity): void {
    if (oneSelectorElement != null && tenSelectorElement != null && hundredSelectorElement != null) {
        oneSelectorElement.classList.remove("selected");
        tenSelectorElement.classList.remove("selected");
        hundredSelectorElement.classList.remove("selected");
    }

    if (quantity == 1) {
        upgradeQuantitySelector = 1;
        if(oneSelectorElement != null){
            oneSelectorElement.classList.add("selected");
        }
        updateUpgrades();
    } else if (quantity == 10) {
        upgradeQuantitySelector = 10;
        if(tenSelectorElement != null){
            tenSelectorElement.classList.add("selected");
        }
        updateUpgrades();
    } else if (quantity == 100) {
        upgradeQuantitySelector = 100;
        if(hundredSelectorElement != null){
            hundredSelectorElement.classList.add("selected");
        }
        updateUpgrades();
    }
}

//Fonction qui s'occupe de l'achat des upgrade. 
//On précisant en argument quelle amélioration on veut acheter (1 = upgrade1, 2 = upgrade2, 3 = upgrade3)
function buyUpgrade(whichOne): void {
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
                if(upgrade1Unlocked == false){
                    //TODO : Succès débloqué
                    upgrade1Unlocked = true;
                }
            }
            break;

        //Amélioration n°2
        case 2:
            if (canBuyUpgrade(upgrade2Price)) {
                upgrade2lvl += upgradeQuantitySelector;
                if(upgrade2Unlocked == false){
                    //TODO : Succès débloqué
                    upgrade2Unlocked = true;
                }
            }
            break;

        //Amélioration n°3
        case 3:
            if (canBuyUpgrade(upgrade3Price)) {
                upgrade3lvl += upgradeQuantitySelector;
                if(upgrade3Unlocked == false){
                    //TODO : Succès débloqué
                    upgrade3Unlocked = true;
                }
            }
            break;

        //Amélioration n°4
        case 4:
            if(upgrade4lvl == 0){
                if (canBuyUpgrade(upgrade4DefaultPrice)) {
                    upgrade4lvl = 1;
                    if(upgrade4Unlocked == false){
                        //TODO : Succès débloqué
                        upgrade4Unlocked = true;
                    }
                }
            }
            break;

        //Amélioration n°5
        case 5:
            if(upgrade5lvl == 0){
                if (canBuyUpgrade(upgrade5DefaultPrice)) {
                    upgrade5lvl = 1;
                    if(upgrade5Unlocked == false){
                        //TODO : Succès débloqué
                        upgrade5Unlocked = true;
                    }
                }
            }
            break;
    }
    updateUpgrades();
}

//Fonction qui retourne true si le joueur à + d'argent que 'price'
function canBuyUpgrade(price): boolean {
    //Si le joueur a assez d'argent, alors on lui retire le prix de l'achat, on met à jour les statistiques, on met à jour l'argent et on retourne true
    if (money >= price) {
        money -= price;
        updateAlltimeSpent(price);
        updateMoney();
        return true;
    } else {
        return false;
    }
}




// ################### FONCTIONS QUI SONT APPELLEES LORSQUE DES VARIABLES ONT ETE MODIFIEES ###################
//Ces fonctions vont principalement actualiser l'interface utilisateur ainsi qu'effectuer des vérifications basiques (ex: Est-ce que le joueur à battu son record ?)

//Fonction qui met à jour le nom du joueur sur l'interface
function updatePlayerName(): void {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (playerNameElement != null) {
        playerNameElement.innerHTML = username;
    }
}

//Fonction qui met à jour l'argent possédé et vérifie si le joueur a battu son record
function updateMoney(): void {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (moneyElement != null) {
        moneyElement.innerHTML = money + " $ v" + version;
    }

    if(money > alltimeHighscore){
        updateAlltimeHighscore(money);
    }
}

//Fonction qui actualise les prix et le niveau actuel de chaque amélioration.
function updateUpgrades(): void {
    upgrade1Price = Math.floor(upgrade1DefaultPrice * Math.pow(1.5, (upgrade1lvl+upgradeQuantitySelector-1)));
    upgrade2Price = Math.floor(upgrade2DefaultPrice * Math.pow(1.5, (upgrade2lvl+upgradeQuantitySelector-1)));
    upgrade3Price = Math.floor(upgrade3DefaultPrice * Math.pow(3, (upgrade3lvl+upgradeQuantitySelector-1)));
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (
        upgrade1PriceElement != null &&
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
        upgrade5Element != null
    ) {
        upgrade1PriceElement.innerHTML = convertNumber(upgrade1Price) + " $";
        upgrade2PriceElement.innerHTML = convertNumber(upgrade2Price) + " $";
        upgrade3PriceElement.innerHTML = convertNumber(upgrade3Price) + " $";
        upgrade1LevelElement.innerHTML = "Niv. " + upgrade1lvl;
        upgrade2LevelElement.innerHTML = "Niv. " + upgrade2lvl;
        upgrade3LevelElement.innerHTML = "Niv. " + upgrade3lvl;

        //@ts-ignore
        upgrade1Element.setAttribute("title", "Augmente le nombre de $ par clic manuel de +10 par niveau. \nActuellement Niv. " + upgrade1lvl + " | Gains de + " + (10*upgrade1Level) + " $ par clic.");
        //@ts-ignore
        upgrade2Element.setAttribute("title", "Augmente le nombre de $ par clic automatique de +10 par niveau. \nActuellement Niv. " + upgrade2lvl + " | Gains de + " + (100*upgrade2Level) + " $ par seconde.");
        //@ts-ignore
        upgrade3Element.setAttribute("title", "Augmente le nombre de $ par clic manuel ET automatique de +1000 par niveau. \nActuellement Niv. " + upgrade3lvl + " | Gains de + " + (1000*upgrade3Level) + " $ par clic ET seconde.");
        
        if(upgrade4lvl == 1){
            upgrade4PriceElement.innerHTML = "Achat impossible";
            upgrade4LevelElement.innerHTML = "Niv. Max";
        }
        if(upgrade5lvl == 1){
            upgrade5PriceElement.innerHTML = "Achat impossible";
            upgrade5LevelElement.innerHTML = "Niv. Max";
        }
    }
}

//Fonction qui actualise le temps écoulé depuis le début de la partie.
function updateElapsedTime(): void {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (
        timeElapsedElementH != null &&
        timeElapsedElementM != null &&
        timeElapsedElementS != null
    ) {
        let h:number = Math.floor(elapsedTime / 3600);
        let m:number = Math.floor((elapsedTime % 3600) / 60);
        let s:number = (elapsedTime % 60);
        if(h < 10){
            timeElapsedElementH.innerHTML = "0" + h.toString() + ":";
        }else{
            timeElapsedElementH.innerHTML = h.toString() + ":";
        }
        if(m < 10){
            timeElapsedElementM.innerHTML = "0" + m.toString() + ":";
        }else{
            timeElapsedElementM.innerHTML = m.toString() + ":";
        }
        if(s < 10){
            timeElapsedElementS.innerHTML = "0" + s.toString();
        }else{
            timeElapsedElementS.innerHTML = s.toString();
        }
    }
    elapsedTime += 1;
}

//Fonction qui met à jour le nombre de clics tout comptes confondus
function updateAlltimeClicks(): void {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (alltimeClicksElement != null) {
        alltimeClicksElement.innerHTML =
            "Nombre de clics totaux  : " + alltimeClicks;
    }
}

//Fonction qui met à jour le nombre de $ gagnés tout comptes confondus
function updateAlltimeMoney(): void {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (alltimeMoneyElement != null) {
        alltimeMoneyElement.innerHTML = "Argent gagné total : " + alltimeMoney + " $";
    }
}

//Fonction qui met à jour le nombre de $ dépensés tout comptes confondus
function updateAlltimeSpent(price: number): void {
    alltimeSpent += price;
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (alltimeSpentElement != null) {
        alltimeSpentElement.innerHTML = "Argent depensé total : " + alltimeSpent + " $";
    }
}

//Fonction qui définit quel est le nouveau highscore tout compte confondus.
function updateAlltimeHighscore(newHighscore: number): void {
    alltimeHighscore = newHighscore;
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (alltimeHighscoreElement != null) {
        alltimeHighscoreElement.innerHTML =
            "Record total : " + newHighscore + " $";
    }
}

//Fonction qui actualise le nombre de clics/s sur l'interface
function updateClicksPerSecond(): void {
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if (clicksPerSecondElement != null) {
        //Pour déterminer le nombre de clics/s, on compare notre nombre de cicls total avec le nombre de clics total lors de la dernière mise à jour
        clicksPerSecondElement.innerHTML =
            "Clics par seconde : " + (alltimeClicks - clicksPerSecondLatest) + " cps";
            clicksPerSecondLatest = alltimeClicks;
    }
}

//Fonction qui actualise le nombre de $/s sur l'interface
function updateMoneyPerSecond():void{
    //Vérifie que les éléments sont bien chargés (exigé par Typescript)
    if(moneyPerSecondElement != null){
        //Pour déterminer le nombre de $/s, on compare notre nombre de $ total avec le nombre de $ total lors de la dernière mise à jour
        moneyPerSecondElement.innerHTML = "Dollars par seconde : " + (alltimeMoney - moneyPerSecondLatest) + " $/s";
        moneyPerSecondLatest = alltimeMoney;
    }
}

function manualSave(){
    if(manualSaveElement != null) {
        manualSaveElement.innerHTML = "Sauvegarde en cours...";
    }
    
    fetch('https://sae-301.azurewebsites.net/save-score.php', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            score: highscore,
            force: true
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Requête réussie : ' + JSON.stringify(data));
            console.log("Sauvegarde manuelle réussie");
            if(manualSaveElement != null) {
                manualSaveElement.innerHTML = "Sauvegarde réussie !";
                setTimeout(() => {
                    manualSaveElement.innerHTML = "Sauvegarder";
                }, 2000);
            }
    })
    .catch((error) => {
        console.error('Erreur sauvegarde manuelle: ' + error);
        if(manualSaveElement != null) {
            manualSaveElement.innerHTML = "Sauvegarde échouée !";
            setTimeout(() => {
                manualSaveElement.innerHTML = "Sauvegarder";
            }, 2000);
        }
    });
}