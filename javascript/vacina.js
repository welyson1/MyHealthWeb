import { auth, db } from "../firebase/config.js";
import { collection, addDoc, doc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

window.onload = () => {
    if (localStorage.getItem("vacinas") !== null) {
        vacinas = JSON.parse(localStorage.getItem("vacinas"));
    }

    carregarArray()
}

function idUser() {
    // Testa se existe um ID de usuario que esta sendo usado como KEY do documento no localStorage
    if (localStorage.getItem("userID") !== null) {
        // Retorna o ID do documento
        return localStorage.getItem("userID");
    } else {
        // Log
        console.log('Nenhum usuário logado.');
    }       
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

function carregarArray() {
     // Variavel que recebe o retorno da função que pega o ID do usuario
    const userID = idUser();

    // Limpa o array praa evitar duplicidade (TA RUIM O NEGOCIO KKK)
    vacinas = []

    // Define a subcoleção
    const colecao = collection(db, `usuarios/${userID}/vacinas`)
    const queryVacinas = query(colecao);
    getDocs(queryVacinas)
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                // Log
                console.log(doc.data());

                // Definição da variavel
                const docID = doc.id;

                // Log
                console.log(docID);

                // Definição da variavel
                const { nome, data, doseSelecionada, comprovante, proximaData } = doc.data();

                // Peenche a variavel com o objeto
                let vacina = {
                    nome: nome,
                    data: data,
                    doseSelecionada: doseSelecionada,
                    comprovante: comprovante,
                    proximaData: proximaData,
                    docID: docID
                };

                // Coloca uma vacina no array de vaacinas
                vacinas.push(vacina);

                // Função para colocar no array(Descartar)
                // adicionarVacina(nome, data, doseSelecionada, comprovante, proximaData, docID); // -------------------------------------Continuar aquiii            
            });
            console.log(vacinas);
            localStorage.setItem("vacinas", JSON.stringify(vacinas)); 

            construirGridVacinas(); 
        })
        .catch((erro) => {
            console.log(erro);
        });


     
}

// Função para carregar a tabela de vacinas com as vacinas cadastradas
function construirGridVacinas() {    
    console.log("Construtor");
    //Seleção da section com propriedade grid que irão os cards de vacina
    const section_grid = document.querySelector('section.section-grid');     

    for (let index = 0; index < vacinas.length; index++) {
        // Função que retorna o card criado para o appendChild
        section_grid.appendChild(criadorCard(index));  
    }
}

function criadorCard(index) {

    // Criação do molde do card dentro da section
    const card_vacina = document.createElement('div');
    card_vacina.dataset.index = index;
    card_vacina.setAttribute('id', vacinas[index].docID);  
    card_vacina.setAttribute('class', 'card-vacina');  
    card_vacina.addEventListener('click', function(event) {
        editarVacina(event);
    });

    // Criando a parte superior do card de vacina
    const cabeca_card = document.createElement('div');
    cabeca_card.setAttribute('class', 'cabeca-card');
    card_vacina.appendChild(cabeca_card);


    // Preenchendo a parte superior do card com informações
    // Titulo
    const titulo_vacina = document.createElement('h2');
    titulo_vacina.setAttribute('id', 'titulo-vacina');

    // Quantidade da dose
    const qtd_dose = document.createElement('label');
    qtd_dose.setAttribute('id', 'qtd-dose');

    // Data da dose
    const data_dose = document.createElement('time');
    data_dose.setAttribute('id', 'data-dose');
    
    // Colocar o titulo, label e data como filho do elemento cabeca-card
    cabeca_card.appendChild(titulo_vacina);
    cabeca_card.appendChild(qtd_dose);
    cabeca_card.appendChild(data_dose);
    
    // Preenchendo com informações
    titulo_vacina.innerText = vacinas[index].nome; //-------
    qtd_dose.innerText = baseDoses[vacinas[index].doseSelecionada];//--------
    data_dose.innerText = vacinas[index].data //-------

    // Criação do modelo de para colocar a imagem
    const image_card = document.createElement('div');
    image_card.dataset.index = index;
    image_card.setAttribute('class', 'image-card');
    card_vacina.appendChild(image_card);

    // Criação do elemento de imagem
    const imagem_comprovante_car = document.createElement('img');

    // Definição dos atributos do elemento de img
    imagem_comprovante_car.setAttribute('id', 'imagem-comprovante-car');
    imagem_comprovante_car.setAttribute('src', '/img/image-comprovante.png'); //-------

    // Colocando como filho da div image-card
    image_card.appendChild(imagem_comprovante_car);

    // Criação do modelo de vencimento-card
    const vencimento_card = document.createElement('div');
    vencimento_card.dataset.index = index;
    vencimento_card.setAttribute('class', 'vencimento-card');

    // Colocando como filho do card-vacina
    card_vacina.appendChild(vencimento_card);

    // Criando o elemento de texto
    const proxima_dose = document.createElement('h2')
    proxima_dose.setAttribute('id', 'proxima-dose')

    // Definindo o elemento texto como filho
    vencimento_card.appendChild(proxima_dose)

    // Preenchendo com informações
    proxima_dose.innerText = vacinas[index].proximaData; //--------

    // Retorna o card criado
    return card_vacina
}

function carregarComprovante() {
    let img_comprovante = document.getElementById("img-comprovante")
    img_comprovante.setAttribute("src", vacinas[index].comprovante)
}

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
    
    // ---------------- Firebase ---------------------
    // Variavel que recebe o retorno da função que pega o ID do usuario
    const userID = idUser();

    // Define a subcoleção
    const colecao = collection(db, `usuarios/${userID}/vacinas`)

    // Define o objeto com os dados
    const dados = {
        nome: nome,
        data: data,
        doseSelecionada: doseSelecionada,
        comprovante: comprovante,
        proximaData: proximaData
    }

    // Faz a requisição
    addDoc(colecao, dados)
        .then((result) => {
            // Log
            console.log("Vacina cadastrada" + result);
            window.location.href = 'Home.html';
            
        })
        .catch((erro) => {
            // Log
            console.log("Erro ao cadastrar" + erro);
        })    
}

// Click do botão cadastrar
document.getElementById('formCadastro').addEventListener('click', () => {
    cadastrarVacina()
})

function editarVacina(event) {
    // Paga o item que foi clicado
    const elementoClicado = event.currentTarget;

    // Salva a KEY do documento clicado que esta armazenado no atributo ID do elemento
    const indexFirebase = elementoClicado.id;

    // Salva a KEY do documento clicado
    localStorage.setItem("indexFirebase", indexFirebase);

    // Salva o ID do clicado
    localStorage.setItem("indexVacina", JSON.stringify(event.currentTarget.dataset.index));    

    // Chama a tela de editar vacina
    window.location.href = 'Editar_Vacina.html';
}

  
  






  