import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackSocialAuth = ({ type }) => {
  const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const urls = {
    // mostramos el code en la URL
    github: `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:3000/dashboard/callback&scope=read:user&response_type=code`,
    google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=http://localhost:3000/dashboard/callback&scope=email%20profile&response_type=code`,
    facebook: `https://www.facebook.com/v11.0/dialog/oauth?client_id=${client_id}&redirect_uri=http://localhost:3000/dashboard/callback&scope=email&response_type=code`,
  };

  const urlSelected = urls[type];
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = urlSelected;
    // escuchar cambios en la URL
    window.addEventListener("message", (event) => {
      if (event.origin === window.location.origin) {
        const searchParams = new URLSearchParams(window.location.search);
        console.log("searchParams", searchParams);
        const code = searchParams.get("code");
        console.log("code", code);
      }
    });
  }, [navigate, urlSelected]);

  return (
    <div>
      <h2>Autenticando...</h2>
    </div>
  );
};

export default CallbackSocialAuth;
