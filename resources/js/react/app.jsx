import { useState } from "react";
import { createRoot } from "react-dom/client";
import SearchFilter from "./components/searchFilter";
import AddDocuments from "./components/add-documents";
import DocumentList from "./components/document-list";
import "./style/app.css";

function App() {
    const [documents, setDocuments] = useState([
        { id: 1, title: "My money", status: "Pending" },
        { id: 2, title: "2026 budget", status: "Pending" },
        { id: 3, title: "Christmas party", status: "Pending" },
        { id: 4, title: "New year plan", status: "Pending" },
    ]);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const filteredDocuments = documents.filter((document) => {
        const matchesSearch = document.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus = filter === "all" || document.status === filter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="app-container">
            <h1>Document Manager</h1>
            <SearchFilter
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
            />
            <AddDocuments documents={documents} setDocuments={setDocuments} />
            <DocumentList
                documents={filteredDocuments}
                setDocuments={setDocuments}
            />
        </div>
    );
}

createRoot(document.getElementById("react-app")).render(<App />);
