import { getUsersAPI, asignRoleAPI, logoutAPI } from "./api.js";
import { getUsername, isAdmin } from "./auth.js";
import { renderLogUser } from "./dom.js";

const templateContainer = document.querySelector(".template-container");
const token = localStorage.getItem("authToken");

if (!isAdmin()) {
    window.location.href = "/";
}

getUsers();
renderLogUser(getUsername());

async function getUsers() {
    await getUsersAPI(token);
}

templateContainer.addEventListener("change", async (e) => {
    if (e.target.matches(".user-role-form select")) {
        e.preventDefault();

        const roleForm = e.target.closest(".user-role-form");
        const userItem = e.target.closest(".user-item");

        const userId = userItem.dataset.userId;

        const formData = new FormData(roleForm);

        await asignRoleAPI(userId, formData, token);
    }
});

document
    .querySelector(".logout-button")
    .addEventListener("click", async (e) => {
        await logoutAPI(token);
    });
