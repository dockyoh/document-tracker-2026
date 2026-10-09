import {
    getArchivedDocumentsAPI,
    logoutAPI,
    previewArchivedAPI,
} from "./api.js";
import { renderPrivatePage } from "./auth-dom.js";
import { getUsername, isAdmin, isReviewer } from "./auth.js";
import { renderLogUser, renderDocumentActivity } from "./dom.js";

const templateContainerArchivedEl = document.querySelector(
    ".template-container-archived",
);
const activityLogModalEl = document.querySelector(".activity-log-modal");
let archivedData;

// REMOVE RESUBMIT LOCALSTORAGE DATA IF RESUBMIT/UPLOAD PAGE NO LONGER IN USE
localStorage.removeItem("resubmitDoc");

const token = localStorage.getItem("authToken");

if (isAdmin()) {
    renderPrivatePage();
}

renderLogUser(getUsername());
getDocuments();

async function getDocuments() {
    archivedData = await getArchivedDocumentsAPI(token);
}

document
    .querySelector(".logout-button")
    .addEventListener("click", async (e) => {
        await logoutAPI(token);
    });

// PREVIEW DOCUMENTS (ONLY THE UPLOADER, REVIEWER AND ADMIN CAN PREVIEW THE DOCUMENT)
templateContainerArchivedEl.addEventListener("click", async (e) => {
    const docId = e.target.closest(".document-item").dataset.documentId;
    const docIndex = e.target.closest(".document-item").dataset.documentIndex;
    if (e.target.closest(`.tracking-number-${docId}`)) {
        console.log(`activity log modal activated for doc id ${docId}`);
        activityLogModalEl.showModal();
        const docTitle = archivedData[docIndex].original_name;
        renderDocumentActivity(archivedData[docIndex].activity_log, docTitle);
        return;
    } else if (e.target.closest(".document-item")) {
        await previewArchivedAPI(token, docId);
    }
});

activityLogModalEl.addEventListener("click", (e) => {
    if (e.target.closest(".ok-btn")) {
        activityLogModalEl.close();
    }

    if (e.target === activityLogModalEl) {
        activityLogModalEl.close();
    }
});
