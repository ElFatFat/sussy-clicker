let search_field = document.getElementById("search_field");

let leaderboard;

//Call function every time the content of the input field changes
search_field.addEventListener("input", function () {
    console.log("test");
    let search_value = search_field.value;
    if (search_value != "") {
        console.log("Recherche de " + search_value);
        searchUsernameInDatabase(search_value);
    } else {
        searchFullDatabase();
    }
});

window.onload = function () {
    searchFullDatabase();
};

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
            console.log("Il y a eu un problème avec la requête.");
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

function showLeaderboard(input) {
    let leaderboard = document.getElementById("leaderboard");

    //On nettoie le contenu du leaderboard
    while (leaderboard.firstChild) {
        leaderboard.removeChild(leaderboard.firstChild);
    }

    input.forEach((element) => {
        let leaderboardList = document.createElement("p");
        leaderboardList.innerHTML = element.username + " : " + element.score;
        leaderboardList.classList.add("leaderboardLine");
        if (element.username == localStorage.getItem("username")) {
            leaderboardList.classList.add("you");
        }
        leaderboard.appendChild(leaderboardList);
    });
}
