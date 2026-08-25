import { logoutAPI } from "./api.js";

const token = localStorage.getItem("authToken");

document
    .querySelector(".logout-button")
    .addEventListener("click", async (e) => {
        console.log(token);
        await logoutAPI(token);
    });
