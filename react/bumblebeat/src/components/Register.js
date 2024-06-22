import React, { useRef } from 'react';

const Register = () => {
  const inputRef = useRef();

  return (
    <main>
      <div className="sign-up">
        <form className="new-user"></form>
      </div>

      <div className="register">
        <div className="register-left">
          <h1>Register</h1>
          <img src="/public/images/bumblebeat-logo.png" />
        </div>
        <div className="register-right">
          <form
            id="register"
            className="register-form"
            action="/register"
            method="POST"
          >
            <label>First Name*</label>
            <br />
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First Name"
              required
            />
            <br />
            <label>Last Name</label>
            <br />
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last Name"
            />
            <br />
            <label>Listener or Artist*</label>
            <br />
            <div>
              <input
                type="radio"
                id="listener"
                name="reg-type"
                value="Listener"
                checked
              />
              <label htmlFor="reg-type">Listener</label>
            </div>
            <br />
            <div>
              <input type="radio" id="artist" name="reg-type" value="Artist" />
              <label htmlFor="reg-type">Artist</label>
            </div>
            <br />
            <br />
            <label>Email*</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-Mail"
              required
            />
            <br />
            <label>Username*</label>
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
            <label>Password*</label>
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
            <button type="submit" value="Sign Up!">
              Sign Up!
            </button>
          </form>
        </div>
        <div className="google-login">
          <a href="/auth/google">
            <button>Sign up with Google</button>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Register;
