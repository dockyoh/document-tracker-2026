<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    @vite('resources/js/auth.js')
    <title>Register User</title>
</head>
<body>
    <header>
        <h1>Document Tracker - Register</h1>
        <nav>
            <ul>
                <li><a href="/user/login">Login</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <form action="" method="post" class="signup-form">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" placeholder="Reygin Susas" required>

            <label for="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="sreygin@gmail.com" required>

            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required>

            <label for="password_confirmation">Confirm Password:</label>
            <input type="password" name="password_confirmation" id="password_confirmation" required>

            <button type="submit" class="register-btn">Register</button>
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