import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../components/common/Logo";
import "./ErrorPage.style.css";

const Page404 = ({codigo, type, description}) => {
  return (
    <div className="error-container">
      <div className="error">
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <h1>{codigo}</h1>
        <h2>{type}</h2>
        <p>{description}</p>
        <button onClick={() => window.location.href='/'}>Go back</button>
      </div>
      <div className="error-info">
        <Logo />
        <p>
          If you think this is a mistake, please contact the <a href="https://portafolio-web-profesional.web.app/" target="_blank" rel="noopener noreferrer">website administrator.</a>
        </p>
      </div>
    </div>
  );
};

export default Page404;
