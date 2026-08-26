import { getDocumentsAPI, logoutAPI } from "./api.js";
import { renderLogUser, renderDocuments } from "./dom.js";

const token = localStorage.getItem("authToken");
const username = localStorage.getItem("log-user");

renderLogUser(username);
getDocuments();

async function getDocuments() {
    const documents = await getDocumentsAPI(token);
    console.log(documents);
    renderDocuments(documents);
}

document
    .querySelector(".logout-button")
    .addEventListener("click", async (e) => {
        await logoutAPI(token);
    });
