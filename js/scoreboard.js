let leaderboard;

window.onload = function () {
  fetch("https://sae-301.azurewebsites.net/get-leaderboard.php")
  .then((response) => response.json())
  .then((data) => {
    data.forEach(element => {
      //Add html element
      let li = document.createElement("li");
      li.innerHTML = element.username + " : " + element.score;
      document.getElementById("leaderboard").appendChild(li);
    });
  });
};


function searchUsernameInDatabase(username){
  let data = JSON.stringify({"username": username});

  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = responseSearchUsernameInDatabase;
  httpRequest.open('POST', 'https://sae-301.azurewebsites.net/get-user-score.php', true);
  httpRequest.setRequestHeader("Content-Type", "application/json");
  httpRequest.send(data);
}
function responseSearchUsernameInDatabase(){
if (httpRequest.readyState === XMLHttpRequest.DONE) {
  if (httpRequest.status === 200) {
      console.log(httpRequest.responseText);
  } else {
      console.log('Il y a eu un problème avec la requête.');
  }
}
}