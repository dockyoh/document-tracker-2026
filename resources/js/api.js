import { renderLoading, renderDoneLoading } from "./dom.js";

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
