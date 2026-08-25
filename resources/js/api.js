import { renderLoading, renderDoneLoading } from "./dom.js";
import { renderAuthErrors } from "./auth-dom.js";

// UPLOAD API
export async function uploadAPI(formData, token) {
    try {
        renderLoading();

        const response = await fetch("/api/documents", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = "/user/login";
                return;
            }
            // throw new Error(`HTTP error status: ${response.status}`);
        }

        renderDoneLoading();
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
                renderAuthErrors(registerErros);
            }
        } else {
            window.location.href = "/user/login";
        }
    } catch (error) {
        console.error("Failed to fetch register user ", error);
    }
}

export async function loginAPI(formData) {
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: formData,
        });

        const loginResult = await response.json();

        if (!response.ok || response.status === 401) {
            const errors = [loginResult.message];
            renderAuthErrors(errors);
            return;
        }

        localStorage.setItem("authToken", loginResult.token);
        window.location.href = "/";
    } catch (error) {
        console.error("FAILED TO FETCH LOGIN ", error);
    }
}

export async function logoutAPI(token) {
    if (!token) {
        localStorage.clear();
        window.location.href = "/user/login";
        return;
    }

    try {
        const response = await fetch("/api/logout", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        localStorage.clear();
        window.location.href = "/user/login";
        return;
    } catch (error) {
        console.error("FAILED TO FETCH LOGOUT ", error);
    }
}
