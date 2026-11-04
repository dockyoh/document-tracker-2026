import { useState } from "react";
import "../style/add-documents.css";
import DocumentList from "./document-list";

function AddDocuments({ documents, setDocuments }) {
    let [input, setInput] = useState("");

    function addDocument() {
        const newDocument = {
            id: crypto.randomUUID(),
            title: input,
            status: "Pending",
        };

        setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
        setInput("");
    }

    return (
        <div className="add-input-container">
            <label htmlFor="add-doc-input">Add a new document</label>
            <input
                type="text"
                id="add-doc-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Enter document title "
            />
            <button
                className="add-doc-button"
                disabled={input === "" ? true : false}
                onClick={addDocument}
            >
                + Add document
            </button>
        </div>
    );
}

export default AddDocuments;
