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

        const result = await response.json();

        if (response.status === 401) {
            window.location.href = "/user/login";
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP status error ${response.status}`);
        }

        renderDocuments(result.data);
        return result.data;
    } catch (error) {
        console.error("FAILED TO FETCH DOCUMENTS ", error);
    }
}

export async function getArchivedDocumentsAPI(token) {
    try {
        const response = await fetch("/api/documents/archived", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP STATUS ERROR ${response.status}`);
        }

        const result = await response.json();

        // console.log(result.data);
        renderDocuments(result.data);
        return result.data;
    } catch (error) {
        console.error("FAILED TO FETCH ARCHIVED DOCUMENTS ", error);
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

// SIGNUP/REGISTER API
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

// LOGIN API
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

        if (response.status === 401) {
            renderAuthErrors([loginuser.message]);
            return;
        }

        console.log(loginuser.message);

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
        const response = await fetch("/api/users", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 401 || response.status === 403) {
            // localStorage.clear();
            // window.location.href = "/user/login";
            logoutAPI();
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP status error ${response.status}`);
        }

        const users = await response.json();

        console.log(users.data);
        renderUsers(users.data);
    } catch (error) {
        console.error("FAILD TO FETCH USERS", error);
    }
}

export async function updateUserRoleAPI(id, roleData, token) {
    try {
        const response = await fetch(`/api/users/${id}`, {
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
        window.location.href = "/user/view";
    } catch (error) {
        console.error("FAILED TO USER ROLE ", error);
    }
}

export async function updateUserStatusAPI(token, userId) {
    try {
        const response = await fetch(`/api/users/${userId}/updateUserStatus`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP STATUS ERROR ${response.status}`);
        }

        const result = await response.json();

        console.log(result);
        return result;
    } catch (error) {
        console.error("FAILED TO FETCH USERS AUPDATE", error);
    }
}

export async function getInboxDocsAPI(token) {
    try {
        const response = await fetch("/api/inbox", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (response.status === 401) {
            window.location.href = "/user/login";
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP STATUS ERROR ${response.status}`);
        }

        console.log(result.data);
        renderInboxTable(result.data);
        return result.data;
    } catch (error) {
        console.error("FAILED TO FETCH PENDING DOCS ", error);
    }
}

export async function documentPreviewAPI(token, id) {
    try {
        const response = await fetch(`/api/documents/${id}/preview`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(`PREVIEW FAILED ${response.status} : ${message}`);
        }

        const result = await response.blob();

        const previewURL = URL.createObjectURL(result);

        window.open(previewURL, "_blank");

        setTimeout(() => {
            URL.revokeObjectURL(previewURL);
        }, 60000);

        return true;
    } catch (error) {
        console.error("FAILED TO FETCH DOCUMENT PREVIEW ", error);
    }
}

// PREVIEW ARCHIVED API
export async function previewArchivedAPI(token, docId) {
    try {
        const response = await fetch(
            `/api/documents/${docId}/previewArchived`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (!response.ok) {
            throw new Error(`STATUS ${response.status}`);
            // throw new Error(response.status);
        }

        const result = await response.blob();

        const previewURL = URL.createObjectURL(result);

        window.open(previewURL, "_blank");

        setTimeout(() => {
            URL.revokeObjectURL(previewURL);
        }, 60000);
    } catch (error) {
        console.error("FAILED TO FETCH PREVIEW ARCHIVED ", error);
    }
}

export async function updateDocStatsAPI(token, id, status) {
    try {
        const response = await fetch(`/api/documents/${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(status),
        });

        if (!response.ok) {
            throw new Error(`HTTP STATUS ERROR: ${response.status}`);
        }

        const result = await response.json();

        console.log(result.data);
    } catch (error) {
        console.error("FAILED TO UPDATE DOCUMENT STATUS :", error);
    }
}

export async function resubmitDocAPI(token, id, formData) {
    try {
        renderLoading();
        const response = await fetch(`/api/documents/${id}/resubmit`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP ERROR STATUS: ${response.status}`);
        }

        const result = await response.json();

        console.log(result);
        renderDoneLoading;
        window.location.href = "/";
    } catch (error) {
        console.error("FAILED TO RESUBMIT DOCUMENT API ", error);
    }
}

export async function completeArchivedAPI(token, id) {
    try {
        console.log("completeDocumentAPI activated");
        const response = await fetch(`/api/documents/${id}/completeArchived`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ERROR STATUS: ${response.status}`);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error("FAILED TO FETCH COMPLETE API".error);
    }
}
