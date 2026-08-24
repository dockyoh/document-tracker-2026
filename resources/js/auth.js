import { registerAPI, loginAPI } from "./api.js";

const signupForm = document.querySelector(".signup-form");
const loginForm = document.querySelector(".login-form");

signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(signupForm);

    await registerAPI(formData);
});

loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);

    await loginAPI(formData);
});
