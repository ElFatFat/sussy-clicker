// ################### FICHIER DE LA LOGIQUE PRINCIPALE DU JEU ###################

//Sauvegarde automatique toutes les 53 secondes
//(Si vous cherchez où est save(), c'est dans le fichier manageData.js.)
setInterval(save, 3000);
//Fonction de timer qui s'écoule
setInterval(updateElapsedTime, 1000);

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


//Dès le chargement de la page, on vérifie l'intégrité des données, et si elles sont valides on appelle la fonction init().
window.onload = function() {
    if(!checkSaveValidity()) {
        window.location.href = "index.html";
    } else {
        init();
    }
}

//Fonction principale
function init(){
    loadSave();
    updatePlayerName();
    updateMoney();
    updateElapsedTime();
    updateAlltimeClicks();
    updateAlltimeMoney();
    updateAlltimeSpent();
    updateAlltimeHighscore(alltimeHighscore);
}



function updateElapsedTime(): void{
    elapsedTime += 1;
    if(timeElapsedElementH != null && timeElapsedElementM != null && timeElapsedElementS != null){
        timeElapsedElementH.innerHTML = Math.floor(elapsedTime / 3600).toString() + " : ";
        timeElapsedElementM.innerHTML = Math.floor((elapsedTime % 3600) / 60).toString() + " : ";
        timeElapsedElementS.innerHTML = (elapsedTime % 60).toString();
    }
}

function manualClick(): void{
    alltimeClicks++;
    updateAlltimeClicks();
    
    money += 1;
    updateMoney();
}

function automaticClick(): void{
    // money += 1;
    // updateMoney();
}

// ################### FICHIERS NULLES DE MISES A JOUR D'AFFICHAGE ###################
function updatePlayerName(): void{
    if(playerNameElement != null){
        playerNameElement.innerHTML = username;
    }
}
function updateMoney(): void{
    if(moneyElement != null){
        moneyElement.innerHTML = money + " $";
    }
    if(money>alltimeHighscore){
        updateAlltimeHighscore(money);
    }
}
function updateAlltimeClicks(): void{
    if(alltimeClicksElement != null){
        alltimeClicksElement.innerHTML = "AlltimeClicks : " + alltimeClicks + " clics";
    }
}
function updateAlltimeMoney(): void{
    if(alltimeMoneyElement != null){
        alltimeMoneyElement.innerHTML = "AlltimeMoney : " + alltimeMoney + " $";
    }
}
function updateAlltimeSpent(): void{
    if(alltimeSpentElement != null){
        alltimeSpentElement.innerHTML = "AlltimeSpent : " + alltimeSpent + " $";
    }
}
function updateAlltimeHighscore(newHighscore:number): void{
    alltimeHighscore = newHighscore;
    if(alltimeHighscoreElement != null){
        alltimeHighscoreElement.innerHTML = "AlltimeHighscore : " + newHighscore + " $";
    }
}
//Juste par curiosité, quelqu'un lit vraiment le code jusqu'ici ?