firebase.auth().signOut().then(function() {
    // Logout bem-sucedido, redirecionar o usuário para a página de login
    window.location.href = "login.html";
}).catch(function(error) {
    // Trate os erros de logout aqui
    console.error("Erro no logout:", error);
});
  