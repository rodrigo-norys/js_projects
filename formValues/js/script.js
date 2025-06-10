function meuEscopo() {
    const form = document.querySelector('.form');
    const resultado = document.querySelector('.resultado');
    const pessoas = [];

    // Função para capturar um evento, utilizando um parâmetro para proibir a página de carregar e enviar o formulário.
    function recebeEventoForm(evento) {
        evento.preventDefault();

        // Captura de cada campo pela classe.
        const nome = form.querySelector('.nome');
        const sobrenome = form.querySelector('.sobrenome');
        const peso = form.querySelector('.peso');
        const altura = form.querySelector('.altura');

        // Captura dos VALORES de cada campo
        const pessoa = {
            nome: nome.value,
            sobrenome: sobrenome.value,
            peso: peso.value,
            altura: altura.value
        };

        // Adicionando o OBJETO pessoa dentro do array
        pessoas.push(pessoa);
        console.log(pessoas);

        // Lógica para exibir os dados coletados de cada pessoa
        resultado.innerHTML += `${nome.value} ${sobrenome.value} ${peso.value} ${altura.value}</br>`;
    };

    // Ouvinte adicionado para o evento 'submit', para impedir que o usuário faça o envio do formulário, permitindo manipular os dados de envio.
    form.addEventListener('submit', recebeEventoForm);
};

meuEscopo();