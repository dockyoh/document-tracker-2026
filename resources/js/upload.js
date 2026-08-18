import { uploadAPI } from "./api.js";

const fileInput = document.querySelector("#file-input");
const submitBtn = document.querySelector(".submit-btn");
const uploadForm = document.querySelector(".upload-form");

const CONFIG = {
    MAX_SIZE_MB: 5,
    ALLOWED_TYPES: [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
    ],
    UPLOAD_ENDPOINT: "/api/documents",
};

fileInput.addEventListener("change", (e) => {
    if (fileInput.files[0]) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
});

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const file = fileInput.files[0];

    if (!file) {
        submitBtn.disabled = true;
        return;
    }
    console.log(file);

    const formData = new FormData();
    formData.append("document", file);

    const apiResponse = await uploadAPI(formData);

    console.log("API Response:", apiResponse);
});
