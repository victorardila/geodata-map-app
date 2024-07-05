import React from "react";
import Section from "../../common/Section";
import sectionsData from "../../../assets/data/Sections.json";
import Footer from "../footer/Footer";
import "./Content.style.css";
import presentationImage from '../../../assets/image/presentation.png'; // Importa la imagen
// import featuresImage from '../../../assets/image/features.jpg'; // Importa la imagen
import heatmap from '../../../assets/gif/heatmap2.gif'
import OffertsContainer from "../../common/OffersContainer";
import FlagTriads from "../../common/FlagTriads";

const images = {
  "presentation.png": presentationImage,
  "heatmap.gif": heatmap,
};

const components = {
  "OffersContainer": <OffertsContainer />,
  "FlagTriads": <FlagTriads />,
};

function Content() {
  return (
    <div className="content">
      {sectionsData.map((section, index) => (
        <Section
          id={section.id}
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
