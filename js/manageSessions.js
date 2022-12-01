let currentWebpage = window.location.pathname;

function createSession(username){
    localStorage.setItem('username', username);
    localStorage.setItem('money', 0);
    localStorage.setItem('upgrade1', 0);
}

function resetSession(){
    localStorage.clear();
}

function saveMoney(money){
    localStorage.setItem('money', money);
}
function saveUpgrade1(level){
    localStorage.setItem('upgrade1lvl', level);
}



if(currentWebpage.includes("index.html") || currentWebpage.match(/\/$/)){ //Page de connexion
    if(localStorage.getItem('username') == null){
        //TODO Premiere connexion / Reset
        //TODO Choisir son nom
        console.log("Premiere connexion");
    }else{
        //TODO Popup "session déjà existante !"
    }
} else if(currentWebpage.includes("game.html")){ //Page de jeu

} else { //Page autre
    console.log('Page inconnue');
}