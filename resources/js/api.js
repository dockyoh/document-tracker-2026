import {
    renderLoading,
    renderDoneLoading,
    renderUsers,
    renderDocuments,
    renderInboxTable,
} from "./dom.js";
import { renderAuthErrors } from "./auth-dom.js";

export async function getDocumentsAPI(token) {
    try {
        const response = await fetch("/api/documents", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const documentsusers = await response.json();

        if (response.status === 401) {
            window.location.href = "/user/login";
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP status error ${response.status}`);
        }

        renderDocuments(documentsusers.data);
        // renderInboxTable(documentsusers.data);
        return;
    } catch (error) {
        console.error("FAILED TO FETCH DOCUMENTS ", error);
    }
}

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

        if (response.status === 401) {
            window.location.href = "/user/login";
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP status error ${response.status}`);
        }

        renderDoneLoading();
        window.location.href = "/";
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

        const registerusers = await response.json();

        if (!response.ok) {
            if (response.status === 422) {
                const registerErros = Object.values(
                    registerusers.errors,
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

        const loginuser = await response.json();

        // if (!response.ok) {
        //     throw new Error(`HTTP ERROR STATUS ${response.status}`);
        // }

        if (response.status === 401) {
            const errors = [loginuser.message];
            renderAuthErrors(errors);
            return;
        }

        localStorage.setItem("authToken", loginuser.token);
        localStorage.setItem("user", JSON.stringify(loginuser.user));

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
            throw new Error(`HTTP status error ${response.status}`);
        }

        localStorage.clear();
        window.location.href = "/user/login";
        return;
    } catch (error) {
        console.error("FAILED TO FETCH LOGOUT ", error);
    }
}

export async function getUsersAPI(token) {
    try {
        const response = await fetch("/api/asign-role", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const users = await response.json();

        if (response.status === 401) {
            window.location.href = "/user/login";
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP status error ${response.status}`);
        }

        console.log(users.data);
        renderUsers(users.data);
    } catch (error) {
        console.error("FAILD TO FETCH USERS", error);
    }
}

export async function asignRoleAPI(id, roleData, token) {
    try {
        const response = await fetch(`/api/asign-role/${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: roleData,
        });

        const result = await response.json();

        if (response.status === 401) {
            window.location.href = "/user/login";
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP status error ${response.status}`);
        }

        console.log(result.data);
    } catch (error) {
        console.error("FAILED TO USER ROLE ", error);
    }
}

export async function getPendingDocsAPI(token) {
    try {
        const response = await fetch("/api/inbox", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP STATUS ERROR ${response.status}`);
        }

        console.log(result.data);
        renderInboxTable(result.data);
    } catch (error) {
        console.error("FAILED TO FETCH PENDING DOCS ", error);
    }
}

export async function documentPreviewAPI(token, id) {
    try {
        const response = await fetch(`/api/documents/${id}/preview`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.blob();

        if (!response.ok) {
            throw new Error(`HTTP STATUS ERROR ${response.status}`);
        }

        console.log(result);

        const previewURL = URL.createObjectURL(result);
        window.open(previewURL, "_blank");
    } catch (error) {
        console.error("FAILED TO FETCH DOCUMENT PREVIEW ", error);
    }
}
