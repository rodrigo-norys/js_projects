let interval = null;
let seconds = 0;
let minutes = 0;
let hours = 0;

// Bloco da section sendo criado.
createYourHtml('section', 'class', 'container', 'body', 'prepend');

// // Parágrafo que exibe o contador.
const p = createYourHtml('p', 'class', 'timerScope', '.container', 'appendChild'); // inicializa sem chamar funções
p.style.fontSize = '50px';
p.innerText = '00:00:00';

// Título sendo criado com seu conteúdo.
createYourHtml('h2', 'class', 'meuTimer', '.container', 'prepend').textContent = "Meu Timer";

// Immediately Invoked Function Expression (IIFE)
(function buttons() {
    // Laço de criação dos botões.
    const button = ['Start', 'Pause', 'Reset'];
    for (i = 0; i < button.length; i++) {
        createYourHtml('button', 'id', `button${i + 1}`, '.container', 'appendChild').innerText = button[i];
    }
    
    // Laço de seleção dos botões para aplicação do CSS.
    const buttons = document.querySelectorAll('#button2, #button3');
    for (let button of buttons) {
        button.style.marginLeft = '10px';
    }
})();

// Engine do Timer.
function myTimer() {
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    
    return `${zeroToTheLeft(hours)}:${zeroToTheLeft(minutes)}:${zeroToTheLeft(seconds)}`;
}

// Inicia o cronômetro.
function timerStart() {
    p.style.color = 'black';

    if (!interval) {
        showMyTimer();
        interval = setInterval(showMyTimer, 1000);
    }
}

// Pausa o cronômetro.
function timerStop() {
    p.style.color = 'red';

    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

// Reseta o cronômetro.
function timerReset() {
    if ((interval) || (!interval)) {
        seconds = 0;
        minutes = 0;
        hours = 0;
        p.innerText = '00:00:00';
    }
}

// Exibição do Timer.
function showMyTimer() {
    seconds++
    const meuTimerSelector = document.querySelector('.timerScope');
    meuTimerSelector.innerText = myTimer();
}

window.addEventListener('load', myTimer);
document.getElementById('button1').addEventListener('click', timerStart);
document.getElementById('button2').addEventListener('click', timerStop);
document.getElementById('button3').addEventListener('click', timerReset);