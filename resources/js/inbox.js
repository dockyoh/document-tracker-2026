import { logoutAPI, getPendingDocsAPI, documentPreviewAPI } from "./api.js";
import { renderPrivatePage } from "./auth-dom.js";
import { getUsername, isAdmin } from "./auth.js";
import { renderLogUser } from "./dom.js";

const templateContainerEl = document.querySelector(".template-container");
const token = localStorage.getItem("authToken");

if (isAdmin()) {
    renderPrivatePage();
}

renderLogUser(getUsername());
getDocuments();

async function getDocuments() {
    await getPendingDocsAPI(token);
}

document
    .querySelector(".logout-button")
    .addEventListener("click", async (e) => {
        await logoutAPI(token);
    });

templateContainerEl.addEventListener("click", async (e) => {
    if (e.target.closest(".document-item")) {
        const id = e.target.closest(".document-item").dataset.documentId;

        console.log(`Document preview activated ${id}`);

        await documentPreviewAPI(token, id);
    }
});
