import { useState } from "react";
import "../style/searchFilter.css";

function SearchFilter({ search, setSearch, filter, setFilter }) {
    return (
        <>
            <div className="search-filter-container">
                <label htmlFor="search-input">Search Documents</label>
                <input
                    type="text"
                    name="search-input"
                    id="search-input"
                    placeholder="Search Documents..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </div>

            <div className="search-filter-container filter-container">
                <label htmlFor="select-input">Filter by status</label>
                <select
                    name="filter-status"
                    id="select-input"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Revise">Needs Revision</option>
                    <option value="Reject">Rejected</option>
                    <option value="Reviewed">Reviewed</option>
                </select>
            </div>
        </>
    );
}

export default SearchFilter;
