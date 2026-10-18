const templateContainer = document.querySelector(".template-container");
const template = document.querySelector(".errors-template");
const fragment = document.createDocumentFragment();

export function renderAuthErrors(errors) {
    console.log("renderAuthErrors DOM activated");
    templateContainer.textContent = "";
    errors.forEach((error) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".error-message").textContent = error;

        fragment.appendChild(clone);
    });

    templateContainer.appendChild(fragment);
}

export function renderPrivatePage() {
    document.querySelector(".manage-role-link").style.display = "inline-block";
}

export function renderPasswordInput() {
    console.log("Password input Activated");
    document.querySelector("#password").value = "";
    const passwordConfirmation = document.querySelector(
        "#password_confirmation",
    );
    if (passwordConfirmation) {
        passwordConfirmation.value = "";
    }
}
