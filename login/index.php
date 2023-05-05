<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Logice Login</title>
    <style>
      /* Styles for the login form container */
      .login-container {
        width: 400px;
        margin: auto;
        /*
        margin-left: auto;
        margin-right: auto;
        */
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      /* Styles for the login form heading */
      .login-heading {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 40px;
      }

      /* Styles for the login form inputs */
      .login-input {
        display: block;
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-bottom: 20px;
        box-sizing: border-box;
      }

      /* Styles for the login form submit button */
      .login-button {
        display: block;
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: rgba(2, 4, 110, 0.571);
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }

      /* Styles for the login form submit button on hover */
      .login-button:hover {
        background-color: #0069d9;
      }

      /* Styles for the login form error message */
      .login-error {
        color: #dc3545;
        font-size: 14px;
        margin-top: 10px;
      }

      /* Logo's properties */
      img {
        max-width:400px;
        height:auto;
      }

    </style>
  </head>
  <body>
    <div class="login-container">
      <img src="../fullLogo.png">
      <h2 class="login-heading">User Login</h2>
      <form method="post" action="login.php">
        <input type="text" name="username" class="login-input" placeholder="Username or email" required>
        <input type="password" name="password" class="login-input" placeholder="Password" required>
        <button type="submit" class="login-button">Press to start!</button>
        <p class="login-error">Incorrect username or password.</p>
      </form>
      <a text-align="center" href="signup.html">Register</a>
    </div>
  </body>
</html>
