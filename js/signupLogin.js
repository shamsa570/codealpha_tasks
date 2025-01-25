document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // Handle Signup
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      localStorage.setItem("user", JSON.stringify({ name, email, password }));
      alert("Signup successful! Redirecting to login...");
      window.location.href = "login.html";
    });
  }

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.email === email && user.password === password) {
        alert("Login successful! Redirecting to homepage...");
        window.location.href = "index.html";
      } else {
        alert("Invalid email or password. Please try again.");
      }
    });
  }

  // Initialize Google Login
  if (typeof google !== "undefined") {
    google.accounts.id.initialize({
      client_id: "948774510033-5v9g3i3a8gb89qji8nee5iui4jkn6ce0.apps.googleusercontent.com", // Replace with your actual Google Client ID
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleLoginBtn"),
      { theme: "outline", size: "large" }
    );
  }
});

// Google Login Callback
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  alert("Google Login successful! Redirecting to homepage...");
  window.location.href = "index.html";
}
