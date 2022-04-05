const container = document.querySelector(".container");
const play = document.getElementById("play");
const difficulty = document.getElementById("difficulty");
play.addEventListener("click", playFunction);

const easyLength = 100;
const hardLength = 81;
const crazyLength = 49;

let lunghezza;
let boxClass;
let punteggio;
let score = false;
let tentativiRimasti = false;
let errors;

// Funzione RESET

function playReset() {
    if(!score){  //creo score se non c'è
        score = document.createElement("div");
        score.setAttribute("class", "score");
        document.body.append(score);
    }
    if(!tentativiRimasti){  //creo tentativi se non c'è
        tentativiRimasti = document.createElement("div");
        tentativiRimasti.setAttribute("class", "tentativi");
        document.body.append(tentativiRimasti);
    }
    // reset
    punteggio = 0;
    errors = 3;
    tentativiRimasti.innerHTML = errors;
    score.innerHTML = punteggio;

    container.innerHTML = "";
}

// Funzione DIFFICOLTA'

function playDifficulty() {
    if (difficulty.value == "easy"){
        lunghezza = easyLength;
        boxClass = "box-easy";
    }
    else if (difficulty.value == "hard"){
        lunghezza = hardLength;
        boxClass = "box-hard";
    }
    else if (difficulty.value == "crazy"){
        lunghezza = crazyLength;
        boxClass = "box-crazy";
    }
}

// Funzione PLAY

function playFunction() {

    // Reset SCORE
    playReset();
    
    // Selezione Difficoltà
    playDifficulty();
    
    // Creazione dei BOX
    let boxes = [];
    let i = 1;

    while (i <= lunghezza){
        let box = document.createElement("div");
        box.setAttribute("class",`box ${boxClass} pointer`);
        box.innerHTML = i;
        container.append(box);
        box.addEventListener("click", blueOnclick);
        boxes.push(box);
        i++;
    }
    
    // Creazione BOMBE
    let bombs = [];
    let counter = 0;
    
    while (counter < 16){
        let n = Math.floor(Math.random() * lunghezza );
        console.log("random:" + n)
        if (!bombs.includes(n)){
            bombs.push(n);
            console.log(bombs);
            // cambio classe
            boxes[n].removeEventListener("click", blueOnclick);
            boxes[n].addEventListener("click", redOnclick);
            boxes[n].setAttribute("bomba", true);
    
            counter++;
        }
    }

    console.log("randombox: " + bombs);
}

// Funzione SALVO

function blueOnclick () {
    this.innerHTML = ''
    this.style.background = "#6495ED";
    this.classList.remove("pointer");
    console.log("salvo")
    this.removeEventListener("click", blueOnclick);
    punteggio++;
    score.innerHTML = punteggio;
}

// Funzione BOMBA

function redOnclick () {
    this.innerHTML = '<img class="bomb" src="img/bomb2.png">';
    this.style.background = "red";
    this.classList.remove("pointer");
    this.removeEventListener("click", redOnclick);
    errors--;
    //console.log("errori: ", errors);
    tentativiRimasti.innerHTML = errors;
    // condizione per sconfitta
    if(errors === 0) {
        // setTimeout(() => { scopriTutto, 100});
        scopriTutto();
        // return setTimeout(gameOver, 1000);
    }
}

// Funzione GAMEOVER

function gameOver (){
    alert("Hai perso!");
    let newGame = prompt("Gioca ancora! Premi Ok se vuoi giocare, o scrivi 'no' se vuoi smettere");
    if(newGame === "no"){
        return;
    }
    else{
        return playFunction();
    }
}

// Funzione che scopre la griglia
function scopriTutto(){
    let finalGrid = document.getElementsByClassName("box");
    console.log(finalGrid)
    for(i = 0; i < finalGrid.length; i++) {
        if (finalGrid[i].hasAttribute("bomba", true)){
            finalGrid[i].style.backgroundColor = "red";
            finalGrid[i].innerHTML = '<img class="bomb" src="img/bomb2.png"></img>';
        }
        else {
            finalGrid[i].innerHTML = '';
            finalGrid[i].style.background = "#6495ED";
        }
    }
    
    setTimeout(() => { gameOver(), 200});

}
