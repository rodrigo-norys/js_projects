/*
Menos que 18,5    => Abaixo do peso
Entre 18,5 e 24,9 => Peso normal
Entre 25 e 29,9   => Sobrepeso
Entre 30 e 34,9   => Obesidade grau 1
Entre 35 e 39,9   => Obesidade grau 2
Entre 40 e 185    => Obesidade grau 3
*/

function tabelaIMC() {
    // Informando via classe os blocos que irei trabalhar
    const form = document.querySelector('.form');
    const resultado = document.querySelector('.resultado');

    function calcularIMC(evento) {
        evento.preventDefault();

        // Captura dos campos que vão ser trabalhados
        const peso = form.querySelector('#peso');
        const altura = form.querySelector('#altura');

        // Conversão para NUMBER das consts que retornam STRING.
        const pesoConvert = parseFloat(peso.value);
        const alturaConvert = parseFloat(altura.value);

        // Fórmula da conversão
        const calculoIMC = pesoConvert / (alturaConvert * alturaConvert);

        // Criando o objeto imc e captura dos VALORES de cada campo
        const imc = {
            peso: peso.value,
            altura: altura.value
        }

        if (calculoIMC >= 11.8) {
            resultado.style.backgroundColor = '#00ffcc';

            if ((calculoIMC >= 11.8) && (calculoIMC < 18.5)) {
                resultado.innerHTML = `Seu IMC é ${calculoIMC} (Abaixo do peso)`;
            }
            else if ((calculoIMC >= 18.5) && (calculoIMC <= 24.9)) {
                resultado.innerHTML = `Seu IMC é ${calculoIMC} (Peso normal)`;
            }
            else if ((calculoIMC >= 25) && (calculoIMC <= 29.9)) {
                resultado.innerHTML = `Seu IMC é ${calculoIMC} (Sobrepeso)`;
            }
            else if ((calculoIMC >= 30) && (calculoIMC <= 34.9)) {
                resultado.innerHTML = `Seu IMC é ${calculoIMC} (Obesidade grau 1)`;
            }
            else if ((calculoIMC >= 35) && (calculoIMC <= 39.9)) {
                resultado.innerHTML = `Seu IMC é ${calculoIMC} (Obesidade grau 2)`;
            }
            else if (calculoIMC >= 40) {
                resultado.innerHTML = `Seu IMC é ${calculoIMC} (Obesidade grau 2)`;
            }
        } 
        else {
            resultado.style.backgroundColor = 'red';
            if (peso < 0.212 || peso > 635 || typeof peso != 'number' || peso === 0) {
                resultado.innerHTML = `O peso é inválido`;
            }
            if (altura < 0.24 || altura > 2.74 || typeof altura != 'number' || altura === 0) {
                resultado.innerHTML = `A altura é inválida`;
            }        
        }
    }
    form.addEventListener('submit', calcularIMC);
}
tabelaIMC();