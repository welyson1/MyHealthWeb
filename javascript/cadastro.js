import { auth, db } from "../firebase/config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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
    return document.getElementById("pwCriarSenha").value
}

//Função que cadastra no firebase
const cadastrarUsuario = () => {
    createUserWithEmailAndPassword(auth, getEmail(), getSenha())
    //Tratar erros
    .then((result) => {
        console.log("Sucesso");
        const colecao = collection(db, "usuarios")
        const doc = {
            nome: getNome(),
            genero: getGenero()
        }
        addDoc(colecao, doc)
            .then((result) =>{
                console.log("Cadastrado");
            })
            .catch((error) => {
                console.log("Erro");
            })
    })
    .catch((error) => {
        console.log("Erro ao criar");
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