import { useState } from "react";
import DocumentCard from "./document-card";

function DocumentList({ documents, setDocuments }) {
    return (
        <div className="doc-list-container">
            {documents.map((document) => (
                <DocumentCard
                    key={document.id}
                    document={document}
                    setDocuments={setDocuments}
                />
            ))}
        </div>
    );
}

export default DocumentList;
