function playSuccessSound() {
  const sound = document.getElementById("success-sound");
  if (sound) {
    sound.play();
  }
}

function register() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const email = document.getElementById("register-email").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.username === username)) {
    alert("Username already exists");
    return;
  }

  users.push({ username, password, email });
  localStorage.setItem("users", JSON.stringify(users));
  playSuccessSound();
  alert("Registration successful!");
  window.location.href = "login.html";
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", username);
    alert("Login successful!");
    playSuccessSound();
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials");
  }
}
