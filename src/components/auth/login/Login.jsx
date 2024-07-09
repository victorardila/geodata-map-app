import React, { useEffect, useState } from 'react';
import Logo from '../../../assets/icon/icon.png';
import './Login.style.css';
import GitHubAuthentiaction from '../../../api/socialauth/GitHubAuthentiaction';
import GoogleAuthentiaction from '../../../api/socialauth/GoogleAuthentication';
import FacebookAuthentiaction from '../../../api/socialauth/FacebookAuthentication';

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const githubUser = JSON.parse(localStorage.getItem("githubUser"));
    if (githubUser) {
      setUser(githubUser);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Lógica de autenticación con correo y contraseña
  };

  const authenticater = {
    loginGitHub: <GitHubAuthentiaction />,
    loginGoogle: <GoogleAuthentiaction />,
    loginFacebook: <FacebookAuthentiaction />
  };

  return (
    <div className="container">
      <div className="head">
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <h1>Log in to your account</h1>
        </div>
      </div>
      <div className="login-form">
        {user ? (
          <div>
            <h2>Bienvenido, {user.login}</h2>
            <img src={user.avatar_url} alt="Avatar" style={{ width: '50px', borderRadius: '50%' }} />
          </div>
        ) : (
          <form>
            <div className="form-group">
              <input type="email" id="email" name="email" placeholder='Email' />
            </div>
            <div className="form-group">
              <input type="password" id="password" name="password" placeholder='Password' />
              <p>Forgot your password? <a href="/auth/reset-password">Reset it</a></p>
            </div>
            <button type="submit" onClick={handleLogin}>Login</button>
          </form>
        )}
      </div>
      <div className='options'>
        <div className="divider">
          <hr />
          <span>or</span>
          <hr />
        </div>
        <div className="social-login">
          {authenticater.loginGitHub}
          {authenticater.loginGoogle}
          {authenticater.loginFacebook}
        </div>
        <p>Don't have an account? <a href="/auth/register">Register</a></p>
      </div>
      <div className="logo">
        <h2>GeoData Map</h2>
      </div>
    </div>
  );
};

export default Login;
