import { useState } from "react";
import "../style/document-card.css";

function DocumentCard({ document, setDocuments }) {
    function updateStatus() {
        setDocuments((prevDocuments) =>
            prevDocuments.map((item) =>
                item.id === document.id
                    ? { ...item, status: "Reviewed" }
                    : item,
            ),
        );
        console.log("Document Reviewed");
    }

    return (
        <div className="doc-card-container">
            <h2 className="doc-title">{document.title}</h2>
            <div className="doc-id-status-container">
                <span className="doc-id">ID: {document.id}</span>
                <span className="doc-status">{document.status}</span>
            </div>
            <div className="doc-actions-btn-container">
                <button onClick={updateStatus}>Preview</button>
                <button>Approve</button>
                <button>Revise</button>
                <button>Reject</button>
            </div>
        </div>
    );
}

export default DocumentCard;
