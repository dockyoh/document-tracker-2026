import {
    getUsersAPI,
    updateUserRoleAPI,
    logoutAPI,
    updateUserStatusAPI,
} from "./api.js";
import { getUsername, isAdmin } from "./auth.js";
import { renderLogUser } from "./dom.js";

localStorage.removeItem("resubmitDoc");

const templateContainerUser = document.querySelector(
    ".template-container-user",
);
const token = localStorage.getItem("authToken");

if (!isAdmin()) {
    window.location.href = "/";
}

getUsers();
renderLogUser(getUsername());

async function getUsers() {
    await getUsersAPI(token);
}

templateContainerUser.addEventListener("change", async (e) => {
    if (e.target.matches(".user-role-form select")) {
        e.preventDefault();

        const roleForm = e.target.closest(".user-role-form");
        const userItem = e.target.closest(".user-item");

        const userId = userItem.dataset.userId;

        const formData = new FormData(roleForm);

        await updateUserRoleAPI(userId, formData, token);
    }
});

// APPROVE NEW USER
templateContainerUser.addEventListener("click", async (e) => {
    const userItem = e.target.closest(".user-item");

    const userId = userItem.dataset.userId;

    if (e.target.closest(`.approve-btn-${userId}`)) {
        console.log(`Approve button number ${userId} activated`);
        const result = updateUserStatusAPI(token, userId);
        if (result) {
            window.location.href = "/user/view";
        }
        return;
    }
});

document
    .querySelector(".logout-button")
    .addEventListener("click", async (e) => {
        await logoutAPI(token);
    });
