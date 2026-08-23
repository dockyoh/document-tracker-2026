import { registerAPI } from "./api.js";

const signupForm = document.querySelector(".signup-form");

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(signupForm);

    await registerAPI(formData);
});
