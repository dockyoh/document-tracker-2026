const templateContainer = document.querySelector(".template-container");
const templateContainerUser = document.querySelector(
    ".template-container-user",
);
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
    documents.forEach((document, index) => {
        console.log(document);
        const clone = documentTemplate.content.cloneNode(true);

        clone.querySelector(".document-item").dataset.documentId = document.id;
        clone.querySelector(".document-item").dataset.documentIndex = index;

        clone
            .querySelector(".tracking-number")
            .classList.add(`tracking-number-${document.id}`);

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

        if (user.status === "pending") {
            renderApprovedBtn(clone, user.id);
        } else {
            clone.querySelector(".user-status").textContent = user.status;
        }

        fragment.appendChild(clone);
    });
    templateContainerUser.appendChild(fragment);
}

function renderApprovedBtn(clone, id) {
    const approvedBtnEl = document.createElement("button");
    approvedBtnEl.textContent = "Approve";
    approvedBtnEl.type = "button";
    approvedBtnEl.classList.add("approve-btn");
    approvedBtnEl.classList.add(`approve-btn-${id}`);

    clone.querySelector(".user-status").replaceWith(approvedBtnEl);
}

// RENDER INBOX TABLE
export function renderInboxTable(datas) {
    datas.forEach((data, index) => {
        const clone = documentTemplate.content.cloneNode(true);

        clone.querySelector(".document-item").dataset.documentId = data.id;
        clone.querySelector(".document-item").dataset.documentIndex = index;

        clone
            .querySelector(".tracking-number")
            .classList.add(`tracking-number-${data.id}`);

        clone.querySelector(".tracking-number").textContent =
            data.tracking_number;
        clone.querySelector(".file-name").textContent = data.original_name;

        // CHANGE THE SPAN ELEMENT TO BUTTON ELEMENT IF THE STATUS IS APPROVED
        if (data.status === "Approved") {
            renderCompleteButton(clone, data);
        } else {
            clone.querySelector(".status").textContent = data.status;
        }

        clone.querySelector(".focal").textContent = data.focal;
        clone.querySelector(".author").textContent = data.uploader;
        clone.querySelector(".updated-at").textContent = data.updated_human;
        clone.querySelector(".created-at").textContent = data.created_at;

        fragment.appendChild(clone);
    });

    templateContainer.appendChild(fragment);
}

function renderCompleteButton(clone, data) {
    const span = clone.querySelector(".status");
    const buttonEl = document.createElement("button");

    buttonEl.textContent = "Complete";
    buttonEl.type = "button";
    buttonEl.classList.add(`complete-btn-${data.id}`);
    buttonEl.classList.add("complete-btn");

    span.replaceWith(buttonEl);
}

export function renderFeedback(feedbackDatas, modalTitle) {
    document.querySelector(".feedback-title").textContent =
        `Request ${modalTitle}`;

    const feedbackFromEl = document.querySelector(".feedback-from");
    const feedbackActionEl = document.querySelector(".feedback-action");
    const feedbackMessageEl = document.querySelector(".feedback-message");
    const resubmitBtnEl = document.querySelector(".resubmit-btn");

    feedbackFromEl.textContent = "";
    feedbackActionEl.textContent = "";
    feedbackMessageEl.textContent = "";

    feedbackDatas.forEach((feedback) => {
        feedbackFromEl.textContent = feedback.reviewer;
        feedbackActionEl.textContent = feedback.action;
        feedbackMessageEl.textContent = feedback.message;

        if (feedback.action === "Rejected") {
            if (resubmitBtnEl) {
                resubmitBtnEl.textContent = "Archived";
                resubmitBtnEl.classList.add("archived-btn");
                resubmitBtnEl.classList.remove("resubmit-btn");
            }
        }
    });
}

export function renderDocumentActivity(activities, docTitle) {
    const templateTimelineContainerEl = document.querySelector(
        ".template-timeline-container",
    );

    templateTimelineContainerEl.innerHTML = "";

    const fragment = document.createDocumentFragment();
    const templateTimeline = document.querySelector(".template-timeline");

    document.querySelector(".modal-document-title").textContent = docTitle;

    activities.forEach((activity) => {
        const clone = templateTimeline.content.cloneNode(true);
        clone.querySelector(".timeline-date-time").textContent =
            activity.date_time;
        clone.querySelector(".timeline-description").textContent =
            activity.description;

        fragment.appendChild(clone);
    });
    templateTimelineContainerEl.appendChild(fragment);
}
