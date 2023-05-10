import { auth } from "../firebase/config.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

const getEmail = () => {
    return document.getElementById("txtEmailRecuperar").value
}

const recuperarSenha = () => {
    sendPasswordResetEmail(auth, getEmail())
    .then(() => {
        console.log("Email de redefinição enviado");
    })
    .catch((error) => {
        console.log(error.code);
    })
}

//Implementar o click do botão