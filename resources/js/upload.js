import { uploadAPI } from "./api.js";
import {
    renderUploadErrors,
    renderSelectedFile,
    resetFileInput,
} from "./dom.js";

const fileInput = document.querySelector("#file-input");
const uploadBtn = document.querySelector(".upload-btn");
const uploadForm = document.querySelector(".upload-form");
const templateContainer = document.querySelector(".template-container");

const CONFIG = {
    MAX_SIZE_MB: 5,
    ALLOWED_TYPES: [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "text/plain",
    ],
    UPLOAD_ENDPOINT: "/api/documents",
};

let fileSelected = null;

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

    const apiResponse = await uploadAPI(formData);

    console.log("API Response:", apiResponse);
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
    console.log(file);
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
