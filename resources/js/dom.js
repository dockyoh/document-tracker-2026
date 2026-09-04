const templateContainer = document.querySelector(".template-container");
const fragment = document.createDocumentFragment();
const previewTemplate = document.querySelector(".file-preview-template");
const errorTemplate = document.querySelector(".upload-error-template");
const documentTemplate = document.querySelector(".document-item-template");
const userTemplate = document.querySelector(".user-item-template");

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

export function renderRegisterErrors(errors) {}

export function renderLogUser(username) {
    document.querySelector(".log-user").textContent = username;
}

export function renderDocuments(documents) {
    documents.forEach((document) => {
        console.log(document);
        const clone = documentTemplate.content.cloneNode(true);

        clone.querySelector(".tracking-number").textContent =
            document.tracking_number;
        clone.querySelector(".file-name").textContent = document.original_name;
        clone.querySelector(".status").textContent = document.status;
        clone.querySelector(".created-at").textContent = document.created_at;
        clone.querySelector(".updated-at").textContent = document.updated_human;
        clone.querySelector(".focal").textContent = document.focal;
        clone.querySelector(".author").textContent = document.uploader;

        fragment.appendChild(clone);
    });
    templateContainer.appendChild(fragment);
}

export function renderUsers(users) {
    users.forEach((user) => {
        const clone = userTemplate.content.cloneNode(true);

        clone.querySelector(".username").textContent = user.name;
        clone.querySelector(".select-role").value = user.role;
        clone.querySelector(".user-item").dataset.userId = user.id;

        fragment.appendChild(clone);
    });
    templateContainer.appendChild(fragment);
}

export function renderInboxTable(datas) {
    datas.forEach((data) => {
        const clone = documentTemplate.content.cloneNode(true);

        clone.querySelector(".tracking-number").textContent =
            data.tracking_number;
        clone.querySelector(".file-name").textContent = data.original_name;
        clone.querySelector(".status").textContent = data.status;
        clone.querySelector(".author").textContent = data.uploader;
        clone.querySelector(".updated-at").textContent = data.updated_human;
        clone.querySelector(".created-at").textContent = data.created_at;

        fragment.appendChild(clone);
    });

    templateContainer.appendChild(fragment);
}
