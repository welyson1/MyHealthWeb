import { auth } from "../firebase/config.js";

// Função para realizar o logout
function logout() {
  auth.signOut()
    .then(() => {
      // Logout bem-sucedido, redirecionar o usuário para a página de login
      window.location.href = "Entrar.html";
    })
    .catch((error) => {
      // Trate os erros de logout aqui
      console.error("Erro no logout:", error);
    });
}

// Chamar a função de logout quando necessário, por exemplo, quando um botão de logout for clicado
document.getElementById("btnSair").addEventListener("click", () => {
  logout();
}); 