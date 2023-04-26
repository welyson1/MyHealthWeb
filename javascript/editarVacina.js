window.onload = () => {       

    if (localStorage.getItem("vacinas") !== null) {
        vacinas = JSON.parse(localStorage.getItem("vacinas"));
    } 
    if (localStorage.getItem("indexVacina") !== null) {
        indexVacina = JSON.parse(localStorage.getItem("indexVacina"));
    }
    carregarInformacoes();
}

let vacinas = [];
let indexVacina = null;

function removerVacina() {
    // Atualiza os dados armazenados no localStorage com o novo array "vacinas"
    localStorage.setItem("vacinas", JSON.stringify(indexVacina));
    window.location.href = 'Home.html';
}

//Verifica se há dados armazenados no Web Storage e carrega para o array "vacinas"
function atualizarVacina() {
    console.log("Entrou");
    vacinas[indexVacina] = getVacina();

    // Atualiza os dados armazenados no localStorage com o novo array "vacinas"
    localStorage.setItem("vacinas", JSON.stringify(vacinas));
    window.location.href = 'Home.html';
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
}

// Função para lidar com a submissão do formulário de cadastro de vacinas
function getVacina() {
    let nome = document.getElementById("txtEditarNomeVacina").value;
    let data = document.getElementById("dateEditarVacina").value;
    let doseSelecionada = document.querySelector('input[name="dose"]:checked').value;
    let comprovante = document.getElementById("comprovante").value;
    let proximaData = document.getElementById("dateEditarVacina").value;
    let vacina = {
        nome: nome,
        data: data,
        doseSelecionada: doseSelecionada,
        comprovante: comprovante,
        proximaData: proximaData
    };
    return vacina
}