export async function uploadAPI(formData) {
    try {
        const response = await fetch("/api/documents", {
            method: "POST",
            headers: { Accept: "application/json" },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error("Failed to upload fetch formData ", error);
    }
}
