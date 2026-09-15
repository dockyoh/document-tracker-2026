import {
    logoutAPI,
    getInboxDocsAPI,
    documentPreviewAPI,
    updateDocStatsAPI,
} from "./api.js";
import { renderPrivatePage } from "./auth-dom.js";
import { getCurrentUser, getUsername, isAdmin } from "./auth.js";
import { renderLogUser } from "./dom.js";

const templateContainerEl = document.querySelector(".template-container");
const inboxModal = document.querySelector(".inbox-modal");
const token = localStorage.getItem("authToken");
const user = getCurrentUser();
let docStats = null;
console.log(user.role);

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

// PREVIEW THE DOCUMENT, CHANGE STATUS AND SHOW MODAL WITH APPROVE AND REJECT OPTIONS
templateContainerEl.addEventListener("click", async (e) => {
    if (e.target.closest(".document-item")) {
        docId = e.target.closest(".document-item").dataset.documentId;

        const isReviewed = await documentPreviewAPI(token, docId);

        if (isReviewed && user.role !== "staff") {
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

        if (user.role === "department head") {
            docStats = {
                status: "Approved",
            };
        }

        if (user.role === "reviewer") {
            docStats = {
                status: "Pending",
            };
        }
    }

    if (e.target.closest(".reject-btn")) {
        console.log(`Document rejected activated : ${docId}`);

        docStats = {
            status: "Rejected",
        };
    }

    await updateDocStatsAPI(token, docId, docStats);
    inboxModal.close();
});
