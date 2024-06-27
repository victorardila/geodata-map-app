import React from "react";
import Forgot from "../../../assets/image/forgot.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./Regain.css";

const Regain = () => {

  const handleClick = () => {
    window.location.href = "/login";
  };
  const handleRegain = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
  }
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="head">
        <div className="head-options">
          <FontAwesomeIcon
            icon={faAngleDoubleLeft}
            beatFade
            onClick={handleClick}
          />
        </div>
        <div className="logo">
          <img src={Forgot} alt="Forgot" />
          <h1>Regain access to your account</h1>
        </div>
      </div>
      <div className="login-form">
        <form>
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="Email" />
          </div>
          <button type="submit" onClick={handleRegain}>Submit</button>
        </form>
      </div>
    </motion.div>
  );
};

export default Regain;
