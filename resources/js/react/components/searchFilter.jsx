import "../style/searchFilter.css";

function SearchFilter() {
    return (
        <>
            <div className="search-filter-container">
                <label htmlFor="search-input">Search Documents</label>
                <input type="text" name="search-input" id="search-input" />
            </div>

            <div className="search-filter-container filter-container">
                <label htmlFor="select-input">Filter by status</label>
                <select name="filter-status" id="select-input">
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="needs revision">Needs Revision</option>
                </select>
            </div>
        </>
    );
}

export default SearchFilter;
