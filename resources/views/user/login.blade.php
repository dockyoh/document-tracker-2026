<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    @vite('resources/js/auth.js')
    <title>Login User</title>
</head>
<body>
    <header>
        <h1>Login</h1>
        <nav class="navbar">
            <ul class='register-container'>
                <li><a href="/user/register">Register</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <form action="" method="post" class="login-form">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="sreygin@gmail.com" required>

            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required>

            <button type="submit" class="login-btn">Login</button>
        </form>
        <div class="template-container"></div>
        <template class="errors-template">
            <div class="errors-container">
                <p class="error-message"></p>
            </div>
        </template>
    </main>
</body>
</html>