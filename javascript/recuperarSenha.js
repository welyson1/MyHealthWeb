import { auth } from "../firebase/config.js";
//Mudar link do modulo
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

const getEmail = () => {
    return document.getElementById("txtEmailRecuperar").value
}

const recuperarSenha = () => {
    console.log('entrou')
    sendPasswordResetEmail(auth, getEmail())
    .then(() => {
        console.log("Email de redefinição enviado");
    })
    .catch((error) => {
        console.log(error.code);
    })
}

//Implementar o click do botão
document.getElementById("btn_redefinirSenha").addEventListener('click', () => {
    recuperarSenha();
})