window.onload = () => {
  const senhaInput = document.getElementById("pwCriarSenha");
  const confirmarSenhaInput = document.getElementById("pwRepetirCriarSenha");

  senhaInput.addEventListener("keyup", () => {
    validarSenha(senhaInput, confirmarSenhaInput);
  });
  confirmarSenhaInput.addEventListener("keyup", () => {
    validarSenha(senhaInput, confirmarSenhaInput);
  });
};

function validarSenha(senhaInput, confirmarSenhaInput) {
  let labelElement = document.getElementById("log-senha");
  if (senhaInput.value == confirmarSenhaInput.value) {
    labelElement.style.display = "none";
  } else {
    labelElement.style.display = "block";
  }
}

const users = [];

function register() {
  const username = document.getElementById("txtCriarEmail").value;
  const password = document.getElementById("pwCriarSenha").value;

  const user = { username, password };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "/html/Entrar.html";

  if (user) {
    alert("Registro bem-sucedido! Agora você pode fazer login.");
  } else {
    alert("Erro ao registrar!");
  }
}

function login() {
  const username = document.getElementById("txtEmailLogin").value;
  const password = document.getElementById("pwSenha").value;

  function readUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  const user = readUsers().find(
    (u) => u.username === username && u.password === password
  );
  window.location.href = "/html/Home.html";

  if (user) {
    alert("Login bem-sucedido!");
  } else {
    alert("Credenciais inválidas. Tente novamente.");
  }
}
