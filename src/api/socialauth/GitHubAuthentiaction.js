import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const GitHubAuthentiaction = () => {

  const loginGitHub = () => {
    window.location.href = '/auth/github/callback';
  };

  return (
    <div>
      <button onClick={loginGitHub} style={{border: 'none', background: 'none'}}>
      <FontAwesomeIcon
          icon={faGithub}
          style={{
            color: "#333",
            fontSize: "30px",
            margin: "0 1em",
          }}
        />
      </button>
    </div>
  );
};

export default GitHubAuthentiaction;
