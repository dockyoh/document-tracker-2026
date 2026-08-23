import { renderLoading, renderDoneLoading } from "./dom.js";
import { renderRegisterErrors } from "./auth-dom.js";

export async function uploadAPI(formData) {
    try {
        renderLoading();

        const response = await fetch("/api/documents", {
            method: "POST",
            headers: { Accept: "application/json" },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const result = await response.json();

        renderDoneLoading();
        return result.data;
    } catch (error) {
        console.error("Failed to upload fetch formData ", error);
    }
}

export async function registerAPI(formData) {
    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: formData,
        });

        const registerResult = await response.json();

        if (!response.ok) {
            if (response.status === 422) {
                const registerErros = Object.values(
                    registerResult.errors,
                ).flat();
                renderRegisterErrors(registerErros);
            }
        } else {
            window.location.href = "/user/login";
        }
    } catch (error) {
        console.error("Failed to fetch register user ", error);
    }
}
