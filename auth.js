document.addEventListener("DOMContentLoaded", () => {
    const users = JSON.parse(localStorage.getItem("chillThriveUsers") || "[]");

    document.querySelectorAll(".show-password").forEach(button => {
        button.addEventListener("click", () => {
            const input = document.getElementById(button.dataset.target);
            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";
            button.textContent = isPassword ? "Hide" : "Show";
        });
    });

    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", event => {
            event.preventDefault();

            const name = document.getElementById("signupName").value.trim();
            const email = document.getElementById("signupEmail").value.trim().toLowerCase();
            const password = document.getElementById("signupPassword").value;
            const confirm = document.getElementById("confirmPassword").value;
            const message = document.getElementById("signupMessage");

            if (password !== confirm) {
                showMessage(message, "Passwords do not match.", "error");
                return;
            }

            if (users.some(user => user.email === email)) {
                showMessage(message, "An account with this email already exists.", "error");
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem("chillThriveUsers", JSON.stringify(users));
            localStorage.setItem("chillThriveCurrentUser", JSON.stringify({ name, email }));

            showMessage(message, "Account created! Redirecting to booking...", "success");
            setTimeout(() => {
                window.location.href = "home.html";
            }, 700);
        });
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", event => {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value.trim().toLowerCase();
            const password = document.getElementById("loginPassword").value;
            const message = document.getElementById("loginMessage");

            const users = JSON.parse(localStorage.getItem("chillThriveUsers") || "[]");
            const user = users.find(item => item.email === email && item.password === password);

            if (!user) {
                showMessage(message, "Invalid email or password.", "error");
                return;
            }

            localStorage.setItem("chillThriveCurrentUser", JSON.stringify({
                name: user.name,
                email: user.email
            }));

            showMessage(message, "Login successful! Redirecting...", "success");
            setTimeout(() => {
                const next = sessionStorage.getItem("chillThriveNext") || "home.html";
                sessionStorage.removeItem("chillThriveNext");
                window.location.href = next;
            }, 500);
        });
    }
});

function showMessage(element, text, type) {
    element.textContent = text;
    element.className = "form-message " + type;
}
