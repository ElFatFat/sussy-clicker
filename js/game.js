let username = 'Placeholder';
let money = 0;
let upgrade1lvl = 0;
let upgrade2lvl = 0;
let upgrade3lvl = 0;
let elapsedTime = 0;


function loadSaveData(){
    if(localStorage.getItem('username') == null){
        alert('Veuillez vous connecter pour jouer.');
        window.location.href = "index.html";
    }else{
        try {
            username = localStorage.getItem('username');
            money = localStorage.getItem('money');
            upgrade1lvl = localStorage.getItem('upgrade1lvl');
            elapsedTime = localStorage.getItem('elapsedTime');
        } catch (error) {
            console.error(error);
        }
    }
}

function test(){
    console.warn("AHAHAHAHAHAHAHA");
    console.error("ENCULE DE TA MERE LA PUTE");
    console.info("C'est moi le plus fort");
    console.debug("Je suis un debug");
    console.assert(1 == 2, "1 n'est pas égal à 2");
}