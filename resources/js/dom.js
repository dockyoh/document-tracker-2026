const templateContainer = document.querySelector(".template-container");
const fragment = document.createDocumentFragment();
const previewTemplate = document.querySelector(".file-preview-template");
const errorTemplate = document.querySelector(".upload-error-template");

export function renderUploadErrors(file, errorType) {
    templateContainer.textContent = "";

    const errorClone = errorTemplate.content.cloneNode(true);

    if (errorType === "type") {
        errorClone.querySelector(".error-message").textContent =
            `${file.type} is not supported`;
    } else {
        errorClone.querySelector(".error-message").textContent =
            `${(file.size / 1024 / 1024).toFixed(2)}MB  is too large. Maximum size allowed is ${errorType}MB`;
    }

    fragment.appendChild(errorClone);
    templateContainer.appendChild(fragment);
}

export function resetFileInput() {
    templateContainer.textContent = "";
    document.querySelector("#file-input").value = "";
    document.querySelector(".upload-btn").disabled = true;
    return null;
}

export function renderSelectedFile(file, uploadBtn) {
    templateContainer.textContent = "";

    uploadBtn.disabled = false;

    const previewClone = previewTemplate.content.cloneNode(true);
    previewClone.querySelector(".file-name").textContent = `${file.name}`;

    fragment.append(previewClone);
    templateContainer.appendChild(fragment);
}

export function renderLoading() {
    document.querySelector(".upload-btn").textContent = "Uploading...";
    resetFileInput();
}

export function renderDoneLoading() {
    document.querySelector(".upload-btn").textContent = "Upload File";
}
