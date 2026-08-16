<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    <title>Document Tracker - Upload</title>
</head>
<body>
   <header>
        <h1>Document Tracker</h1>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <form action="" method="post" class="upload-form" enctype="multipart/form-data">
            <input type="file" name="file_input" id="file-input" accept=".pdf, docx, doc, .txt" hidden>
            <label for="file-input" class="upload-label">
                <img src="/images/upload.png" alt="upload icon" class="upload-icon">
                <span class="browse-btn">Browse</span>
                <p class="upload-guide">Drop a file here</p>
                <small class="upload-guide"><span class="required-sign">*</span>File supported: .pdf, .docx, .doc, .txt</small>
            </label>
            <button type="submit" class="submit-btn" disabled>Upload File</button>
        </form>
    </main>
</body>
</html>