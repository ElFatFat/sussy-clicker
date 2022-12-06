// ################### FICHIER DE LA LOGIQUE PRINCIPALE DU JEU ###################
//Sauvegarde automatique toutes les 53 secondes
//(Si vous cherchez où est save(), c'est dans le fichier manageData.js.)
setInterval(save, 3000);
//Fonction de timer qui s'écoule
setInterval(updateElapsedTime, 1000);
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
    updateElapsedTime();
    updateAlltimeClicks();
    updateAlltimeMoney();
    updateAlltimeSpent();
    updateAlltimeHighscore(alltimeHighscore);
}
function updateElapsedTime() {
    elapsedTime += 1;
    if (timeElapsedElementH != null && timeElapsedElementM != null && timeElapsedElementS != null) {
        timeElapsedElementH.innerHTML = Math.floor(elapsedTime / 3600).toString() + " : ";
        timeElapsedElementM.innerHTML = Math.floor((elapsedTime % 3600) / 60).toString() + " : ";
        timeElapsedElementS.innerHTML = (elapsedTime % 60).toString();
    }
}
function manualClick() {
    alltimeClicks++;
    updateAlltimeClicks();
    money += 1;
    updateMoney();
}
function automaticClick() {
    // money += 1;
    // updateMoney();
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
        alltimeClicksElement.innerHTML = "AlltimeClicks : " + alltimeClicks + " clics";
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
        alltimeHighscoreElement.innerHTML = "AlltimeHighscore : " + newHighscore + " $";
    }
}
//Juste par curiosité, quelqu'un lit vraiment le code jusqu'ici ?
//# sourceMappingURL=game.js.map