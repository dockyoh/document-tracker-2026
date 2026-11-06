import { useState } from "react";
import "../style/document-card.css";

function DocumentCard({ document, setDocuments }) {
    const [isHidden, setIsHidden] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    function documentAction(action) {
        setDocuments((prevDocuments) =>
            prevDocuments.map((item) =>
                item.id === document.id ? { ...item, status: action } : item,
            ),
        );

        action !== "Reviewed" && setIsHidden(true);
        action === "Reviewed" && setIsDisabled(false);
    }

    function removeDocument() {
        setDocuments((prevDocuments) =>
            prevDocuments.filter((item) => item.id !== document.id && item),
        );
    }

    return (
        <div className="doc-card-container">
            <h2 className="doc-title">{document.title}</h2>
            <div className="doc-id-status-container">
                <span className="doc-id">ID: {document.id}</span>
                <span className="doc-status">{document.status}</span>
            </div>
            <div className="doc-actions-btn-container">
                <button onClick={() => documentAction("Reviewed")}>
                    Preview
                </button>
                {isHidden ? (
                    <button onClick={removeDocument}>Remove</button>
                ) : (
                    <>
                        <button
                            onClick={() => documentAction("Approved")}
                            disabled={isDisabled}
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => documentAction("Revise")}
                            disabled={isDisabled}
                        >
                            Revise
                        </button>
                        <button
                            onClick={() => documentAction("Reject")}
                            disabled={isDisabled}
                        >
                            Reject
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default DocumentCard;
