import { db } from "../firebase/config.js";
import { doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

window.onload = () => {       

    if (localStorage.getItem("vacinas") !== null) {
        vacinas = JSON.parse(localStorage.getItem("vacinas"));
    } 
    if (localStorage.getItem("indexVacina") !== null) {
        indexVacina = JSON.parse(localStorage.getItem("indexVacina"));
    }
    if (localStorage.getItem("indexFirebase") !== null) {
        indexFirebase = localStorage.getItem("indexFirebase")
    }
    if (localStorage.getItem("userID") !== null) {
        userID = localStorage.getItem("userID")
    }
    carregarInformacoes();
}

let vacinas = [];
let indexVacina = null;
let indexFirebase = null;
let userID = null;

function removerVacina() {
    
    // Passa areferenciado documento a ser atualizado
    const docRef = doc(db, `usuarios/${userID}/vacinas`, indexFirebase)

    // Função do fire base que exclui o documento do banco de dados
    deleteDoc(docRef)
    .then((result) => {
        // Log
        console.log("Excluido" + result);

        // Atualiza os dados armazenados no localStorage com o novo array "vacinas"
        vacinas.splice(indexVacina,1)
        localStorage.setItem("vacinas", JSON.stringify(vacinas));    
        window.location.href = 'Home.html';
    })
    .catch((erro) => {
        // Log
        console.log("Erro") + erro;
    })    
}

function construirPopUp() {
    const body_editarVacina = document.getElementById("body")
    
    const background = document.createElement('div');
    background.setAttribute('class', 'backgroud-modal');
    body_editarVacina.appendChild(background)

    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    body_editarVacina.appendChild(modal)

    const mensagem_excluir = document.createElement('h2');
    mensagem_excluir.setAttribute('class', 'mensagem-excluir');
    mensagem_excluir.innerText = "Tem certeza que deseja remover essa vacina?"
    modal.appendChild(mensagem_excluir)

    const container_btns = document.createElement('div');
    container_btns.setAttribute('class', 'container-btns');
    modal.appendChild(container_btns)

    const btn_sim = document.createElement('a');
    btn_sim.setAttribute('id', 'btn-sim');
    // Click do botão que exclui a vacina
    btn_sim.addEventListener('click', function() {
        removerVacina();
    });
    btn_sim.innerText = "SIM"
    container_btns.appendChild(btn_sim)

    const btn_cancelar = document.createElement('a');
    btn_cancelar.setAttribute('id', 'btn-cancelar');
    btn_cancelar.setAttribute('onclick', 'destruirPopUp()')
    btn_cancelar.innerText = "CANCELAR"
    container_btns.appendChild(btn_cancelar)   
}

function destruirPopUp() {
    const background = document.getElementsByClassName("backgroud-modal")[0];
    background.remove();

    const modal = document.getElementsByClassName("modal")[0];
    modal.remove();
}

function carregarInformacoes() {
    let dateEditarVacina = document.getElementById("dateEditarVacina");
    dateEditarVacina.value = vacinas[indexVacina].data;

    let txtEditarNomeVacina = document.getElementById("txtEditarNomeVacina");
    txtEditarNomeVacina.value = vacinas[indexVacina].nome;

    let dose = document.getElementById('radio-dose')
    for(let a of dose.children){
        if (a.nodeName == "INPUT" && a.getAttribute('value') == vacinas[indexVacina].doseSelecionada) {
            a.setAttribute("checked", true)
        }
    }
    let proximaVacinaEditar = document.getElementById("proximaVacinaEditar");
    proximaVacinaEditar.value = vacinas[indexVacina].proximaData;
    
    let img_comprovante = document.getElementById("img-comprovante")
    img_comprovante.setAttribute("src", vacinas[indexVacina].comprovante)
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
function atualizarVacina() {
    let nome = document.getElementById("txtEditarNomeVacina").value;
    let data = document.getElementById("dateEditarVacina").value;
    let doseSelecionada = document.querySelector('input[name="dose"]:checked').value;
    // let comprovante = document.getElementById("comprovante").value;
    let proximaData = document.getElementById("proximaVacinaEditar").value;

    // Passa areferenciado documento a ser atualizado
    const docRef = doc(db, `usuarios/${userID}/vacinas`, indexFirebase)

    let vacina = {
        nome: nome,
        data: data,
        doseSelecionada: doseSelecionada,
        // comprovante: comprovante,
        proximaData: proximaData
    };

    // Atualiza o documento
    updateDoc(docRef, vacina)
    .then((result) => {

        // Log
        console.log("Documento alterado" + result); 

        // Atualiza a vacina no array para o indice indicado
        vacinas[indexVacina] = vacina

        //Salvao array vacinasno localStorage
        localStorage.setItem("vacinas", JSON.stringify(vacinas));

        // Reedireciona para tela Home
        window.location.href = 'Home.html';
    })
    .catch((erro) => {
        "Erro ao alterar" + erro
    })
    
}

// Click do botão salvar alteração
document.getElementById('atualizarVacina').addEventListener('click', () => {
    atualizarVacina()
})

// Click do botão salvar alteração
document.getElementById('construirPopUp').addEventListener('click', () => {
    construirPopUp()
})