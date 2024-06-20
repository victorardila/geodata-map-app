import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
  faLinkedinIn,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

const SocialMediaBar = () => {
  const socialMediaBarIcons = [
    { icon: faFacebook, color: "#3b5998", name: "facebook" },
    { icon: faInstagram, color: "#e4405f", name: "instagram" },
    { icon: faGithub, color: "#333", name: "github" },
    { icon: faLinkedinIn, color: "#0077b5", name: "linkedin" },
    { icon: faGoogle, color: "#dd4b39", name: "gmail" },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "90%",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      <h3 style={{ color: "grey", margin: "0 1em" }}>Follow us on:</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {socialMediaBarIcons.map((socialMediaIcon, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default SocialMediaBar;
