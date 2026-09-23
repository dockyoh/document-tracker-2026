import {
    logoutAPI,
    getInboxDocsAPI,
    documentPreviewAPI,
    updateDocStatsAPI,
} from "./api.js";
import { renderPrivatePage } from "./auth-dom.js";
import { getCurrentUser, getUsername, isAdmin } from "./auth.js";
import { renderLogUser, renderFeedback } from "./dom.js";

localStorage.removeItem("resubmitDoc");

const templateContainerEl = document.querySelector(".template-container");
const inboxModal = document.querySelector(".inbox-modal");
const reviseModal = document.querySelector(".inbox-modal_revise");
const feedbackModal = document.querySelector(".inbox-modal_preview-feedback");
const reviseForm = document.querySelector(".revise-form");
const token = localStorage.getItem("authToken");
const user = getCurrentUser();
let rejectedStatus = false;
let inboxDocuments = null;
let docStats = null;
let docId = null;
let reviewerId = null;

if (isAdmin()) {
    renderPrivatePage();
}

renderLogUser(getUsername());
getDocuments();

async function getDocuments() {
    inboxDocuments = await getInboxDocsAPI(token);
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
        const docIndex =
            e.target.closest(".document-item").dataset.documentIndex;

        const isReviewed = await documentPreviewAPI(token, docId);

        if (isReviewed && user.role !== "staff") {
            const docStats = {
                status: "Review",
            };
            updateDocStatsAPI(token, docId, docStats);
            inboxModal.showModal();
        } else {
            renderFeedback(inboxDocuments[docIndex].feedback);
            const feedback = inboxDocuments[docIndex].feedback;
            reviewerId =
                inboxDocuments[docIndex].feedback[feedback.length - 1]
                    .reviewer_id;
            feedbackModal.showModal();
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
        renderFeedback(inboxDocuments, "Revision");
        showCloseModals();
        return;
    } else if (e.target.closest(".reject-btn")) {
        rejectedStatus = true;
        renderFeedback(inboxDocuments, "Rejection");
        showCloseModals();
        return;
    }
    updateDocStats();
});

reviseModal.addEventListener("click", async (e) => {
    if (e.target.closest(".cancel-btn")) {
        reviseModal.close();
        return;
    }

    if (e.target.closest(".feedback-btn")) {
        getFeedbackFormData();
    }
});

feedbackModal.addEventListener("click", (e) => {
    if (e.target.closest(".cancel-btn")) {
        feedbackModal.close();
        return;
    }

    if (e.target.closest(".resubmit-btn")) {
        const resubmitDoc = {
            id: docId,
            reviewerId: reviewerId,
        };

        localStorage.setItem("resubmitDoc", JSON.stringify(resubmitDoc));

        window.location.href = "/document/upload";
        feedbackModal.close();
        return;
    }
});

async function updateDocStats() {
    if (docStats !== null) {
        await updateDocStatsAPI(token, docId, docStats);
        inboxModal.close();
        reviseModal.close();
    }
}

function getFeedbackFormData() {
    reviseForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(reviseForm);

        const feedbackMessage = formData.get("message");

        if (rejectedStatus) {
            docStats = {
                status: "Rejected",
                feedback: feedbackMessage,
            };
        } else {
            docStats = {
                status: "Revise",
                feedback: feedbackMessage,
            };
        }

        updateDocStats();
        // console.log(docStats);
    });
}

function showCloseModals() {
    inboxModal.close();
    reviseModal.showModal();
}
