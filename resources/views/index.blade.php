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
</body>
</html>