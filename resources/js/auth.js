import { registerAPI, loginAPI } from "./api.js";

const signupForm = document.querySelector(".signup-form");
const loginForm = document.querySelector(".login-form");

signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(signupForm);

    await registerAPI(formData);
});

// LOGIN
loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);

    await loginAPI(formData);
});

export function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    return user;
}

export function isAdmin() {
    const user = getCurrentUser();
    return user?.role === "department head";
}

export function getUsername() {
    const user = getCurrentUser();
    return user.name;
}
