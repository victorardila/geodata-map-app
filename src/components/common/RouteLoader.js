import React from 'react'
import RouteLoaderGif from '../../assets/gif/route_loader.gif'

const RouteLoader = () => {
  return (
    <div className="loader" style={{
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      zIndex: "999999",
      backgroundColor: "transparent",
      backgroundImage: `url(${RouteLoaderGif})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }} />
  )
}

export default RouteLoader