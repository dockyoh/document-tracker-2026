import { useState } from "react";

function DocumentTracker({ title, status }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <h2>Document Tracker</h2>

            <button onClick={() => setIsOpen(true)}>Preview Document</button>

            {isOpen && (
                <div>
                    <h3>{title}</h3>
                    <h4>Status: {status}</h4>

                    {status === "Revise" && <button>Resubmit Document</button>}

                    <button onClick={() => setIsOpen(false)}>
                        Close Preview
                    </button>
                </div>
            )}
        </div>
    );
}

export default DocumentTracker;
