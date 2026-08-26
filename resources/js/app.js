import { logoutAPI } from "./api.js";
import { renderLogUser } from "./dom.js";

const token = localStorage.getItem("authToken");
const username = localStorage.getItem("log-user");

renderLogUser(username);

document
    .querySelector(".logout-button")
    .addEventListener("click", async (e) => {
        console.log(token);
        await logoutAPI(token);
    });
