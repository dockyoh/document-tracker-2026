<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    @vite('resources/js/upload.js')
    {{-- SECURITY GUARD VVV --}}
    <script>
        const token = localStorage.getItem("authToken");
        if(!token){
            window.location.href = "/user/login";
        }
    </script>
    {{-- SECURITY GUARD ^^^ --}}
    <title>Document Tracker - Upload</title>
</head>
<body>
   <header>
        <h1>Upload Document</h1>
        <nav class="navbar">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/user/view">Users</a></li>
            </ul>
        </nav>
         <div class="user-container">
            <p class="log-user"></p>
            <button class="logout-button">Logout</button>
        </div>
    </header>
    <main>
        {{-- UPLOAD FORM --}}
        <form action="" method="post" class="upload-form" enctype="multipart/form-data">
            <input type="file" name="file_input" id="file-input" accept=".pdf, docx, doc, .txt" hidden>
            {{-- DROP ZONE --}}
            <label for="file-input" class="upload-label drop-zone">
                <img src="/images/upload.png" alt="upload icon" class="upload-icon">
                <span class="browse-btn">Browse</span>
                <p class="upload-guide">Drop a file here</p>
                <small class="upload-guide"><span class="required-sign">*</span>File supported: .pdf, .docx, .doc, .txt</small>
                <div class="template-container"></div>
                {{-- FILE PREVIEW --}}
                <template class="file-preview-template">
                    <div class="file-preview-container">
                        <p class="file-name"></p>
                        <button type="button" class="remove-btn">Cancel</button>
                    </div>
                </template>
               {{-- UPLOAD ERRORS --}}
               <template class="upload-error-template">
                    <div class="upload-error-container">
                        <p class="error-message"></p>
                    </div>
               </template>
            </label>
            {{-- UPLOAD BUTTON --}}
            <button type="submit" class="upload-btn" disabled>Upload File</button>
        </form>
    </main>
</body>
</html>