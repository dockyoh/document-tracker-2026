<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    @vite('resources/css/view.css')
    @vite('resources/css/header.css')
    @vite('resources/js/view.js')
    <script>
        const token = localStorage.getItem('authToken');
        if(!token) window.location.href = '/user/login';
    </script>
    <title>Document Tracker - User</title>
</head>
<body>
    <header>
        <h1 class="page-title">Manage User</h1>
        <nav class="navbar">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/user/inbox">Inbox</a></li>
                <li><a href="/document/upload">Upload</a></li>
                <li class="manage-role-link"><a href="/user/view">Manage User</a></li>
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
                <span class="column-name role-column" role="columnheader">Role</span>
                <span class="column-name" role="columnheader">Status</span>
            </li>
            <div class="template-container-user"></div>
            <template class="user-item-template">
                 <li class="user-item" role="row">
                    <span class="username" role="cell"></span>
                    <form action="" method="post" class="user-role-form">
                        <select name="role" class="select-role" role="cell">
                            <option value="department head">Department Head</option>
                            <option value="reviewer">Reviewer</option>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </form>
                    <span class="user-status" role="cell"></span>
                </li>
            </template>
       </ul>
    </main>
</body>
</html>