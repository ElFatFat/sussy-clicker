let search_field = document.getElementById("search_field");
let leaderboard = document.getElementById("leaderboard");
let youExists = false;

window.onload = function () {
    searchFullDatabase();
};


//Listen for every change of the input field when user stops modifying it for 1s
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
    if (search_value != "") {
        searchUsernameInDatabase(search_value);
    } else {
        searchFullDatabase();
    }
}


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

function searchFullDatabase() {
    fetch("https://sae-301.azurewebsites.net/get-leaderboard.php")
        .then((response) => response.json())
        .then((data) => {
            showLeaderboard(data);
        });
}

//Recoit un tableau en entrée, de la forme [{username: "username", score: "score"}]
function showLeaderboard(input) {
    let youExists = false;
    let position = 1;

    //On nettoie le contenu du leaderboard
    while (leaderboard.firstChild) {
        leaderboard.removeChild(leaderboard.firstChild);
    }

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

function scrollToYouClass() {
    let you = document.getElementsByClassName("you");
    if (you.length > 0) {
        you[0].scrollIntoView();
    }
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

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
