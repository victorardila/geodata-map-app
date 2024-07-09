import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const GitHubAuthentication = () => {
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const [authResponseCode, setAuthResponseCode] = useState(null);

  const loginGitHub = () => {
    // Redirigir al usuario a la página de autorización de GitHub y volver a la URL actual
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(window.location.href)}&scope=read:user&response_type=code`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    // Si hay un código en la URL, significa que el usuario ha completado la autenticación
    if (code) {
      setAuthResponseCode(code);
      console.log("GitHub Code:", authResponseCode);
      // Obtener 
      fetch("http://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
          code: authResponseCode,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("GitHub Token:", data);
        })
        .catch((error) => {
          console.error("GitHub Token Error:", error);
        });
    }
  }, [authResponseCode, clientId]);

  return (
    <div>
      <button onClick={loginGitHub} style={{ border: 'none', background: 'none' }}>
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

export default GitHubAuthentication;