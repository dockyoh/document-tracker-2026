import {
    getArchivedDocumentsAPI,
    logoutAPI,
    previewArchivedAPI,
} from "./api.js";
import { renderPrivatePage } from "./auth-dom.js";
import { getUsername, isAdmin, isReviewer } from "./auth.js";
import { renderLogUser } from "./dom.js";

const templateContainerArchivedEl = document.querySelector(
    ".template-container-archived",
);

// REMOVE RESUBMIT LOCALSTORAGE DATA IF RESUBMIT/UPLOAD PAGE NO LONGER IN USE
localStorage.removeItem("resubmitDoc");

const token = localStorage.getItem("authToken");

if (isAdmin()) {
    renderPrivatePage();
}

renderLogUser(getUsername());
getDocuments();

async function getDocuments() {
    await getArchivedDocumentsAPI(token);
}

document
    .querySelector(".logout-button")
    .addEventListener("click", async (e) => {
        await logoutAPI(token);
    });

// PREVIEW DOCUMENTS (ONLY THE UPLOADER, REVIEWER AND ADMIN CAN PREVIEW THE DOCUMENT)
templateContainerArchivedEl.addEventListener("click", async (e) => {
    if (e.target.closest(".document-item")) {
        const docId = e.target.closest(".document-item").dataset.documentId;

        await previewArchivedAPI(token, docId);
    }
});
