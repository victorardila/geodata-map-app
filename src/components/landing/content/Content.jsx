import React from "react";
import Section from "../../common/Section";
import sectionsData from "../../../assets/data/Sections.json";
import Footer from "../footer/Footer";
import "./ContentStyles.css";
import presentationImage from '../../../assets/image/presentation.png'; // Importa la imagen
import featuresImage from '../../../assets/image/features.jpg'; // Importa la imagen
import OffertsContainer from "../../common/OffersContainer";

const images = {
  "presentation.png": presentationImage,
  "features.jpg": featuresImage,
};

const components = {
  "OffersContainer": <OffertsContainer />,
};

function Content() {
  return (
    <div className="content">
      {sectionsData.map((section, index) => (
        <Section
          key={index}
          title={section.Title}
          description={section.Description}
          image={images[section.Image]}
          component={components[section.Component]} // Aquí se pasa el componente correctamente
          link={section.Link}
          tag={section.Tag}
          linkText={section.LinkText}
          button={section.Button}
          layout={section.Layout}
        />
      ))}
      <Footer />
    </div>
  );
}

export default Content;
