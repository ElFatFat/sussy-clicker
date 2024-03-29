// ################### FICHIER DE GESTION DES DONNEES (VARIABLES/SAUVEGARDES) ###################

// ################### VARIABLES ###################
let username: string;
let money: number;
let upgrade1lvl: number;
let upgrade2lvl: number;
let upgrade3lvl: number;
let upgrade4lvl: number;
let upgrade5lvl: number;
let elapsedTime: number;
let highscore: number;
let alltimeClicks: number;
let alltimeMoney: number;
let alltimeSpent: number;
let alltimeHighscore: number;
let clicksPerSecondLatest: number;
let moneyPerSecondLatest: number;

let upgrade1DefaultPrice: number = 100;
let upgrade2DefaultPrice: number = 100;
let upgrade3DefaultPrice: number = 10000;
let upgrade4DefaultPrice: number = 1000;
let upgrade5DefaultPrice: number = 1000;
let upgrade1Price: number;
let upgrade2Price: number;
let upgrade3Price: number;
let upgrade4Price: number;
let upgrade5Price: number;

let upgrade1Unlocked: boolean = false;
let upgrade2Unlocked: boolean = false;
let upgrade3Unlocked: boolean = false;

let achievementMoney100: boolean = false;
let achievementMoney1000: boolean = false;
let achievementMoney10000: boolean = false;
let achievementMoney100000: boolean = false;
let achievementMoney1000000: boolean = false;

//Nom de la page actuelle
let currentWebpage = window.location.pathname;

//Référence pour afficher le popup sur la page index.html lorsque qu'une sauvegarde est trouvée
let usernameFoundElement = document.getElementById("usernameFound");
let moneyFoundElement = document.getElementById("moneyFound");
let popupSaveDataFoundElement = document.getElementById("popupSaveDataFound");

//Référence pour récupérer le nom d'utilisateur entré dans le champ de texte
let usernameFieldElement = document.getElementById("username_field") as HTMLInputElement;


//Vérification de l'existence d'une sauvegarde selon la page dans laquelle l'utilisateur est.
//On vérifie que l'on est sur la page /index.html ou / (racine du site)
if (currentWebpage.match("index.html") || currentWebpage.match(/\/$/)) {
    //Verification que les données de sauvegarde existent et affichage du popup si c'est le cas
    if (checkSaveValidity()) {
        //Vérifie que les éléments sont bien chargés (exigé par Typescript)
        if (
            usernameFoundElement != null &&
            moneyFoundElement != null &&
            popupSaveDataFoundElement != null
        ) {
            {
                //On met à jour les informations du popup pour indiquer les données de la sauvegarde.
                usernameFoundElement.innerHTML =
                    "Nom : " + localStorage.getItem("username");
                moneyFoundElement.innerHTML =
                    "Argent : " + localStorage.getItem("money") + " $";
                //On affiche le popup informant que des informations ont été trouvées
                popupSaveDataFoundElement.classList.remove("hidden");
            }
        }
    }
}

//Fonction qui vérifie si le nom fourni par l'utilisateur est valide. Si c'est le cas, création d'une sauvegarde et redirection vers la page de jeu.
function validateUsername(): void {
    if(usernameFieldElement != null){
        let usernameFromField = usernameFieldElement.value;
        if (usernameFromField != "") {
            createSave(usernameFromField);
            window.location.href = "game.html";
        } else {
            alert("Veuillez entrer un nom d'utilisateur");
        }
    }
}

