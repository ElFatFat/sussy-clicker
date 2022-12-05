//Sauvegarde automatique toutes les 5 secondes
//(Si vous cherchez où est save(), c'est dans le fichier manageData.js.)
setInterval(save, 5000);

function clickTree(){
    money += 1;
    allTimeClicks += 1;
    // updateMoney();
}