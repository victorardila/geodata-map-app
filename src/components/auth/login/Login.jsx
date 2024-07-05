import React from 'react'
import Logo from '../../../assets/icon/icon.png'
import './Login.style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

const Login = () => {

  const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  }
  
  const socialMediaBarIcons = [
    { icon: faFacebook, color: "#3b5998", name: "facebook" },
    { icon: faGithub, color: "#333", name: "github" },
    { icon: faGoogle, color: "#dd4b39", name: "gmail" },
  ];
  return (
    <div className="container">
      <div className="head">
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <h1>Log in to your account</h1>
        </div>
      </div>
      <div className="login-form">
        <form>
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder='Email' />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder='Password' />
            <p>Forgot your password? <a href="/auth/reset-password">Reset it</a></p>
          </div>
          <button type="submit"
          onClick={handleLogin}
          >Login</button>
        </form>
      </div>
      <div className='options'>
        <div className="divider">
          <hr />
          <span>or</span>
          <hr />
        </div>
        <div className="social-login">
          {
            socialMediaBarIcons.map((socialMediaIcon, index) => (
              <a
                key={index}
                href={`https://www.${socialMediaIcon.name}.com`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={socialMediaIcon.icon}
                  style={{
                    color: socialMediaIcon.color,
                    fontSize: "30px",
                    margin: "0 1em",
                  }}
                />
              </a>
            ))
          }
        </div>
        <p>Don't have an account? <a href="/auth/register">Register</a></p>
      </div>
      <div className="logo">
        <h2>GeoData Map</h2>
      </div>
    </div>
  )
}

export default Login