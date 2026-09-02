import { getDocumentsAPI, logoutAPI } from "./api.js";
import { renderPrivatePage } from "./auth-dom.js";
import { getUsername, isAdmin } from "./auth.js";
import { renderLogUser } from "./dom.js";

const token = localStorage.getItem("authToken");

if (isAdmin()) {
    renderPrivatePage();
}

renderLogUser(getUsername());
getDocuments();

async function getDocuments() {
    await getDocumentsAPI(token);
}

document
    .querySelector(".logout-button")
    .addEventListener("click", async (e) => {
        await logoutAPI(token);
    });
