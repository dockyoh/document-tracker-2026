<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    @vite('resources/css/view.css')
    @vite('resources/js/view.js')
    <script>
        const token = localStorage.getItem('authToken');
        if(!token) window.location.href = '/user/login';
    </script>
    <title>Document Tracker - User</title>
</head>
<body>
    <header>
        <h1>Asign Role</h1>
        <nav class="navbar">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/document/upload">Upload</a></li>
            </ul>
        </nav>
        <div class="user-container">
            <p class="log-user"></p>
            <button class="logout-button">Logout</button>
        </div>
    </header>
    <main>
       <ul class="user-table-container" role="table" aria-label="Users">
            <li class="column-name-container" role="row">
                <span class="column-name" role="columnheader">Name</span>
                <span class="column-name" role="columnheader">Role</span>
            </li>
            <div class="template-container"></div>
            <template class="user-item-template">
                 <li class="user-item" role="row">
                    <span class="username" role="cell"></span>
                    <form action="" method="post" class="user-role-form">
                        <select name="role" class="select-role" role="cell">
                            <option value="department head">Department Head</option>
                            <option value="reviewer">Reviewer</option>
                            <option value="staff">Staff</option>
                        </select>
                    </form>
                </li>
            </template>
       </ul>
    </main>
</body>
</html>