import { auth } from "../firebase/config.js";
import { createUser } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

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

function validarSenha(senhaInput, confirmarSenhaInput) {
    let labelElement = document.getElementById("log-senha");
    if (senhaInput.value == confirmarSenhaInput.value) {
        labelElement.style.display = "none";
    } else {
        labelElement.style.display = "block";           
    }
}