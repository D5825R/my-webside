const apiKey = "YOUR_JSONBIN_API_KEY";
const binId = "BIN_ID"; // Replace with your actual bin ID

// Sign Up
async function signup() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  if (!username || !password) {
    alert("Please fill all fields.");
    return;
  }

  const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
    headers: {
      "68298ae68a456b7966a02d1a": apiKey
    }
  });

  const data = await response.json();
  const users = data.record.users || [];

  const userExists = users.find(user => user.username === username);
  if (userExists) {
    alert("Username already exists.");
    return;
  }

  users.push({ username, password });

  await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "68298ae68a456b7966a02d1a": apiKey
    },
    body: JSON.stringify({ users })
  });

  alert("Sign up successful!");
  window.location.href = "login.html";
}

// Log In
async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (!username || !password) {
    alert("Please fill all fields.");
    return;
  }

  const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
    headers: {
      "68298ae68a456b7966a02d1a": apiKey
    }
  });

  const data = await response.json();
  const users = data.record.users || [];

  const validUser = users.find(
    user => user.username === username && user.password === password
  );

  if (validUser) {
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials.");
  }
}

