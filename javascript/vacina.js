window.onload = () => {
    if (localStorage.getItem("vacinas") !== null) {
        vacinas = JSON.parse(localStorage.getItem("vacinas"));
    } 
    carregarTabelaVacinas()
}

// Array que irá armazenar todas as vacinas cadastradas
let vacinas = [];
let baseDoses = {
    1:"1a. dose",
    2:"2a. dose",
    3:"3a. dose",
    4:"Reforço",
    5:"Dose Única"
}

let comprovanteVacinas = {
    0:"/img/vacina.gif",
    1:"/img/Comprovante.jpg",
    2:"/img/5ca0b3929a665.jpeg",
    3:"/img/vacinado-alligator.gif",
    4:"/img/bota.jpg",
    5:"/img/botaa.png"
}

function buscarVacinas() {
    // Obtém o valor do campo de pesquisa em letras minúsculas
    const termoDePesquisa = document.querySelector('input[name="search-vacina"]').value.toLowerCase();

    // Loop para percorrer todas as vacinas no array
    for (let index = 0; index < vacinas.length; index++) {
        // Seleciona o elemento do cartão de vacina correspondente ao índice atual
        const card = document.querySelector(`.card-vacina[data-index="${index}"]`);

        // Obtém o nome da vacina atual em letras minúsculas
        const nomeVacina = vacinas[index].nome.toLowerCase();

        // Verifica se o nome da vacina contém o termo de pesquisa
        if (nomeVacina.includes(termoDePesquisa)) {
            // Se houver correspondência, mostra o cartão de vacina
            card.style.display = 'block';
        } else {
            // Se não houver correspondência, oculta o cartão de vacina
            card.style.display = 'none';
        }
    }
}

function editarVacina(card_vacina) {
    localStorage.setItem("indexVacina", JSON.stringify(card_vacina.dataset.index));
    window.location.href = 'Editar_Vacina.html';    
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
    //Seleção da section com propriedade grid que irão os cards de vacina
    const section_grid = document.querySelector('section.section-grid');   
    

    for (let index = 0; index < vacinas.length; index++) {     
        section_grid.appendChild(criadorCard(index));  
    }
}

function criadorCard(index) {
    //Criação do molde do card dentro da section
    const card_vacina = document.createElement('div');
    card_vacina.dataset.index = index;
    card_vacina.setAttribute('class', 'card-vacina');  
    card_vacina.setAttribute('onclick', 'editarVacina(this)')//Define o onclick no elemento para função remover 

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
    qtd_dose.innerText = baseDoses[vacinas[index].doseSelecionada];//--------
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
    imagem_comprovante_car.setAttribute('src', comprovanteVacinas[Math.floor(Math.random() * 6)]); //-------
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

    return card_vacina
}

// function carregarComprovante() {
//     let img_comprovante = document.getElementById("img-comprovante")
//     img_comprovante.setAttribute("src", vacinas[index].comprovante)
// }

//Elemento de input
const imagemInput = document.getElementById("comprovante");
//Elemento de imagem
const imagemPreview = document.getElementById("img-comprovante");
//Ouvinte para o input de imagem
imagemInput.addEventListener("change", function() {
  const imagemSelecionada = imagemInput.files[0];
  const leitorDeArquivo = new FileReader();

  leitorDeArquivo.addEventListener("load", function() {
    imagemPreview.setAttribute("src", leitorDeArquivo.result);
  });

  if (imagemSelecionada) {
    leitorDeArquivo.readAsDataURL(imagemSelecionada);
  }
});

// Função para lidar com a submissão do formulário de cadastro de vacinas
function cadastrarVacina() {
    let nome = document.getElementById("txtNovoNomeVacina").value;
    let data = document.getElementById("dateNovoVacina").value;
    let doseSelecionada = document.querySelector('input[name="dose"]:checked').value;
    let comprovante = document.getElementById("comprovante").value;
    let proximaData = document.getElementById("dateProximaVacina").value;
    adicionarVacina(nome, data, doseSelecionada, comprovante, proximaData);
}