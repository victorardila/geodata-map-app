import React from "react";
import Section from "../../common/Section";
import sectionsData from "../../../assets/data/Sections.json";
import Footer from "../footer/Footer";
import "./ContentStyles.css";

function Content() {
  return (
    <div className="content">
      {sectionsData.map((section, index) => (
        <Section
          key={index}
          title={section.Title}
          description={section.Description}
          image={section.Image}
          link={section.Link}
          tag={section.Tag}
          linkText={section.LinkText}
          button={section.Button}
          style={{
            display: "flex",
            width: "100%",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      ))}
      <Footer />
    </div>
  );
}

export default Content;
