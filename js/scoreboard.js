//Reference aux éléments HTML
let search_field = document.getElementById("search_field");
let leaderboard = document.getElementById("leaderboard");

//Variable qui surveille si l'utilisateur existe dans la base de données
let youExists = false;

//On appelle la fonction qui va envoyer la requête au serveur dès la fin du chargement de la page.
window.onload = function () {
    searchFullDatabase();
};


//Fonction qui permet de surveiller si l'utilisateur a fini de taper dans le champ de recherche
let typingTimer;
let doneTypingInterval = 1000;
search_field.addEventListener("keyup", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});
search_field.addEventListener("keydown", function () {
    clearTimeout(typingTimer);
});

function doneTyping() {
    let search_value = search_field.value;
    //Si le champ est vide, on cherche dans la base de données entière, sinon on cherche dans la base de données avec le nom d'utilisateur fourni
    if (search_value != "") {
        searchUsernameInDatabase(search_value);
    } else {
        searchFullDatabase();
    }
}

//Fonction qui permet de rechercher un utilisateur dans la base de données
function searchUsernameInDatabase(username) {
    const data = {
        username: username,
    };
    const queryParams = new URLSearchParams(data);

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = responseSearchUsernameInDatabase;
    httpRequest.open(
        "POST",
        "https://sae-301.azurewebsites.net/get-user-score.php?" + queryParams,
        true
    );
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(data);
}
//Fonction qui permet de traiter la réponse du serveur
function responseSearchUsernameInDatabase() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let tab = [];
            tab.push(JSON.parse(httpRequest.responseText));
            showLeaderboard(tab);
        } else {
            searchFullDatabase();
        }
    }
}

//Fonction qui permet de rechercher tous les utilisateurs dans la base de données
function searchFullDatabase() {
    fetch("https://sae-301.azurewebsites.net/get-leaderboard.php")
        .then((response) => response.json())
        .then((data) => {
            showLeaderboard(data);
        });
}

//Fonction qui permet d'afficher le leaderboard
//Recoit un tableau en entrée, de la forme [{username: "username", score: "score"}]
function showLeaderboard(input) {
    youExists = false;
    let position = 1;

    //On nettoie le contenu du leaderboard
    while (leaderboard.firstChild) {
        leaderboard.removeChild(leaderboard.firstChild);
    }

    //Pour chaque élément du tableau, on crée un élément HTML qui va être affiché dans le leaderboard
    input.forEach((element) => {
        let leaderboardItem = document.createElement("div");
        leaderboardItem.classList.add("leaderboardItem");

        let leaderboardPosition = document.createElement("div");
        leaderboardPosition.classList.add("leaderboardPosition");

        let leaderboardUsername = document.createElement("div");
        leaderboardUsername.classList.add("leaderboardUsername");

        let leaderboardScore = document.createElement("div");
        leaderboardScore.classList.add("leaderboardScore");

        leaderboardPosition.innerHTML = position+".";


        if (element.username.length > 20) {
            leaderboardUsername.innerHTML = element.username.substring(0, 20) + "...";
        }else{
            leaderboardUsername.innerHTML = element.username;
        }

        leaderboardScore.innerHTML = convertNumber(element.score);

        //Si l'élement actuel posséde le même nom d'utilisateur que l'utilisateur actuel, on lui ajoute la classe "you" et on définit la variable youExists à true
        if (element.username == localStorage.getItem("username")) {
            leaderboardItem.classList.add("you");
            youExists = true;
        }
        leaderboardItem.setAttribute("title", "Nom : " + element.username + " | Score : " + element.score);

        leaderboard.appendChild(leaderboardItem);
        leaderboardItem.appendChild(leaderboardPosition);
        leaderboardItem.appendChild(leaderboardUsername);
        leaderboardItem.appendChild(leaderboardScore);
        position++;

        if(youExists){
            document.getElementById("scrollToYou").style.display = "flex";
        }else{
            document.getElementById("scrollToYou").style.display = "none";
        }
    });
}

//Fonction qui permet de scroller jusqu'à l'utilisateur
function scrollToYouClass() {
    let you = document.getElementsByClassName("you");
    if (you.length > 0) {
        you[0].scrollIntoView({behavior: "smooth"});
    }
}


//Fonction qui permet de convertir un nombre en notation lisible.
//Duplicata de la fonction convertNumber dans le fichier manageDate.ts
//Mais charger le fichier manageDate.ts est trop lourd pour une fonction aussi simple
function convertNumber(string){
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

//Fonction pour remonter tout en haut de la page
function scrollToTop() {
    var anchor = document.getElementById("anchor");
    anchor.scrollIntoView({behavior: "smooth"});
}