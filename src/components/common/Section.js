import React, { useState } from "react";
import YouTube from "react-youtube";

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
        justifyContent: "center",
        padding: "20px",
        height: "100vh",
      };
    case "grid-2-cols":
      return {
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
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
    case "grid-2-cols-3rows":
      return {
        display: "grid",
        gridTemplateRows: "1fr 5fr 5fr",
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
      return {
        display: "flex",
        position: "relative",
        textAlign: "center",
        height: "100vh",
      };
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
        flexDirection: "row-reverse",
        alignItems: "center",
        padding: "20px",
        height: "100vh",
      };
    default:
      return {};
  }
};

const splitDescription = (description) => {
  const words = description.split(" ");
  const midpoint = Math.floor(words.length / 2);
  const firstHalf = words.slice(0, midpoint).join(" ");
  const secondHalf = words.slice(midpoint).join(" ");
  return [firstHalf, secondHalf];
};

const formatDescription = (description) => {
  const lines = description.split("\n").map((line, index) => {
    const isSubtitle = /^\d+\..*:$/.test(line.trim()); // Expresión regular ajustada
    return (
      <p
        key={index}
        style={{
          fontSize: "20px",
          textAlign: "justify",
          fontWeight: isSubtitle ? "bold" : "normal",
          margin: 0,
        }}
      >
        {line}
      </p>
    );
  });
  return lines;
};

