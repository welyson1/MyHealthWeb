window.onload = () => {       

    if (localStorage.getItem("vacinas") !== null) {
        vacinas = JSON.parse(localStorage.getItem("vacinas"));
    } 
    carregarTabelaVacinas()
}

// Array que irá armazenar todas as vacinas cadastradas
let vacinas = [];

// Apaga o arquivo JSON do localStorage
let apagarJson = document.getElementById("apagarJson");
apagarJson.addEventListener("click", function() {    
    localStorage.removeItem("vacinas");
    console.log("Arquivo removido");
});

// Verifica se há dados armazenados no Web Storage e carrega para o array "vacinas"

// function atualizarVacina(index, vacina) {
//     vacinas[index] = vacina;

//     // Atualiza os dados armazenados no localStorage com o novo array "vacinas"
//     localStorage.setItem("vacinas", JSON.stringify(vacinas));
// }

function removerVacina(card_vacina) {
    let index = parseInt(card_vacina.dataset.index);
    
    vacinas.splice(index, 1);

    // Atualiza os dados armazenados no localStorage com o novo array "vacinas"
    localStorage.setItem("vacinas", JSON.stringify(vacinas));
    window.location.href = 'Home.html';
}

// Função para adicionar uma nova vacina ao array

function adicionarVacina(nome, data, doseSelecionada, comprovante, proximaData) {
    let vacina = {
        nome: nome,
        data: data,
        doseSelecionada: doseSelecionada,
        comprovante: comprovante,
        proximaData: proximaData
    };
    vacinas.push(vacina);
    localStorage.setItem("vacinas", JSON.stringify(vacinas));
    window.location.href = 'Home.html';
}

// Função para carregar a tabela de vacinas com as vacinas cadastradas
function carregarTabelaVacinas() {    
    //cellComprovante.innerHTML = `<img src="${vacina.comprovante}" alt="Comprovante da vacinação">`;

    //Seleção da section com propriedade grid que irão os cards de vacina
    const section_grid = document.querySelector('section.section-grid');   
    

    for (let index = 0; index < vacinas.length; index++) {    
    
        //Criação do molde do card dentro da section
        const card_vacina = document.createElement('div');
        card_vacina.dataset.index = index;
        card_vacina.setAttribute('class', 'card-vacina');  
        card_vacina.setAttribute('onclick', 'removerVacina(this)')//Define o onclick no elemento para função remover    
        section_grid.appendChild(card_vacina);

        //Criando a parte superior do card de vacina
        const cabeca_card = document.createElement('div');
        cabeca_card.dataset.index = index;
        cabeca_card.setAttribute('class', 'cabeca-card');
        card_vacina.appendChild(cabeca_card);
        //preenchendo a parte superior do card com informações
        //Titulo
        const titulo_vacina = document.createElement('h2');
        titulo_vacina.setAttribute('id', 'titulo-vacina');
        //Quantidade da dose
        const qtd_dose = document.createElement('label');
        qtd_dose.setAttribute('id', 'qtd-dose');
        //Data da dose
        const data_dose = document.createElement('time');
        data_dose.setAttribute('id', 'data-dose');
        //Colocar o titulo, label e data como filho do elemento cabeca-card
        cabeca_card.appendChild(titulo_vacina);
        cabeca_card.appendChild(qtd_dose);
        cabeca_card.appendChild(data_dose);
        //Preenchendo com informações
        titulo_vacina.innerText = vacinas[index].nome; //-------
        qtd_dose.innerText = vacinas[index].doseSelecionada; //--------
        data_dose.innerText = vacinas[index].data //-------

        //Criação do modelo de para colocar a imagem
        const image_card = document.createElement('div');
        image_card.dataset.index = index;
        image_card.setAttribute('class', 'image-card');
        card_vacina.appendChild(image_card);
        //Criação do elemento de imagem
        const imagem_comprovante_car = document.createElement('img');
        //Definição dos atributos do elemento de img
        imagem_comprovante_car.setAttribute('id', 'imagem-comprovante-car');
        imagem_comprovante_car.setAttribute('src', '/img/image-comprovante.png'); //-------
        //Colocando como filho da div image-card
        image_card.appendChild(imagem_comprovante_car);

        //Criação do modelo de vencimento-card
        const vencimento_card = document.createElement('div');
        vencimento_card.dataset.index = index;
        vencimento_card.setAttribute('class', 'vencimento-card');
        //Colocando como filho do card-vacina
        card_vacina.appendChild(vencimento_card);
        //Criando o elemento de texto
        const proxima_dose = document.createElement('h2')
        proxima_dose.setAttribute('id', 'proxima-dose')                    
        //Definindo o elemento texto como filho
        vencimento_card.appendChild(proxima_dose)
        //Preenchendo com informações
        proxima_dose.innerText = vacinas[index].proximaData; //--------  
    }
}

// Função para lidar com a submissão do formulário de cadastro de vacinas
function cadastrarVacina() {
    let nome = document.getElementById("txtNovoNomeVacina").value;
    let data = document.getElementById("dateNovoVacina").value;
    let doseSelecionada = document.querySelector('input[name="dose"]:checked').id;
    let comprovante = document.getElementById("comprovante").value;
    let proximaData = document.getElementById("dateProximaVacina").value;
    adicionarVacina(nome, data, doseSelecionada, comprovante, proximaData);
    console.log("Função de cadastro");
}