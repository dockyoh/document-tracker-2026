import { getDocumentsAPI, logoutAPI } from "./api.js";
import { renderPrivatePage } from "./auth-dom.js";
import { getUsername, isAdmin } from "./auth.js";
import { renderLogUser, renderDocumentActivity } from "./dom.js";

localStorage.removeItem("resubmitDoc");

const token = localStorage.getItem("authToken");

const templateContainerEl = document.querySelector(".template-container");
const activityLogModalEl = document.querySelector(".activity-log-modal");
let documentsData;

// init();

// async function init() {

// }

if (isAdmin()) {
    renderPrivatePage();
}

renderLogUser(getUsername());

getDocuments();

async function getDocuments() {
    documentsData = await getDocumentsAPI(token);
}

templateContainerEl.addEventListener("click", async (e) => {
    const docId = e.target.closest(".document-item").dataset.documentId;
    const docIndex = e.target.closest(".document-item").dataset.documentIndex;

    if (e.target.closest(`.tracking-number-${docId}`)) {
        console.log(`Tracking number ${docId} activated`);
        const activities = documentsData[docIndex].activity_log;
        const docTitle = documentsData[docIndex].original_name;
        activityLogModalEl.showModal();
        renderDocumentActivity(activities, docTitle);
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

document
    .querySelector(".logout-button")
    .addEventListener("click", async (e) => {
        await logoutAPI(token);
    });
