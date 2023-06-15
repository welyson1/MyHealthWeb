import { auth } from "../firebase/config.js";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

const getEmail = () => {
    return document.getElementById("txtEmailLogin").value
}

const getSenha = () => {
    return document.getElementById("pwSenha").value
}

// const auth = getAuth();

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
            const uid = user.uid;

            // Salva o UID do usuário logado no localStorage
            localStorage.setItem("userID", uid);

            // Verifica se há um usuário logado
            if (auth.currentUser) {
                // Recupera as informações do usuário logado
                const user = auth.currentUser;
                const uid = user.uid;
                const displayName = user.displayName;
                const email = user.email;
            
                // Use as informações do usuário conforme necessário
                console.log('Usuário logado:');
                console.log('UID: ' + uid);
                console.log('Nome de exibição: ' + displayName);
                console.log('Email: ' + email);
            } else {
                console.log('Nenhum usuário logado.');
            }

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
  