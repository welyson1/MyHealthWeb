import { auth } from "../firebase/config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        //Gambiarra para não aparecer a home quando não estiver logado
        document.getElementsByTagName('body')[0].className = "";
        // ...
    } else {
        window.location.href = "Entrar.html";
    }
});