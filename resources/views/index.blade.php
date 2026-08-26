<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
    {{-- SECURITY GUARD VVV --}}
    <script>
        const token = localStorage.getItem("authToken");
        if(!token){
            window.location.href = "/user/login";
        }
    </script>
    {{-- SECURITY GUARD ^^^ --}}
    <title>Document Tracker - Home</title>
</head>
<body>
    <header>
        <h1>Document Tracker</h1>
        <nav>
            <ul>
                <li><a href="document/upload">Upload</a></li>
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
                <span class="column-name" role="columnheader">Updated at</span>
                <span class="column-name" role="columnheader">Created at</span>
            </li>
            <div class="template-container"></div>
            <template class="document-item-template">
                <li class="document-item" role="row">
                    <span class="tracking-number" role="cell"></span>
                    <span class="file-name" role="cell"></span>
                    <span class="status" role="cell"></span>
                    <span class="focal" role="cell"></span>
                    <span class="created-at" role="cell"></span>
                    <span class="updated-at" role="cell"></span>
                </li>
            </template>
       </ul>
    </main>
</body>
</html>