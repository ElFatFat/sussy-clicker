let search_field = document.getElementById("search_field");

let leaderboard = document.getElementById("leaderboard");

//Call function every time the content of the input field changes
search_field.addEventListener("input", function () {
    let search_value = search_field.value;
    if (search_value != "") {
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


        leaderboardPosition.innerHTML = position;
        leaderboardUsername.innerHTML = element.username;
        leaderboardScore.innerHTML = element.score;

        if (element.username == localStorage.getItem("username")) {
            leaderboardItem.classList.add("you");
        }
        leaderboard.appendChild(leaderboardItem);
        leaderboardItem.appendChild(leaderboardPosition);
        leaderboardItem.appendChild(leaderboardUsername);
        leaderboardItem.appendChild(leaderboardScore);
        position++;
    });
}

function scrollToYouClass() {
    let you = document.getElementsByClassName("you");
    if (you.length > 0) {
        you[0].scrollIntoView();
    }
}
