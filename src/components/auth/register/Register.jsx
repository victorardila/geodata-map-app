import React from "react";
import User from "../../../assets/image/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./Register.style.css";

const Register = () => {

  const handleClick = () => {
    window.location.href = "/login";
  }
  const handleRegister = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  }
  
  return (
    <motion.div
    className="container"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}>
      <div className="head">
        <div className="head-options">
          <FontAwesomeIcon icon={faAngleDoubleLeft} beatFade onClick={handleClick} />
        </div>
        <div className="logo">
          <img src={User} alt="User" />
          <h1>Create an account</h1>
        </div>
      </div>
      <div className="login-form">
        <form>
          <div className="form-group">
            <input type="text" id="name" name="name" placeholder="Name" />
          </div>
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" onClick={handleRegister}>Register</button>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
