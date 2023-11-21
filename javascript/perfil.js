window.onload = () => {
    exibirInformacoesPerfil();
};

function exibirInformacoesPerfil() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioLogado) {
        document.getElementById("profile-name").textContent = usuarioLogado.username;
        document.getElementById("profile-email").textContent = usuarioLogado.email;
        document.getElementById("profile-dob").textContent = usuarioLogado.dob || "N/A";
        document.getElementById("profile-gender").textContent = usuarioLogado.gender || "N/A";
    } else {
        window.location.href = "/html/Entrar.html";
    }
}
