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
const reviseModal = document.querySelector(".inbox-modal_revise");
const reviseForm = document.querySelector(".revise-form");
const token = localStorage.getItem("authToken");
const user = getCurrentUser();
let docStats = null;
let docId = null;

console.log(user.role);
// reviseModal.showModal();

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

// UPDATE THE DOCUMENT STATUS AND FOCAL ID
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
        } else if (user.role === "reviewer") {
            docStats = {
                status: "Pending",
            };
        }
    } else if (e.target.closest(".revision-btn")) {
        reviseModal.showModal();
        inboxModal.close();
    } else if (e.target.closest(".reject-btn")) {
        console.log(`Document rejected activated : ${docId}`);

        docStats = {
            status: "Rejected",
        };
    }
    updateDocStats();
});

reviseModal.addEventListener("click", async (e) => {
    if (e.target.closest(".cancel-btn")) {
        reviseModal.close();
        return;
    }

    if (e.target.closest(".feedback-btn")) {
        console.log("feedback button activated");

        // docStats = {
        //     status: "Revise",
        // };
        // updateDocStats();

        getFormData();
    }
});

async function updateDocStats() {
    if (docStats !== null) {
        await updateDocStatsAPI(token, docId, docStats);
        inboxModal.close();
        reviseModal.close();
    }
}

function getFormData() {
    reviseForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(reviseForm);

        const feedbackMessage = formData.get("message");

        docStats = {
            status: "Revise",
            feedback: feedbackMessage,
        };

        updateDocStats();
        // console.log(docStats);
    });
}