// ################### CODE JUSTE POUR MANAGE LES DONNEES DE SAUVEGARDES ###################
function createSave(username) {
    localStorage.setItem("username", username);
    localStorage.setItem("money", '0');
    localStorage.setItem("upgrade1lvl", '0');
    localStorage.setItem("upgrade2lvl", '0');
    localStorage.setItem("upgrade3lvl", '0');
    localStorage.setItem("upgrade4lvl", '0');
    localStorage.setItem("upgrade5lvl", '0');
    localStorage.setItem("elapsedTime", '0');
    localStorage.setItem("upgrade1Unlocked", 'false');
    localStorage.setItem("upgrade2Unlocked", 'false');
    localStorage.setItem("upgrade3Unlocked", 'false');

    if (localStorage.getItem("alltimeClicks") == null) {
        localStorage.setItem("alltimeClicks", '0');
    }
    if (localStorage.getItem("alltimeMoney") == null) {
        localStorage.setItem("alltimeMoney", '0');
    }
    if (localStorage.getItem("alltimeSpent") == null) {
        localStorage.setItem("alltimeSpent", '0');
    }
    if (localStorage.getItem("alltimeHighscore") == null) {
        localStorage.setItem("alltimeHighscore", '0');
    }
    if (localStorage.getItem("achievementMoney100") == null) {
        localStorage.setItem("achievementMoney100", 'false');
    }
    if (localStorage.getItem("achievementMoney1000") == null) {
        localStorage.setItem("achievementMoney1000", 'false');
    }
    if (localStorage.getItem("achievementMoney10000") == null) {
        localStorage.setItem("achievementMoney10000", 'false');
    }
    if (localStorage.getItem("achievementMoney100000") == null) {
        localStorage.setItem("achievementMoney100000", 'false');
    }
    if (localStorage.getItem("achievementMoney1000000") == null) {
        localStorage.setItem("achievementMoney1000000", 'false');
    }


}

//Fonction qui supprime les données de base de la sauvegarde et redirige vers la page d'accueil
function deleteSave():void {
    localStorage.removeItem("username");
    localStorage.removeItem("money");
    localStorage.removeItem("upgrade1lvl");
    localStorage.removeItem("upgrade2lvl");
    localStorage.removeItem("upgrade3lvl");
    localStorage.removeItem("upgrade4lvl");
    localStorage.removeItem("upgrade5lvl");
    localStorage.removeItem("elapsedTime");
    localStorage.removeItem("upgrade1Unlocked");
    localStorage.removeItem("upgrade2Unlocked");
    localStorage.removeItem("upgrade3Unlocked");
    window.location.href = "index.html";
}

//Fonction qui supprime les données de statistiques et de sauvegarde
function deleteStatistics():void {
    localStorage.removeItem("alltimeClicks");
    localStorage.removeItem("alltimeMoney");
    localStorage.removeItem("alltimeSpent");
    localStorage.removeItem("alltimeHighscore");
    localStorage.removeItem("achievementMoney100");
    localStorage.removeItem("achievementMoney1000");
    localStorage.removeItem("achievementMoney10000");
    localStorage.removeItem("achievementMoney100000");
    localStorage.removeItem("achievementMoney1000000");
    deleteSave();
}
    
//Fonction qui sauvegarde les données de la partie en cours
//On récupère les valeurs de chaque variable, on les convertit en string et on les enregistre dans le localStorage
function save():void {
    localStorage.setItem("username", username);
    localStorage.setItem("money", money.toString());
    localStorage.setItem("upgrade1lvl", upgrade1lvl.toString());
    localStorage.setItem("upgrade2lvl", upgrade2lvl.toString());
    localStorage.setItem("upgrade3lvl", upgrade3lvl.toString());
    localStorage.setItem("upgrade4lvl", upgrade4lvl.toString());
    localStorage.setItem("upgrade5lvl", upgrade5lvl.toString());
    localStorage.setItem("elapsedTime", elapsedTime.toString());
    localStorage.setItem("alltimeClicks", alltimeClicks.toString());
    localStorage.setItem("alltimeMoney", alltimeMoney.toString());
    localStorage.setItem("alltimeSpent", alltimeSpent.toString());
    localStorage.setItem("alltimeHighscore", alltimeHighscore.toString());
    localStorage.setItem("upgrade1Unlocked", upgrade1Unlocked.toString());
    localStorage.setItem("upgrade2Unlocked", upgrade2Unlocked.toString());
    localStorage.setItem("upgrade3Unlocked", upgrade3Unlocked.toString());
    localStorage.setItem("achievementMoney100", achievementMoney100.toString());
    localStorage.setItem("achievementMoney1000", achievementMoney1000.toString());
    localStorage.setItem("achievementMoney10000", achievementMoney10000.toString());
    localStorage.setItem("achievementMoney100000", achievementMoney100000.toString());
    localStorage.setItem("achievementMoney1000000", achievementMoney1000000.toString());
}

