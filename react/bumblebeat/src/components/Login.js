import React from "react";

const Login = () => {
  return (
    <main>
      <div className="login">
        <div className="login-left">
          <h1>Log In</h1>
          <img src="/public/images/bumblebeat-logo.png" />
        </div>
        <div className="login-right">
          <form
            id="login"
            className="login-form"
            name="login"
            action="/login"
            method="post"
          >
            <label>Username</label>
            <br />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
            />
            <br />
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
            <br />
            <br />
            <button className="submit-button" type="submit" value="Submit">
              submit
            </button>
          </form>
          <div className="google-login">
            <a href="/auth/google">
              <button>Login with Google</button>
            </a>
          </div>
          <br />
          <br />

          <p id="register">
            Not a user yet? <a href="register.html">Register now!</a>
          </p>
          <br />
        </div>
      </div>
    </main>
  );
};

export default Login;
