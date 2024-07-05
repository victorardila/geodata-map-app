import React from "react";
import "./Header.style.css";
import ButtonMenu from "../../common/ButtonMenu";
import LogoTitle from "../../common/LogoTitle";
import SpaceDivider from "../../common/SpaceDivider";
import Buttons from "../../../assets/data/Buttons.json";

const Header = ({ backgroundHeader }) => {
  const buttons = Buttons.landing.buttons;
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    // le pasare al backgroundHeader el color que se le asignara al header con un blur
    <div
      className="header"
      style={{
        backgroundColor:
          backgroundHeader === "transparent" ? "white" : backgroundHeader,
      }}
    >
      <div className="header-title">
        <LogoTitle title="GeoData Map" color={backgroundHeader} />
      </div>
      <div className="header-menu">
        {buttons.map((button, index) => (
          <div key={index} className="button-container">
            <SpaceDivider color={backgroundHeader} />
            <ButtonMenu
              key={index}
              text={button.label}
              type="button-menu"
              color={backgroundHeader}
              onClick={() => handleScrollToSection(button.id)}
            />
            {index === buttons.length - 1 && (
              <SpaceDivider color={backgroundHeader} />
            )}
          </div>
        ))}
      </div>
      <div className="header-login">
        <ButtonMenu
          text="Acceder"
          type="button-login"
          route="/auth/"
          color={backgroundHeader}
        />
      </div>
    </div>
  );
};

export default Header;
