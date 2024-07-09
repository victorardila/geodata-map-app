import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const FacebookAuthentiaction = () => {

  const loginFacebook = () => {
    window.location.href = '/auth/facebook/callback';
  };

  return (
    <div>
      <button onClick={loginFacebook} style={{border: 'none', background: 'none'}}>
      <FontAwesomeIcon
          icon={faFacebook}
          style={{
            color: "#3b5998",
            fontSize: "30px",
            margin: "0 1em",
          }}
        />
      </button>
    </div>
  );
};

export default FacebookAuthentiaction;