function Section({ title, description, image, layout, component, link }) {
  const gridStyle = getStyle(layout);
  const [firstHalf, secondHalf] = splitDescription(description);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="section" style={gridStyle}>
      {layout === "columnar" ? (
        <>
          <h2>{title}</h2>
          {formatDescription(description)}
          {image ? (
            <img
              src={image}
              alt="img"
              style={{ width: "auto", height: "-webkit-fill-available" }}
            />
          ) : component ? (
            <div style={{ width: "100%", height: "100%" }}>{component}</div>
          ) : (
            <div style={{ width: "60%", height: "60%" }}>
              <YouTube
                videoId={link}
                opts={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
        </>
      ) : layout === "sequential" ? (
        <>
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{
                  width: isHovered ? "80%" : "70%",
                  transition: "width 0.3s ease",
                  boxShadow: isHovered
                    ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                    : "none",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : component ? (
              <div style={{ width: "100%", height: "100%" }}>{component}</div>
            ) : (
              <div style={{ width: "60%", height: "60%" }}>
                <YouTube
                  videoId={link}
                  opts={{ width: "100%", height: "100%" }}
                />
              </div>
            )
          }
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: "40px" }}>{title}</h2>
            {formatDescription(description)}
          </div>
        </>
      ) : layout === "grid-2-cols" ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>{title}</h2>
            {formatDescription(description)}
          </div>
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{
                  width: isHovered ? "100%" : "90%",
                  transition: "width 0.3s ease",
                  boxShadow: isHovered
                    ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                    : "none",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : component ? (
              <div style={{ width: "100%", height: "100%" }}>{component}</div>
            ) : (
              <div style={{ display:"flex", width: "100%", height: "100%", alignItems: "center", justifyContent:"center" }}>
                <YouTube
                  videoId={link}
                  iframeClassName="youtube-iframe"
                />
              </div>
            )
          }
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
            {
              //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
              image ? (
                <img
                  src={image}
                  alt="img"
                  style={{
                    width: isHovered ? "100%" : "90%",
                    transition: "width 0.3s ease",
                    boxShadow: isHovered
                      ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                      : "none",
                    cursor: isHovered ? "pointer" : "default",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              ) : component ? (
                <div style={{ width: "100%", height: "100%" }}>{component}</div>
              ) : (
                <div style={{ width: "60%", height: "60%" }}>
                  <YouTube
                    videoId={link}
                    opts={{ width: "100%", height: "100%" }}
                  />
                </div>
              )
            }
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "0px 30px",
            }}
          >
            <h2 style={{ fontSize: "40px", margin: "0px" }}>{title}</h2>
            {formatDescription(firstHalf)}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "0px 10px",
            }}
          >
            {formatDescription(secondHalf)}
          </div>
        </>
      ) : layout === "grid-2-cols-3rows" ? (
        <>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>{title}</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              height: "100%",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              height: "100%",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
              }}
            ></div>
          </div>
        </>
      ) : layout === "title-over-image" ? (
        <>
          <h2>{title}</h2>
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{
                  width: isHovered ? "100%" : "90%",
                  transition: "width 0.3s ease",
                  boxShadow: isHovered
                    ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                    : "none",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : component ? (
              <div style={{ width: "100%", height: "100%" }}>{component}</div>
            ) : (
              <div style={{ width: "60%", height: "60%" }}>
                <YouTube
                  videoId={link}
                  opts={{ width: "100%", height: "100%" }}
                />
              </div>
            )
          }
          {formatDescription(description)}
        </>
      ) : layout === "image-left" ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "60%",
              alignItems: "center",
            }}
          >
            <h2>{title}</h2>
            {
              //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
              image ? (
                <img
                  src={image}
                  alt="img"
                  style={{
                    width: isHovered ? "80%" : "70%",
                    transition: "width 0.3s ease",
                    boxShadow: isHovered
                      ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                      : "none",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              ) : component ? (
                <div style={{ width: "100%", height: "100%" }}>{component}</div>
              ) : (
                <div style={{ width: "60%", height: "60%" }}>
                  <YouTube
                    videoId={link}
                    opts={{ width: "100%", height: "100%" }}
                  />
                </div>
              )
            }
          </div>
          {formatDescription(description)}
        </>
      ) : layout === "image-right" ? (
        <>
          {formatDescription(description)}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "-webkit-fill-available",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>{title}</h2>
            {
              //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
              image ? (
                <img
                  src={image}
                  alt="img"
                  style={{
                    width: isHovered ? "80%" : "70%",
                    transition: "width 0.3s ease",
                    boxShadow: isHovered
                      ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                      : "none",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              ) : component ? (
                <div style={{ width: "100%", height: "100%" }}>{component}</div>
              ) : (
                <div style={{ width: "60%", height: "60%" }}>
                  <YouTube
                    videoId={link}
                    opts={{ width: "100%", height: "100%" }}
                  />
                </div>
              )
            }
          </div>
        </>
      ) : layout === "overlay" ? (
        <>
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{
                  width: "-webkit-fill-available",
                  height: "100%",
                  backgroundAttachment: "fixed",
                  backgroundSize: "cover",
                  imageRendering: isHovered
                    ? "pixelated"
                    : "-webkit-optimize-contrast",
                  imageResolution: isHovered ? "from-image" : "auto",
                  transition: "image-rendering 0.3s ease",
                  cursor: isHovered ? "pointer" : "default",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : component ? (
              <div style={{ width: "100%", height: "100%" }}>{component}</div>
            ) : (
              <div style={{ width: "60%", height: "60%" }}>
                <YouTube
                  videoId={link}
                  opts={{ width: "100%", height: "100%" }}
                />
              </div>
            )
          }
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h2 style={{ fontSize: "100px" }}>{title}</h2>
            <p
              style={{
                fontSize: "40px",
                backgroundColor: "rgba(255,255,255,0.6)",
                border: "0.5px solid rgba(0,0,0,0.5)",
                borderRadius: "10px",
              }}
            >
              {description}
            </p>
          </div>
        </>
      ) : layout === "reverse-columnar" ? (
        <>
          <h2>{title}</h2>
          {formatDescription(description)}
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{ width: "auto", height: "-webkit-fill-available" }}
              />
            ) : component ? (
              <div style={{ width: "100%", height: "100%" }}>{component}</div>
            ) : (
              <div style={{ width: "60%", height: "60%" }}>
                <YouTube
                  videoId={link}
                  opts={{ width: "100%", height: "100%" }}
                />
              </div>
            )
          }
        </>
      ) : layout === "reverse-sequential" ? (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>{title}</h2>
            {formatDescription(description)}
          </div>
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{
                  width: isHovered ? "60%" : "50%",
                  transition: "width 0.3s ease",
                  boxShadow: isHovered
                    ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                    : "none",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : component ? (
              <div style={{ width: "100%", height: "100%" }}>{component}</div>
            ) : (
              <div style={{ width: "60%", height: "60%" }}>
                <YouTube
                  videoId={link}
                  opts={{ width: "100%", height: "100%" }}
                />
              </div>
            )
          }
        </>
      ) : (
        <>
          <h2>{title}</h2>
          {formatDescription(description)}
          {
            //Si imagen es diferente de null, entonces se muestra la imagen sino renderiza el componente
            image ? (
              <img
                src={image}
                alt="img"
                style={{
                  width: isHovered ? "100%" : "90%",
                  transition: "width 0.3s ease",
                  boxShadow: isHovered
                    ? "0px 0px 10px 5px rgba(0,0,0,0.5)"
                    : "none",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : component ? (
              <div style={{ width: "100%", height: "100%" }}>{component}</div>
            ) : (
              <div style={{ width: "60%", height: "60%" }}>
                <YouTube
                  videoId={link}
                  opts={{ width: "100%", height: "100%" }}
                />
              </div>
            )
          }
        </>
      )}
    </div>
  );
}

export default Section;