//Fonction qui charge les données de la partie en cours
//On récupère les valeurs de chaque variable dans le localStorage, on les convertitau type nécessaire et on les affecte aux variables
function loadSave():void {
    //Le 'as string' est nécessaire car Typescript alerte d'une erreur de type string||null. Or on sait que la valeur ne sera jamais null. On peut donc forcer le type.
    username = localStorage.getItem("username");
    money = parseInt(localStorage.getItem("money"));
    highscore = 0;
    upgrade1lvl = parseInt(localStorage.getItem("upgrade1lvl") as string);
    upgrade2lvl = parseInt(localStorage.getItem("upgrade2lvl") as string);
    upgrade3lvl = parseInt(localStorage.getItem("upgrade3lvl") as string);
    upgrade4lvl = parseInt(localStorage.getItem("upgrade4lvl") as string);
    upgrade5lvl = parseInt(localStorage.getItem("upgrade5lvl") as string);
    if(upgrade5lvl > 0){
        document.getElementById('clicker').style.backgroundImage = "url('../img/log3.png')";
    }
    elapsedTime = parseInt(localStorage.getItem("elapsedTime") as string);
    alltimeClicks = parseInt(localStorage.getItem("alltimeClicks") as string);
    alltimeMoney = parseInt(localStorage.getItem("alltimeMoney") as string);
    alltimeSpent = parseInt(localStorage.getItem("alltimeSpent") as string);
    alltimeHighscore = parseInt(localStorage.getItem("alltimeHighscore") as string);
    clicksPerSecondLatest = alltimeClicks;
    moneyPerSecondLatest = alltimeMoney;

    upgrade1Unlocked = (localStorage.getItem("upgrade1Unlocked") as string == 'true') ? true : false;
    upgrade2Unlocked = (localStorage.getItem("upgrade2Unlocked") as string == 'true') ? true : false;
    upgrade3Unlocked = (localStorage.getItem("upgrade3Unlocked") as string == 'true') ? true : false;

    achievementMoney100 = (localStorage.getItem("achievementMoney100") as string == 'true') ? true : false;
    achievementMoney1000 = (localStorage.getItem("achievementMoney1000") as string == 'true') ? true : false;
    achievementMoney10000 = (localStorage.getItem("achievementMoney10000") as string == 'true') ? true : false;
    achievementMoney100000 = (localStorage.getItem("achievementMoney100000") as string == 'true') ? true : false;
    achievementMoney1000000 = (localStorage.getItem("achievementMoney1000000") as string == 'true') ? true : false;
}

//Fonction qui vérifie rapidement si certaines valeurs de sauvegarde sont présentes
function checkSaveValidity():boolean {
    if (
        localStorage.getItem("username") == undefined ||
        localStorage.getItem("money") == undefined ||
        localStorage.getItem("upgrade1lvl") == undefined ||
        localStorage.getItem("upgrade2lvl") == undefined ||
        localStorage.getItem("upgrade3lvl") == undefined ||
        localStorage.getItem("upgrade4lvl") == undefined ||
        localStorage.getItem("upgrade5lvl") == undefined
    ) {
        return false;
    } else {
        return true;
    }
}

//Fonction qui converti un nombre en notation plus lisible
//Ex : 1000 -> 1 K ; 1000000 -> 1 M ; 1000000000 -> 1 Md
function convertNumber(string): string{
    let input = string.toString();
    if (input.length > 3 && input.length <= 6) {
        return input.substring(0, input.length-3) + "." + input.substring(input.length-3, input.length-2) + " K";
    }else if (input.length > 6 && input.length <= 9) {
        return input.substring(0, input.length-6) + "." + input.substring(input.length-6, input.length-5) + " M";
    }else if (input.length > 9 && input.length <= 12) {
        return input.substring(0, input.length-9) + "." + input.substring(input.length-9, input.length-8) + " Md";
    }else if (input.length > 12 && input.length <= 15) {
        return input.substring(0, input.length-12) + "." + input.substring(input.length-12, input.length-11) + " B";
    }else if (input.length > 15 && input.length <= 18) {
        return input.substring(0, input.length-15) + "." + input.substring(input.length-15, input.length-14) + " T";
    }else if (input.length > 18 && input.length <= 21) {
        return input.substring(0, input.length-18) + "." + input.substring(input.length-18, input.length-17) + " Qa";
    }else if (input.length > 21 && input.length <= 24) {
        return input.substring(0, input.length-21) + "." + input.substring(input.length-21, input.length-20) + " Qi";
    }else {
        return input;
    }
}

function goToGame():void {
    window.location.href = "game.html";
}