/* === JANELA === */
var altura = window.innerHeight;
var largura = window.innerWidth;

function setWindowSize(){
    altura = window.innerHeight;
    largura = window.innerWidth;
}

/* === MOSQUITO ===*/
var vidas = 1;
var tempo = 10;


var respawnTime;
var level = window.location.search;
level = level.replace('?', '');

if (level == 'facil'){respawnTime = 1500}
else if (level == 'medio'){respawnTime = 1000;}
else{respawnTime = 750;}

var cromometro = setInterval(function(){
    if(tempo == 0){
        clearInterval(cronometro);
        window.location.href = 'victory.html';
    }
    document.getElementById('cronometro').innerHTML = tempo;
    tempo--;
}, 1000);

function createMosquito(){
    if (document.getElementById('mosquito')){
        document.getElementById('mosquito').remove();
        
        if (vidas >= 3){
            window.location.href = 'game_over.html';
        }

        document.getElementById('v' + vidas).src = '../Images/coracao_vazio.png';
        vidas++;

    }

    var mosquito = document.createElement('img');

    var posX = Math.floor(Math.random() * largura) - 90;
    var posY = Math.floor(Math.random() * altura) - 90;
    if (posX < 0){posX = 0;}
    if (posY < 0){posY = 0;}

    mosquito.src = '../Images/mosquito.png';
    mosquito.className = randomMosquitoSize() + ' ' + randomMosquitoSide();
    mosquito.style.left = posX + 'px';
    mosquito.style.top = posY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function(){
        this.remove();
    }

    document.body.appendChild(mosquito);
}

function randomMosquitoSize(){
    var classe = Math.floor(Math.random() * 3);
    if(classe == 0){return 'mosquito1';}
    else if (classe == 1){return 'mosquito2';}
    else if (classe == 2){return 'mosquito3';}
}

function randomMosquitoSide(){
    var classe = Math.floor(Math.random() * 2);
    if(classe == 0){return 'mosquitoLadoA';}
    else if (classe == 1){return 'mosquitoLadoB';}
}

/* === MENU === */
function levarAoMenu(){
    window.location.href = "index.html";
}

function iniciarJogo(){
    var nivel = document.getElementById('level').value;
    if (nivel === ''){alert("Selecione um nível para iniciar o jogo!"); return false;}

    window.location.href = 'app.html?' + nivel;
}