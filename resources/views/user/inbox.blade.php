<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/inbox.css')
    @vite('resources/js/inbox.js')
    {{-- SECURITY GUARD VVV --}}
    <script>
        const token = localStorage.getItem("authToken");
        if(!token){
            window.location.href = "/user/login";
        }
    </script>
    {{-- SECURITY GUARD ^^^ --}}
    <title>Document Tracker - Inbox</title>
</head>
<body>
    <header>
        <h1>Inbox</h1>
        <nav class="navbar">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/document/upload">Upload</a></li>
                <li class="manage-role-link"><a href="/user/view">Manage Role</a></li>
            </ul>
        </nav>
        <div class="user-container">
            <p class="log-user"></p>
            <button class="logout-button">Logout</button>
        </div>
    </header>
    <main>
       <ul class="document-table-container" role="table" aria-label="Documents">
            <li class="column-name-container" role="row">
                <span class="column-name" role="columnheader">Tracking Number</span>
                <span class="column-name" role="columnheader">File name</span>
                <span class="column-name" role="columnheader">Status</span>
                <span class="column-name" role="columnheader">Focal</span>
                <span class="column-name" role="columnheader">Author</span>
                <span class="column-name" role="columnheader">Updated at</span>
                <span class="column-name" role="columnheader">Created at</span>
            </li>
            <div class="template-container"></div>
            {{-- INBOX TEMPLATE --}}
            <template class="document-item-template">
                <li class="document-item" role="row">
                    <span class="tracking-number" role="cell"></span>
                    <span class="file-name" role="cell"></span>
                    <span class="status" role="cell"></span>
                    <span class="focal" role="cell"></span>
                    <span class="author" role="cell"></span>
                    <span class="updated-at" role="cell"></span>
                    <span class="created-at" role="cell"></span>
                </li>
            </template>
       </ul>
       {{-- INBOX MODAL --}}
       <dialog class="inbox-modal">
        <button type="button" class="close-btn">Close</button>
            <h2 class="doc-title">Document title</h2>
            <div class="button-container">
                <button class="approve-btn inbox-modal-btn">Approve</button>
                <button class="revision-btn inbox-modal-btn">Revise</button>
                <button class="reject-btn inbox-modal-btn">Reject</button>
            </div>
       </dialog>
       {{-- REVISE MODAL --}}
       <dialog class="inbox-modal_revise inbox-modal">
        <h2 class="feedback-title">Request Revision</h2>
        <h3>Document Title...</h3>
        <form action="" method="post" class="revise-form">
            <label for="feedback-message">Feedback:</label>
            <textarea 
                name="message" 
                id="feedback-message" 
                cols="50" 
                rows="10" 
                placeholder="Explain what the authors need to revise." 
                required></textarea>
            <div class="button-container">
                <button type="submit" class="feedback-btn inbox-modal-btn">Send Feedback</button>
                <button type="button" class="cancel-btn inbox-modal-btn">Cancel</button>
            </div>
        </form>
       </dialog>
       <dialog class="inbox-modal_preview-feedback inbox-modal">
            <h2>Feedback</h2>
            
            <div class="from-wrapper wrapper">
                <h3>From:</h3>
                <p class="feedback-from"></p>
            </div>
            
            <div class="action-wrapper wrapper">
                <h3>Action:</h3>
                <p class="feedback-action"></p>
            </div>
            
            <div class="message-wrapper wrapper">
                <h3>Message:</h3>
                <p class="feedback-message"></p>
            </div>
            
            <div class="button-container">
                <button type="button" class="resubmit-btn inbox-modal-btn">Resubmit</button>
                <button type="button" class="cancel-btn inbox-modal-btn">Cancel</button>
            </div>
       </dialog>
    </main>
</body>
</html>