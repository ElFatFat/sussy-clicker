function sendScoreToDatabase(username, score) {
    let data = JSON.stringify({ username: username, score: score });
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = responseSendScoreToDatabase;
    httpRequest.open(
        "POST",
        "https://sae-301.azurewebsites.net/save-score.php",
        true
    );
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(data);
}
function responseSendScoreToDatabase() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            console.log("Score sauvegardé");
        } else {
            console.log("Il y a eu un problème avec la requête.");
        }
    }
}
