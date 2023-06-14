import { auth, db } from "../firebase/config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";


window.onload = () => {
    const senhaInput = document.getElementById("pwCriarSenha");
    const confirmarSenhaInput = document.getElementById("pwRepetirCriarSenha");

    senhaInput.addEventListener("keyup", () => {
        validarSenha(senhaInput, confirmarSenhaInput)
    });
    confirmarSenhaInput.addEventListener("keyup",() => {
        validarSenha(senhaInput, confirmarSenhaInput)
    });
}

const getEmail = () => {
    return document.getElementById("txtCriarEmail").value
}

const getSenha = () => {
    return document.getElementById("pwCriarSenha").value
}

const getNome = () => {
    return document.getElementById("txtCriarNome").value
}

const getGenero = () => {
    return document.querySelector('input[name="genero"]:checked').value;
}

const getDataNascimento = () => {
    return document.getElementById("dateCriarDataNascimento").value
}

//Função que cadastra no firebase
const cadastrarUsuario = () => {    
    // Criar a conta
    createUserWithEmailAndPassword(auth, getEmail(), getSenha())
    // Criar o documento na coleção para armazenas as informações
    .then((resultUser) => {
        // Pega o UUID da conta recem criada
        const uidUser = resultUser.user.uid;

        // Log
        console.log(uidUser);

        // Define a coleção
        const colecao = collection(db, "usuarios")

        // Personaliza a KEY do documento com a UUID do usuario
        const docRef = doc(colecao, uidUser);

        // Objeto com as informações
        const data = {
            nome: getNome(),
            genero: getGenero(),
            dataNascimento: getDataNascimento()
        }

        // Criação do documento na coleção com a KEY personalizada
        setDoc(docRef, data)
            .then((result) =>{
                // Log
                console.log("Cadastrado");

                // Direcionando para tela entrar/login
                window.location.href = "Entrar.html";
            })
            .catch((error) => {
                // Log
                console.log("Erro" + error);
            })
       
    })
    .catch((error) => {
        // Logs
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Erro de login:", errorCode, errorMessage);
    })
}

function validarSenha(senhaInput, confirmarSenhaInput) {
    let labelElement = document.getElementById("log-senha");
    if (senhaInput.value == confirmarSenhaInput.value) {
        labelElement.style.display = "none";
    } else {
        labelElement.style.display = "block";        
    }
}

document.getElementById('btn_criarConta').addEventListener('click', () => {
    cadastrarUsuario()
})