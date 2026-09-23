import {
    logoutAPI,
    updateDocStatsAPI,
    uploadAPI,
    resubmitDocAPI,
} from "./api.js";
import { renderPrivatePage } from "./auth-dom.js";
import { getUsername, isAdmin } from "./auth.js";
import {
    renderUploadErrors,
    renderSelectedFile,
    resetFileInput,
    renderLogUser,
} from "./dom.js";

let fileSelected = null;
let resubmitDoc = null;

const fileInput = document.querySelector("#file-input");
const uploadBtn = document.querySelector(".upload-btn");
const templateContainer = document.querySelector(".template-container");
const token = localStorage.getItem("authToken");
const CONFIG = {
    MAX_SIZE_MB: 10,
    ALLOWED_TYPES: [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "text/plain",
    ],
    UPLOAD_ENDPOINT: "/api/documents",
};

if (isAdmin()) {
    renderPrivatePage();
}

renderLogUser(getUsername());

getResubmitDoc();

console.log(resubmitDoc);

fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
    }
});

// UPLOAD BUTTON
uploadBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!fileSelected) return;

    const formData = new FormData();
    formData.append("document", fileSelected);

    if (resubmitDoc) {
        formData.append("reviewer_id", resubmitDoc.reviewerId);
        await resubmitDocAPI(token, resubmitDoc.id, formData);
        console.log("Ready to resubmit documents");
        return;
    } else {
        await uploadAPI(formData, token);
        return;
    }
});

// REMOVE BUTTON
templateContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.closest(".remove-btn")) {
        console.log("remove button activated");
        fileSelected = resetFileInput();
        console.log(fileSelected);
    }
});

function handleFileSelection(file) {
    if (!CONFIG.ALLOWED_TYPES.includes(file.type)) {
        renderUploadErrors(file, "type");
        return;
    }

    const maxSizeBytes = CONFIG.MAX_SIZE_MB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        renderUploadErrors(file, CONFIG.MAX_SIZE_MB);
        return;
    }

    fileSelected = file;
    console.log(fileSelected);
    renderSelectedFile(file, uploadBtn);
}

document
    .querySelector(".logout-button")
    .addEventListener("click", async (e) => {
        console.log(token);
        await logoutAPI(token);
    });

function getResubmitDoc() {
    resubmitDoc = JSON.parse(localStorage.getItem("resubmitDoc"));
}
