import { getDocumentsAPI, getNotificationCountAPI, logoutAPI } from "./api.js";
import { renderPrivatePage } from "./auth-dom.js";
import { getUsername, isAdmin } from "./auth.js";
import {
    renderLogUser,
    renderDocumentActivity,
    renderFilterFocal,
    renderFilterAuthor,
} from "./dom.js";

localStorage.removeItem("resubmitDoc");

const token = localStorage.getItem("authToken");
const users = localStorage.getItem("users");
const templateContainerEl = document.querySelector(".template-container");
const activityLogModalEl = document.querySelector(".activity-log-modal");
const searchFormEl = document.querySelector(".search-filter");
let documentsData;

if (isAdmin()) {
    renderPrivatePage();
}

renderLogUser(getUsername());

getDocuments();

async function getDocuments() {
    documentsData = await getDocumentsAPI(token);
    renderFilterFocal(users);
    renderFilterAuthor(users);
    await getNotificationCountAPI(token);
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

searchFormEl.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(searchFormEl);

    const searchValue = formData.get("search-input");
    const statusValue = formData.get("status");
    const focalValue = formData.get("focal");
    const authorValue = formData.get("author");

    await getDocumentsAPI(
        token,
        searchValue,
        statusValue,
        focalValue,
        authorValue,
    );
});

document
    .querySelector(".logout-button")
    .addEventListener("click", async (e) => {
        await logoutAPI(token);
    });
