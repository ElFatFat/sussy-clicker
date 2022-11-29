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

