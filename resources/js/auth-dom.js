const templateContainer = document.querySelector(".template-container");
const template = document.querySelector(".errors-template");
const fragment = document.createDocumentFragment();

export function renderRegisterErrors(errors) {
    templateContainer.textContent = "";
    errors.forEach((error) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".error-message").textContent = error;

        fragment.appendChild(clone);
    });

    templateContainer.appendChild(fragment);
}
