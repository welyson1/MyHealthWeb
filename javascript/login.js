import { db } from "../firebase/config.js";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const getEmail = () => {
    return document.getElementById("txtEmailLogin").value
}

const getSenha = () => {
    return document.getElementById("pwSenha").value
}
const auth = getAuth();
// Função de login
function login() {
    //Salva a sessão logada na guia
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
        //Faz login
        return signInWithEmailAndPassword(auth, getEmail(), getSenha())
        .then((userCredential) => {
            // Logs
            const user = userCredential.user;
            console.log("Usuário logado:", user);

            //Envia para tela Home
            window.location.href = "Home.html";
        })
        .catch((error) => {
            // Tratamento de erros
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Erro de login:", errorCode, errorMessage);
        });
    })
    .catch((error) => {
        // se erro
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

document.getElementById('btn-login').addEventListener('click', () => {
    login()
})
  