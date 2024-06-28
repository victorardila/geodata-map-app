import React from "react";
import { motion } from "framer-motion";

const MapCards = ({type}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      style={{
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(-45deg, rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.9) 70%)",
        width: type !== "search" ? "400px" : "600px",
        height: type !== "search" ? "600px" : "70px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        margin: "0px 10px",
      }}
    ></motion.div>
  );
};

export default MapCards;
