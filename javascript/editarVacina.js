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
    vacinas.splice(indexVacina, 1);
    localStorage.setItem("vacinas", JSON.stringify(vacinas));    
    window.location.href = 'Home.html';
}

function construirPopUp() {
    const body_editarVacina = document.getElementById("body")
    
    const background = document.createElement('div');
    background.setAttribute('class', 'backgroud-modal');
    body_editarVacina.appendChild(background);

    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    body_editarVacina.appendChild(modal);

    const mensagem_excluir = document.createElement('h2');
    mensagem_excluir.setAttribute('class', 'mensagem-excluir');
    mensagem_excluir.innerText = "Tem certeza que deseja remover essa vacina?";
    modal.appendChild(mensagem_excluir);

    const container_btns = document.createElement('div');
    container_btns.setAttribute('class', 'container-btns');
    modal.appendChild(container_btns);

    const btn_sim = document.createElement('a');
    btn_sim.setAttribute('id', 'btn-sim');
    btn_sim.setAttribute('onclick', 'removerVacina()');
    btn_sim.innerText = "SIM";
    container_btns.appendChild(btn_sim);

    const btn_cancelar = document.createElement('a');
    btn_cancelar.setAttribute('id', 'btn-cancelar');
    btn_cancelar.setAttribute('onclick', 'destruirPopUp()');
    btn_cancelar.innerText = "CANCELAR";
    container_btns.appendChild(btn_cancelar);   
}

function destruirPopUp() {
    const background = document.getElementsByClassName("backgroud-modal")[0];
    background.remove();

    const modal = document.getElementsByClassName("modal")[0];
    modal.remove();
}

//Verifica se há dados armazenados no Web Storage e carrega para o array "vacinas"
function atualizarVacina() {
    console.log("Entrou");
    let nome = document.getElementById("txtEditarNomeVacina").value;
    let data = document.getElementById("dateEditarVacina").value;
    let doseSelecionada = document.querySelector('input[name="dose"]:checked').value;
    let imagemInput = document.getElementById("comprovante");
    let comprovante = ""; // Inicializa com uma string vazia

    if (imagemInput.files.length > 0) {
        const imagemSelecionada = imagemInput.files[0];
        const leitorDeArquivo = new FileReader();

        leitorDeArquivo.onload = function () {
            comprovante = leitorDeArquivo.result; // Armazena a imagem como base64
            vacinas[indexVacina] = {
                nome: nome,
                data: data,
                doseSelecionada: doseSelecionada,
                comprovante: comprovante,
                proximaData: document.getElementById("proximaVacinaEditar").value
            };

            // Atualiza os dados armazenados no localStorage com o novo array "vacinas"
            localStorage.setItem("vacinas", JSON.stringify(vacinas));
            window.location.href = 'Home.html';
        };

        leitorDeArquivo.readAsDataURL(imagemSelecionada);
    } else {
        // Não há imagem selecionada
        vacinas[indexVacina] = {
            nome: nome,
            data: data,
            doseSelecionada: doseSelecionada,
            comprovante: comprovante,
            proximaData: document.getElementById("proximaVacinaEditar").value
        };

        // Atualiza os dados armazenados no localStorage com o novo array "vacinas"
        localStorage.setItem("vacinas", JSON.stringify(vacinas));
        window.location.href = 'Home.html';
    }
}

function carregarInformacoes() {
    let dateEditarVacina = document.getElementById("dateEditarVacina");
    dateEditarVacina.value = vacinas[indexVacina].data;

    let txtEditarNomeVacina = document.getElementById("txtEditarNomeVacina");
    txtEditarNomeVacina.value = vacinas[indexVacina].nome;

    let dose = document.getElementById('radio-dose');
    for(let a of dose.children) {
        if (a.nodeName == "INPUT" && a.getAttribute('value') == vacinas[indexVacina].doseSelecionada) {
            a.setAttribute("checked", true);
        }
    }

    let proximaVacinaEditar = document.getElementById("proximaVacinaEditar");
    proximaVacinaEditar.value = vacinas[indexVacina].proximaData;

    let img_comprovante = document.getElementById("img-comprovante");
    img_comprovante.setAttribute("src", vacinas[indexVacina].comprovante);
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
function getVacina() {
    let nome = document.getElementById("txtEditarNomeVacina").value;
    let data = document.getElementById("dateEditarVacina").value;
    let doseSelecionada = document.querySelector('input[name="dose"]:checked').value;
    let comprovante = document.getElementById("comprovante").value;
    let proximaData = document.getElementById("proximaVacinaEditar").value;
    let vacina = {
        nome: nome,
        data: data,
        doseSelecionada: doseSelecionada,
        comprovante: comprovante,
        proximaData: proximaData
    };
    return vacina;
}
