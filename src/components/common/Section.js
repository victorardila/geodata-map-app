import React from "react";

const getStyle = (layout) => {
  switch (layout) {
    case "columnar":
      return {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      };
    case "sequential":
      return {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "20px",
        height: "100vh",
      };
    case "grid-2-cols":
      return {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
        height: "100vh",
        padding: "20px",
      };
    case "grid-3-cols":
      return {
        display: "grid",
        gridTemplateColumns: "2fr 1.2fr 1.2fr",
        gap: "10px",
        height: "100vh",
        padding: "20px",
      };
    case "title-over-image":
      return {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      };
    case "image-left":
      return {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      };
    case "image-right":
      return {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      };
    case "overlay":
      return { position: "relative", textAlign: "center" };
    case "reverse-columnar":
      return {
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        height: "100vh",
      };
    case "reverse-sequential":
      return {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "20px",
        height: "100vh",
      };
    default:
      return {};
  }
};

function Section({ title, description, image, layout }) {
  const gridStyle = getStyle(layout);
  console.log(layout);

  return (
    <div className="section" style={gridStyle}>
      {layout === "columnar" ? (
        <>
          <h2>{title}</h2>
          <p>{description}</p>
          <img
            src={image}
            alt="section"
            style={{ width: "auto", height: "-webkit-fill-available" }}
          />
        </>
      ) : layout === "sequential" ? (
        <>
          <img
            src={image}
            alt="section"
            style={{ width: "-webkit-fill-available", height: "60%" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </>
      ) : layout === "grid-2-cols" ? (
        <>
          <img src={image} alt="section" style={{ width: "100%" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </>
      ) : layout === "grid-3-cols" ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={image} alt="section" style={{ width: "100%" }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </>
      ) : layout === "title-over-image" ? (
        <>
          <h2>{title}</h2>
          <img
            src={image}
            alt="section"
            style={{ width: "auto", height: "-webkit-fill-available" }}
          />
          <p>{description}</p>
        </>
      ) : layout === "image-left" ? (
        <>
          <div style={{ display: "flex", flexDirection: "column", height:"100%", width:"60%", alignItems:"center" }}>
            <h2>{title}</h2>
            <img src={image} alt="section" style={{ height:"80%" }} />
          </div>
          <p>{description}</p>
        </>
      ) : layout === "image-right" ? (
        <>
          <p>{description}</p>
          <div style={{ display: "flex", flexDirection: "column", height:"100%", width:"-webkit-fill-available", alignItems:"center", justifyContent:"center" }}>
            <h2>{title}</h2>
            <img src={image} alt="section" style={{ height:"80%" }} />
          </div>
        </>
      ) : layout === "overlay" ? (
        <>
          <img src={image} alt="section" style={{ width: "100%" }} />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </>
      ) : layout === "reverse-columnar" ? (
        <>
          <h2>{title}</h2>
          <p>{description}</p>
          <img
            src={image}
            alt="section"
            style={{ width: "auto", height: "-webkit-fill-available" }}
          />
        </>
      ) : layout === "reverse-sequential" ? (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <img
            src={image}
            alt="section"
            style={{ width: "-webkit-fill-available", height: "60%" }}
          />
        </>
      ) : (
        <>
          <h2>{title}</h2>
          <p>{description}</p>
          <img
            src={image}
            alt="section"
            style={{ width: "auto", height: "-webkit-fill-available" }}
          />
        </>
      )}
    </div>
  );
}

export default Section;
