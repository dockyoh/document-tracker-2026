import {
    logoutAPI,
    getInboxDocsAPI,
    documentPreviewAPI,
    updateDocStatsAPI,
} from "./api.js";
import { renderPrivatePage } from "./auth-dom.js";
import { getUsername, isAdmin } from "./auth.js";
import { renderLogUser } from "./dom.js";

const templateContainerEl = document.querySelector(".template-container");
const inboxModal = document.querySelector(".inbox-modal");
const token = localStorage.getItem("authToken");

let docId = null;

if (isAdmin()) {
    renderPrivatePage();
}

renderLogUser(getUsername());
getDocuments();

async function getDocuments() {
    await getInboxDocsAPI(token);
}

document
    .querySelector(".logout-button")
    .addEventListener("click", async (e) => {
        await logoutAPI(token);
    });

templateContainerEl.addEventListener("click", async (e) => {
    if (e.target.closest(".document-item")) {
        docId = e.target.closest(".document-item").dataset.documentId;

        const isReviewed = await documentPreviewAPI(token, docId);

        if (isReviewed) {
            const docStats = {
                status: "Review",
            };
            updateDocStatsAPI(token, docId, docStats);
            inboxModal.showModal();
        }
    }
});

inboxModal.addEventListener("click", async (e) => {
    if (e.target.closest(".close-btn")) {
        inboxModal.close();
        return;
    }

    if (e.target.closest(".approve-btn")) {
        console.log(`Document approve activated : ${docId}`);

        const docStats = {
            status: "Pending-dh",
        };

        await updateDocStatsAPI(token, docId, docStats);
        inboxModal.close();
    }
});
