import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const GoogleAuthentiaction = () => {

  const loginGoogle = () => {
    window.location.href = '/auth/google/callback';
  };

  return (
    <div>
      <button onClick={loginGoogle} style={{border: 'none', background: 'none'}}>
      <FontAwesomeIcon
          icon={faGoogle}
          style={{
            color: "#dd4b39",
            fontSize: "30px",
            margin: "0 1em",
          }}
        />
      </button>
    </div>
  );
};

export default GoogleAuthentiaction;
