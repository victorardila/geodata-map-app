import React from 'react'

function Section({title, description, image, style}) {
  return (
    <div className="section" style={style}>
      <img src={image} alt="section" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Section